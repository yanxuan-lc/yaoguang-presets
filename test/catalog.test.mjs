import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, readFile, rm, writeFile, symlink, chmod } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'
import { renderCatalog } from '../scripts/catalog.mjs'

function profile(id = 'java') {
  return {
    id,
    name: id,
    description: 'Development configuration',
    verification: { level: 'documentation', toolVersions: ['Fixture 1'], checkedAt: '2026-10-03' },
    notes: ['Read access only.'],
    platforms: {
      darwin: {
        readable: [
          {
            id: 'config',
            path: '~/.fixture/config',
            targetType: 'file',
            description: 'User configuration',
            containsCredentials: true,
            sources: ['https://example.com/docs'],
          },
        ],
      },
    },
  }
}

async function repository(t, profiles = [profile()]) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'presets-test-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  for (const item of profiles) {
    const dir = path.join(root, 'sandbox', item.id)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, 'paths.json'), JSON.stringify(item, null, 2) + '\n')
    await writeFile(path.join(dir, 'README.md'), '# Fixture\n')
  }
  return root
}

test('catalog generation preserves source bytes, sorts ids and matches Git blob hashes', async (t) => {
  const root = await repository(t, [profile('java'), profile('go')])
  const output = await renderCatalog(root)
  const catalog = JSON.parse(output)
  assert.deepEqual(
    catalog.presets.map((p) => p.id),
    ['go', 'java']
  )
  for (const item of catalog.presets) {
    const content = await readFile(path.join(root, item.path))
    const sha = createHash('sha1').update(`blob ${content.length}\0`).update(content).digest('hex')
    assert.equal(item.content, content.toString('utf8'))
    assert.equal(item.blobSha, sha)
    assert.deepEqual(Object.keys(item), ['id', 'path', 'blobSha', 'content'])
  }
  assert.equal(await renderCatalog(root), output)
  assert.ok(output.endsWith('\n'))
})

test('strict schema rejects unknown fields with a file and field location', async (t) => {
  const item = profile()
  item.platforms.darwin.readable[0].command = 'echo forbidden'
  const root = await repository(t, [item])
  await assert.rejects(
    renderCatalog(root),
    /sandbox\/java\/paths.json.*readable\[0\].command.*unknown field/
  )
})

test('duplicate entry ids and equivalent literal targets are rejected', async (t) => {
  const item = profile()
  item.platforms.darwin.readable.push({ ...item.platforms.darwin.readable[0], path: '~/.other' })
  const root = await repository(t, [item])
  await assert.rejects(renderCatalog(root), /duplicate entry id/)
  item.platforms.darwin.readable[1].id = 'other'
  item.platforms.darwin.readable[1].path = '~/.fixture/config/'
  await writeFile(path.join(root, 'sandbox/java/paths.json'), JSON.stringify(item))
  await assert.rejects(renderCatalog(root), /duplicate target/)
})

for (const bad of [
  '/',
  '~/',
  '../config',
  '~/../secret',
  '~/./config',
  '~//config',
  '~/a/*',
  '~/a\nsecret',
  '~/a\u0000b',
  '$(echo secret)',
  '${TOKEN}/file',
  '~/a/${JAVA_HOME}',
  'https://example.com/file',
  'C:\\Users\\name',
  '${JAVA_HOME}:other',
]) {
  test(`literal path validation rejects ${JSON.stringify(bad)}`, async (t) => {
    const item = profile()
    item.platforms.darwin.readable[0].path = bad
    const root = await repository(t, [item])
    await assert.rejects(renderCatalog(root), /\.path: /)
  })
}

for (const [name, mutate] of [
  ['missing description', (item) => delete item.description],
  ['invalid date', (item) => (item.verification.checkedAt = '2026-02-30')],
  ['unknown platform', (item) => (item.platforms.other = item.platforms.darwin)],
  ['unknown verification level', (item) => (item.verification.level = 'verified')],
  ['empty platforms', (item) => (item.platforms = {})],
  [
    'non-boolean credentials marker',
    (item) => (item.platforms.darwin.readable[0].containsCredentials = 'false'),
  ],
  ['HTTP source', (item) => (item.platforms.darwin.readable[0].sources = ['http://example.com'])],
  [
    'credential-bearing URL',
    (item) => (item.platforms.darwin.readable[0].sources = ['https://user:password@example.com']),
  ],
]) {
  test(`schema validation rejects ${name}`, async (t) => {
    const item = profile()
    mutate(item)
    const root = await repository(t, [item])
    await assert.rejects(renderCatalog(root), /sandbox\/java\/paths.json/)
  })
}

