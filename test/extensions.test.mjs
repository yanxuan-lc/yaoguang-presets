import assert from 'node:assert/strict'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { renderExtensions } from '../scripts/extensions.mjs'
const release = () => ({releaseId:'@example/reader@1.2.3',packageName:'@example/reader',version:'1.2.3',displayName:'Reader',description:'Synthetic fixture only',publisher:{kind:'third-party',name:'Example',url:'https://example.org'},authors:[{name:'Example'}],source:{repository:'https://github.com/example/reader',commit:'a'.repeat(40)},artifact:{tarballUrl:'https://registry.npmjs.org/@example/reader/-/reader-1.2.3.tgz',integrity:`sha512-${Buffer.alloc(64).toString('base64')}`,size:200},compatibility:{productRange:'>=0.1.0 <1.0.0',platforms:[{os:'linux',arch:'x64'}]},requiredProtocols:[],review:{reviewedAt:'2026-10-08T00:00:00Z',scope:'Synthetic fixture, no published approval',evidence:['https://github.com/example/reader/pull/1']}})
test('generates a separate exact-release index and preserves third-party version and publisher',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'extension-maintenance-'))
  t.after(()=>rm(root,{recursive:true,force:true}))
  await mkdir(path.join(root,'extensions','releases'),{recursive:true})
  await writeFile(path.join(root,'extensions','releases','reader.json'),JSON.stringify(release()))
  assert.deepEqual(JSON.parse(await renderExtensions(root)),{releases:[release()]})
})
for(const kind of ['publisher','duplicate','range','artifact-origin','review','unknown','sri','duplicate-property']) {
  test(`rejects ${kind} corruption with a locatable extension file`,async t=>{
    const root=await mkdtemp(path.join(os.tmpdir(),'extension-invalid-'))
    t.after(()=>rm(root,{recursive:true,force:true}))
    await mkdir(path.join(root,'extensions','releases'),{recursive:true})
    const value=release()
    if(kind==='publisher') value.publisher.kind='trusted'
    if(kind==='range') value.compatibility.productRange='latest'
    if(kind==='artifact-origin') value.artifact.tarballUrl='https://example.org/reader.tgz'
    if(kind==='review') value.review.evidence=[]
    if(kind==='unknown') value.approved=true
    if(kind==='sri') value.artifact.integrity='sha512-fake'
    const content=kind==='duplicate-property'?JSON.stringify(value).replace('"version":"1.2.3"','"version":"1.2.3","version":"2.0.0"'):JSON.stringify(value)
    await writeFile(path.join(root,'extensions','releases','reader.json'),content)
    if(kind==='duplicate') await writeFile(path.join(root,'extensions','releases','copy.json'),JSON.stringify(value))
    await assert.rejects(renderExtensions(root),/extensions\/releases\/.+\.json/)
  })
}
test('accepts an empty catalog without inventing published or approved releases',async t=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'extension-empty-'))
  t.after(()=>rm(root,{recursive:true,force:true}))
  assert.deepEqual(JSON.parse(await renderExtensions(root)),{releases:[]})
})

test('retains language-region display names in the generated exact-release index', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'extension-display-name-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, 'extensions', 'releases'), { recursive: true })
  const value = { ...release(), displayName: { 'en-US': 'Reader', 'zh-CN': '阅读器' } }
  await writeFile(path.join(root, 'extensions', 'releases', 'reader.json'), JSON.stringify(value))
  assert.deepEqual(JSON.parse(await renderExtensions(root)), { releases: [value] })
})

for (const displayName of [{ en: 'Reader' }, { 'en-US': 'Reader', en: 'Reader' }]) {
  test(`rejects legacy language-only display name keys: ${JSON.stringify(displayName)}`, async t => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'extension-legacy-display-name-'))
    t.after(() => rm(root, { recursive: true, force: true }))
    await mkdir(path.join(root, 'extensions', 'releases'), { recursive: true })
    await writeFile(
      path.join(root, 'extensions', 'releases', 'reader.json'),
      JSON.stringify({ ...release(), displayName }),
    )
    await assert.rejects(renderExtensions(root), /extensions\/releases\/reader\.json/)
  })
}

test('retains locale-keyed descriptions in the generated exact-release index', async t => {
  const root = await mkdtemp(path.join(os.tmpdir(), 'extension-localized-'))
  t.after(() => rm(root, { recursive: true, force: true }))
  await mkdir(path.join(root, 'extensions', 'releases'), { recursive: true })
  const value = {
    ...release(),
    description: { 'en-US': 'Read **files**.', 'zh-CN': '读取**文件**。', fr: 'Lire les fichiers.' },
  }
  await writeFile(path.join(root, 'extensions', 'releases', 'reader.json'), JSON.stringify(value))
  assert.deepEqual(JSON.parse(await renderExtensions(root)), { releases: [value] })
})

for (const description of [
  {},
  { 'en-US': '' },
  { 'en-US': 12 },
  { ['x'.repeat(36)]: 'Reader' },
  { 'en-US': 'x'.repeat(2049) },
  Object.fromEntries(Array.from({ length: 33 }, (_, i) => [`locale-${i}`, 'Reader'])),
]) {
  test(`rejects invalid localized descriptions: ${JSON.stringify(description)}`, async t => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'extension-invalid-localized-'))
    t.after(() => rm(root, { recursive: true, force: true }))
    await mkdir(path.join(root, 'extensions', 'releases'), { recursive: true })
    await writeFile(
      path.join(root, 'extensions', 'releases', 'reader.json'),
      JSON.stringify({ ...release(), description }),
    )
    await assert.rejects(renderExtensions(root), /extensions\/releases\/reader\.json/)
  })
}

for (const defaultInstall of [true, false]) {
  test(`preserves explicit default installation flag ${defaultInstall} in the generated index`, async t => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'extension-default-'))
    t.after(() => rm(root, { recursive: true, force: true }))
    await mkdir(path.join(root, 'extensions', 'releases'), { recursive: true })
    const value = { ...release(), defaultInstall }
    await writeFile(path.join(root, 'extensions', 'releases', 'reader.json'), JSON.stringify(value))
    assert.deepEqual(JSON.parse(await renderExtensions(root)), { releases: [value] })
  })
}
