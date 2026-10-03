/** Repository-only sandbox catalog maintenance; never expands host paths. */
import { createHash, randomUUID } from 'node:crypto'
import { readdir, readFile, lstat, open, writeFile, rename, rm } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const moduleRoot = fileURLToPath(new URL('../', import.meta.url))
const schema = parseJson(
  decodeUtf8(
    await readRegular(moduleRoot, 'schema/sandbox.schema.json', 128 * 1024),
    'schema/sandbox.schema.json'
  ),
  'schema/sandbox.schema.json'
)
checkRules(schema)

function fail(location, message) {
  throw new Error(`${location}: ${message}`)
}

function decodeUtf8(bytes, location) {
  // Keep a BOM in the decoded text so JSON.parse rejects it instead of changing blob bytes.
  try {
    return new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(bytes)
  } catch {
    fail(location, 'expected lossless UTF-8 text')
  }
}

function parseJson(content, location) {
  let value
  try {
    value = JSON.parse(content)
  } catch {
    fail(location, 'invalid JSON')
  }
  const stack = []
  // JSON.parse establishes grammar; this token pass rejects duplicate object keys.
  for (const match of content.matchAll(/"(?:[^"\\]|\\.)*"|[{}\[\]]/g)) {
    const token = match[0]
    if (token === '{') stack.push(new Set())
    else if (token === '[') stack.push(null)
    else if (token === '}' || token === ']') stack.pop()
    else if (stack.at(-1) && /^\s*:/.test(content.slice(match.index + token.length))) {
      const key = JSON.parse(token)
      if (stack.at(-1).has(key)) fail(location, `duplicate JSON property ${key}`)
      stack.at(-1).add(key)
    }
  }
  return value
}

function checkRules(rule) {
  const supported = new Set([
    '$schema',
    '$comment',
    '$defs',
    '$ref',
    'title',
    'description',
    'type',
    'enum',
    'properties',
    'additionalProperties',
    'required',
    'minProperties',
    'minLength',
    'maxLength',
    'pattern',
    'format',
    'items',
    'minItems',
    'maxItems',
  ])
  for (const key of Object.keys(rule)) {
    if (!supported.has(key)) fail('schema/sandbox.schema.json', `unsupported schema keyword ${key}`)
  }
  if (rule.format && !['uri', 'date'].includes(rule.format))
    fail('schema/sandbox.schema.json', 'unsupported format')
  for (const nested of Object.values(rule.properties ?? {})) checkRules(nested)
  for (const nested of Object.values(rule.$defs ?? {})) checkRules(nested)
  if (rule.items) checkRules(rule.items)
}

async function readRegular(root, relative, limit) {
  const parts = relative.split(/[\\/]/)
  // Configuration and local evidence stay under ordinary repository directories.
  for (let i = 1; i < parts.length; i++) {
    const parent = await lstat(path.join(root, ...parts.slice(0, i)))
    if (!parent.isDirectory()) fail(relative, 'linked parent or non-directory is not accepted')
  }
  const file = path.join(root, relative)
  const stat = await lstat(file).catch((error) => fail(relative, error.code))
  if (!stat.isFile()) fail(relative, 'expected regular file, not symbolic link or submodule')
  if (stat.mode & 0o111) fail(relative, 'executable files are not accepted')
  if (stat.size > limit) fail(relative, `input exceeds ${limit / 1024} KiB`)
  const handle = await open(file, constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
  try {
    const buffer = Buffer.alloc(limit + 1)
    let length = 0
    while (length < buffer.length) {
      const { bytesRead } = await handle.read(buffer, length, buffer.length - length, null)
      if (!bytesRead) break
      length += bytesRead
    }
    if (length > limit) fail(relative, `input exceeds ${limit / 1024} KiB`)
    return buffer.subarray(0, length)
  } finally {
    await handle.close()
  }
}

function checkSchema(value, rule, location) {
  if (rule.$ref) {
    const target = rule.$ref
      .split('/')
      .slice(1)
      .reduce((node, key) => node?.[key], schema)
    if (!target) fail(location, `Unresolved schema reference ${rule.$ref}`)
    return checkSchema(value, target, location)
  }
  if (rule.type) {
    const matches =
      rule.type === 'array'
        ? Array.isArray(value)
        : rule.type === 'object'
          ? value !== null && typeof value === 'object' && !Array.isArray(value)
          : typeof value === rule.type
    if (!matches) fail(location, `expected ${rule.type}`)
  }
  if (rule.enum && !rule.enum.includes(value))
    fail(location, `expected one of ${rule.enum.join(', ')}`)
  if (typeof value === 'string') {
    const length = [...value].length
    if (length < (rule.minLength ?? 0) || length > (rule.maxLength ?? Infinity)) {
      fail(location, 'string length exceeds schema bounds')
    }
    if (rule.pattern && !new RegExp(rule.pattern, 'u').test(value)) fail(location, 'invalid format')
    if (rule.format === 'uri') {
      let url
      try {
        url = new URL(value)
      } catch {
        fail(location, 'expected HTTPS URL')
      }
      if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) {
        fail(location, 'expected HTTPS URL without credentials')
      }
    }
    if (rule.format === 'date') {
      const date = new Date(`${value}T00:00:00Z`)
      if (!Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
        fail(location, 'expected valid calendar date')
      }
    }
  }
  if (Array.isArray(value)) {
    if (value.length < (rule.minItems ?? 0) || value.length > (rule.maxItems ?? Infinity)) {
      fail(location, 'array length exceeds schema bounds')
    }
    value.forEach((item, i) => checkSchema(item, rule.items, `${location}[${i}]`))
  } else if (value !== null && typeof value === 'object') {
    if (Object.keys(value).length < (rule.minProperties ?? 0)) fail(location, 'missing platform')
    for (const key of rule.required ?? []) {
      if (!Object.hasOwn(value, key)) fail(`${location}.${key}`, 'required field is missing')
    }
    for (const [key, item] of Object.entries(value)) {
      if (Object.hasOwn(rule.properties ?? {}, key))
        checkSchema(item, rule.properties[key], `${location}.${key}`)
      else if (rule.additionalProperties === false) fail(`${location}.${key}`, 'unknown field')
    }
  }
}