test('repository validation rejects category id mismatches', async (t) => {
  const root = await repository(t)
  await writeFile(path.join(root, 'sandbox/java/paths.json'), JSON.stringify(profile('go')))
  await assert.rejects(renderCatalog(root), /must match directory/)
})

test('repository validation rejects linked categories without reading their contents', async (t) => {
  const root = await repository(t)
  await symlink(
    path.join(root, 'sandbox/java'),
    path.join(root, 'sandbox/linked'),
    process.platform === 'win32' ? 'junction' : 'dir'
  )
  await assert.rejects(renderCatalog(root), /linked.*symbolic link/)
})

test('repository validation rejects linked configuration files', async (t) => {
  const root = await repository(t)
  const file = path.join(root, 'sandbox/java/paths.json')
  await writeFile(path.join(root, 'outside.json'), JSON.stringify(profile()))
  await rm(file)
  try {
    await symlink(path.join(root, 'outside.json'), file, 'file')
  } catch (error) {
    if (process.platform === 'win32' && error.code === 'EPERM') {
      t.skip('Windows file symlinks require Developer Mode or elevated privileges')
      return
    }
    throw error
  }
  await assert.rejects(renderCatalog(root), /paths.json.*regular file/)
})

test('repository validation rejects executable configurations', async (t) => {
  if (process.platform === 'win32') {
    t.skip('Windows chmod does not implement POSIX executable bits')
    return
  }
  const root = await repository(t)
  await chmod(path.join(root, 'sandbox/java/paths.json'), 0o755)
  await assert.rejects(renderCatalog(root), /executable/)
})

test('documentation and sandbox evidence are required', async (t) => {
  const item = profile()
  item.verification.level = 'sandbox-tested'
  const root = await repository(t, [item])
  await assert.rejects(renderCatalog(root), /test evidence/)
  await rm(path.join(root, 'sandbox/java/README.md'))
  await assert.rejects(renderCatalog(root), /README.md/)
})

test('oversized profile input is rejected before JSON parsing', async (t) => {
  const root = await repository(t)
  await writeFile(path.join(root, 'sandbox/java/paths.json'), ' '.repeat(128 * 1024 + 1))
  await assert.rejects(renderCatalog(root), /128 KiB/)
})

test('maintenance CLI builds, detects stale content and never modifies files during validation', async (t) => {
  const root = await repository(t)
  const script = fileURLToPath(new URL('../scripts/catalog.mjs', import.meta.url))
  const run = (command) =>
    spawnSync(process.execPath, [script, command], { cwd: root, encoding: 'utf8', timeout: 10000 })
  const first = run('build')
  assert.equal(first.status, 0, first.stderr)
  const file = path.join(root, 'sandbox/index.json')
  assert.ok(existsSync(file), 'build must create sandbox/index.json')
  const before = await readFile(file, 'utf8')
  assert.equal(run('validate').status, 0)
  const item = profile()
  item.description = 'Changed description'
  await writeFile(path.join(root, 'sandbox/java/paths.json'), JSON.stringify(item))
  const stale = run('validate')
  assert.equal(stale.status, 1)
  assert.match(stale.stderr, /stale.*build/)
  assert.equal(await readFile(file, 'utf8'), before)
  assert.equal(run('build').status, 0)
  assert.equal(run('validate').status, 0)
  const unknown = run('unknown')
  assert.equal(unknown.status, 1)
  assert.match(unknown.stderr, /Usage/)
})

test('source text must be lossless UTF-8', async (t) => {
  const root = await repository(t)
  const bytes = Buffer.from(JSON.stringify(profile()))
  const offset = bytes.indexOf(Buffer.from('Development'))
  bytes[offset] = 0xff
  await writeFile(path.join(root, 'sandbox/java/paths.json'), bytes)
  await assert.rejects(renderCatalog(root), /UTF-8/)
})

test('duplicate JSON property names cannot conceal conflicting declarations', async (t) => {
  const root = await repository(t)
  const text = JSON.stringify(profile()).replace('"id":"java"', '"id":"java","id":"java"')
  await writeFile(path.join(root, 'sandbox/java/paths.json'), text)
  await assert.rejects(renderCatalog(root), /duplicate JSON property id/)
})

test('aggregate entry budget is enforced across categories', async (t) => {
  const profiles = Array.from({ length: 21 }, (_, i) => {
    const item = profile(`category-${i}`)
    item.platforms.darwin.readable = Array.from({ length: 200 }, (_, n) => ({
      ...item.platforms.darwin.readable[0],
      id: `config-${n}`,
      path: `~/.fixture/config-${n}`,
    }))
    return item
  })
  const root = await repository(t, profiles)
  await assert.rejects(renderCatalog(root), /4096 entries/)
})