function checkEntries(profile, location) {
  for (const [platform, value] of Object.entries(profile.platforms)) {
    const ids = new Set()
    const targets = new Set()
    for (const [i, entry] of value.readable.entries()) {
      const at = `${location}.platforms.${platform}.readable[${i}]`
      if (ids.has(entry.id)) fail(at, `duplicate entry id ${entry.id}`)
      ids.add(entry.id)
      const target = `${entry.path.replace(/\/+$/, '')}\0${entry.targetType}`
      if (targets.has(target)) fail(at, 'duplicate target')
      targets.add(target)
    }
  }
}

/**
 * Reads root/sandbox categories and returns deterministic UTF-8 catalog JSON with a final LF.
 * Rejects invalid configuration, file modes, links, missing documentation and input budgets.
 * Root is a repository path; target paths and environment placeholders are never resolved.
 */
export async function renderCatalog(root) {
  const sandbox = await lstat(path.join(root, 'sandbox'))
  if (!sandbox.isDirectory()) fail('sandbox', 'expected directory, not symbolic link')
  const entries = await readdir(path.join(root, 'sandbox'), { withFileTypes: true })
  const presets = []
  let totalEntries = 0
  for (const entry of entries.sort((a, b) => (a.name < b.name ? -1 : 1))) {
    if (entry.isSymbolicLink()) fail(`sandbox/${entry.name}`, 'symbolic link is not accepted')
    if (!entry.isDirectory()) continue
    const relative = `sandbox/${entry.name}/paths.json`
    const bytes = await readRegular(root, relative, 128 * 1024)
    const content = decodeUtf8(bytes, relative)
    if (content.includes('\r'))
      fail(relative, 'use LF line endings to preserve committed blob hashes')
    const profile = parseJson(content, relative)
    checkSchema(profile, schema, relative)
    if (profile.id !== entry.name) fail(`${relative}.id`, 'must match directory id')
    checkEntries(profile, relative)
    totalEntries += Object.values(profile.platforms).reduce(
      (count, value) => count + value.readable.length,
      0
    )
    if (totalEntries > 4096) fail('sandbox', 'catalog exceeds 4096 entries')
    const readme = (
      await readRegular(root, `sandbox/${entry.name}/README.md`, 128 * 1024)
    ).toString('utf8')
    if (profile.verification.level === 'sandbox-tested') {
      const match = readme.match(/\[(?:test evidence|测试记录)\]\(([^)]+)\)/i)
      if (!match)
        fail(`sandbox/${entry.name}/README.md`, 'sandbox-tested requires a test evidence link')
      if (!match[1].startsWith('https://')) {
        const evidence = path.resolve(root, 'sandbox', entry.name, match[1])
        if (!evidence.startsWith(path.resolve(root) + path.sep))
          fail(relative, 'test evidence must stay inside repository')
        await readRegular(root, path.relative(root, evidence), 128 * 1024)
      } else {
        checkSchema(match[1], { type: 'string', format: 'uri' }, relative)
      }
    }
    presets.push({
      id: entry.name,
      path: relative,
      blobSha: createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex'),
      content,
    })
    if (presets.length > 128) fail('sandbox', 'catalog exceeds 128 categories')
  }
  if (!presets.length) fail('sandbox', 'no categories found')
  const output = JSON.stringify({ presets }, null, 2) + '\n'
  if (Buffer.byteLength(output) > 8 * 1024 * 1024)
    fail('sandbox/index.json', 'catalog exceeds 8 MiB')
  return output
}

/**
 * Validates repository categories and atomically replaces root/sandbox/index.json.
 * Validation failure leaves the index unchanged; temporary output is removed after failure.
 */
export async function buildCatalog(root) {
  const content = await renderCatalog(root)
  const target = path.join(root, 'sandbox/index.json')
  const temporary = path.join(root, 'sandbox', `.index-${randomUUID()}.tmp`)
  try {
    await writeFile(temporary, content, { flag: 'wx', mode: 0o644 })
    await rename(temporary, target)
  } finally {
    await rm(temporary, { force: true })
  }
}

/**
 * Validates repository categories and exact generated index bytes, throwing on stale output.
 * Reads repository files only and never rewrites sources or index files.
 */
export async function validateCatalog(root) {
  const expected = await renderCatalog(root)
  const actual = (await readRegular(root, 'sandbox/index.json', 8 * 1024 * 1024)).toString('utf8')
  if (actual !== expected) fail('sandbox/index.json', 'stale catalog; run npm run build')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const command = process.argv[2]
    if (process.argv.length !== 3 || !['build', 'validate'].includes(command)) {
      throw new Error('Usage: node scripts/catalog.mjs <build|validate>')
    }
    if (command === 'build') {
      await buildCatalog(process.cwd())
      console.log('Generated sandbox/index.json')
    } else {
      await validateCatalog(process.cwd())
      console.log('Validated sandbox catalog and generated index')
    }
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