test('new schema keywords cannot be silently ignored by the dependency-free validator', async (t) => {
  const root = await repository(t)
  await mkdir(path.join(root, 'scripts'))
  await mkdir(path.join(root, 'schema'))
  await writeFile(
    path.join(root, 'scripts/catalog.mjs'),
    await readFile(new URL('../scripts/catalog.mjs', import.meta.url))
  )
  const rules = JSON.parse(
    await readFile(new URL('../schema/sandbox.schema.json', import.meta.url), 'utf8')
  )
  rules.unevaluatedProperties = false
  await writeFile(path.join(root, 'schema/sandbox.schema.json'), JSON.stringify(rules))
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/catalog.mjs'), 'build'], {
    cwd: root,
    encoding: 'utf8',
    timeout: 10000,
  })
  assert.equal(result.status, 1)
  assert.match(result.stderr, /unsupported schema keyword unevaluatedProperties/)
})

test('local evidence cannot traverse a linked parent directory', async (t) => {
  const item = profile()
  item.verification.level = 'sandbox-tested'
  const root = await repository(t, [item])
  await mkdir(path.join(root, 'outside'))
  await writeFile(path.join(root, 'outside/log.md'), 'Evidence fixture')
  await symlink(
    path.join(root, 'outside'),
    path.join(root, 'sandbox/java/evidence'),
    process.platform === 'win32' ? 'junction' : 'dir'
  )
  await writeFile(path.join(root, 'sandbox/java/README.md'), '[test evidence](evidence/log.md)\n')
  await assert.rejects(renderCatalog(root), /evidence.*linked parent/)
})

test('CRLF sources are rejected before Git attributes could change committed blob hashes', async (t) => {
  const root = await repository(t)
  const file = path.join(root, 'sandbox/java/paths.json')
  await writeFile(file, (await readFile(file, 'utf8')).replaceAll('\n', '\r\n'))
  await assert.rejects(renderCatalog(root), /LF line endings/)
})


test('basic runtime contains only the eight system roots', async () => {
  const catalog = JSON.parse(await renderCatalog(fileURLToPath(new URL('../', import.meta.url))))
  const stored = catalog.presets.find((p) => p.id === 'system-runtime')
  assert.ok(stored, 'basic runtime must be available')
  const item = JSON.parse(stored.content)
  assert.deepEqual(item.platforms.darwin.readable.map((p) => p.path), [
    '/usr', '/bin', '/sbin', '/System', '/Library', '/private/etc', '/private/var/db', '/private/var/select'
  ])
  assert.equal(Object.keys(item.platforms).length, 1)
})


test('optional development categories cover former toolchain roots without selecting them by default', async () => {
  const catalog = JSON.parse(await renderCatalog(fileURLToPath(new URL('../', import.meta.url))))
  const paths = catalog.presets.filter((p) => p.id !== 'system-runtime').flatMap((p) =>
    JSON.parse(p.content).platforms.darwin?.readable.map((e) => e.path) ?? [])
  for (const target of ['~/.nvm', '~/.volta', '~/.fnm', '~/.local/share/fnm', '~/.local/state/fnm_multishells', '~/.bun', '~/.deno', '~/.cargo', '~/.rustup', '~/.pnpm-store', '~/Library/pnpm', '~/.local/share/pnpm', '~/.npm', '~/.yarn', '~/.m2', '~/.gradle', '~/.sdkman', '~/.pyenv', '~/.local/share/uv', '~/.cache', '~/.local/bin']) {
    assert.ok(paths.includes(target), `optional category must contain ${target}`)
  }
})


test('added toolchain roots cite their own tool documentation', async () => {
  const catalog = JSON.parse(await renderCatalog(fileURLToPath(new URL('../', import.meta.url))))
  const node = JSON.parse(catalog.presets.find((p) => p.id === 'node').content)
  for (const entry of node.platforms.darwin.readable.filter((e) => e.path.includes('fnm'))) {
    assert.ok(entry.sources.every((url) => url.startsWith('https://github.com/Schniz/fnm')))
  }
  const java = JSON.parse(catalog.presets.find((p) => p.id === 'java').content)
  assert.ok(java.platforms.darwin.readable.find((e) => e.path === '~/.m2').sources.includes('https://maven.apache.org/settings.html'))
})
