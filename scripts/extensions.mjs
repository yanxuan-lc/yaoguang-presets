/** Repository-only extension release validation; package code and evidence links are never executed. */
import { randomUUID } from 'node:crypto'
import { constants } from 'node:fs'
import { lstat, open, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv/dist/2020.js'
import addFormats from 'ajv-formats'
import semver from 'semver'

const moduleRoot = fileURLToPath(new URL('../', import.meta.url))
const schema = JSON.parse(await readFile(path.join(moduleRoot,'schema/extensions.schema.json'),'utf8'))
const ajv = new Ajv({ allErrors: true, strict: true })
addFormats(ajv)
const validate = ajv.compile(schema)
const fail = (location,message) => { throw new Error(`${location}: ${message}`) }
async function readOrdinary(root,relative,maxBytes) {
  const pieces=relative.split('/')
  let parent=root
  for (const piece of pieces.slice(0,-1)) {
    parent=path.join(parent,piece)
    const stat=await lstat(parent)
    if (!stat.isDirectory() || stat.isSymbolicLink()) fail(relative,'parent must be an ordinary directory')
  }
  const file=path.join(root,...pieces),before=await lstat(file,{bigint:true})
  if (!before.isFile() || before.isSymbolicLink()) fail(relative,'expected an ordinary file')
  if (process.platform!=='win32' && (before.mode & 0o111n)) fail(relative,'executable metadata is forbidden')
  if (before.size>BigInt(maxBytes)) fail(relative,'input exceeds byte budget')
  const handle=await open(file,constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0))
  try {
    const opened=await handle.stat({bigint:true})
    if (!opened.isFile() || opened.dev!==before.dev || opened.ino!==before.ino || opened.size!==before.size) fail(relative,'opened identity differs')
    const chunks=[]
    let total=0
    for (;;) {
      const buffer=Buffer.alloc(65536),result=await handle.read(buffer,0,buffer.length,null)
      if (!result.bytesRead) break
      total+=result.bytesRead
      if (total>maxBytes) fail(relative,'input exceeds byte budget')
      chunks.push(buffer.subarray(0,result.bytesRead))
    }
    const after=await handle.stat({bigint:true}),current=await lstat(file,{bigint:true})
    if (current.dev!==opened.dev || current.ino!==opened.ino || after.size!==opened.size || after.mtimeNs!==opened.mtimeNs || after.ctimeNs!==opened.ctimeNs || total!==Number(opened.size)) fail(relative,'file changed during reading')
    return Buffer.concat(chunks,total)
  } finally { await handle.close() }
}
function decode(bytes,location) {
  let content
  try {content=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(bytes)} catch {fail(location,'invalid UTF-8')}
  let value
  try {value=JSON.parse(content)} catch {fail(location,'invalid JSON')}
  const stack=[]
  for (const match of content.matchAll(/"(?:[^"\\]|\\.)*"|[{}[\]]/g)) {
    const token=match[0]
    if (token==='{') stack.push(new Set())
    else if (token==='[') stack.push(null)
    else if (token==='}' || token===']') stack.pop()
    else if (/^\s*:/.test(content.slice(match.index+token.length))) {
      const key=JSON.parse(token),keys=stack.at(-1)
      if (keys?.has(key)) fail(location,`duplicate JSON property ${key}`)
      keys?.add(key)
    }
  }
  return value
}
function https(value,location) {
  let url
  try {url=new URL(value)} catch {fail(location,'expected HTTPS URL')}
  if (url.protocol!=='https:' || url.username || url.password || url.hash) fail(location,'expected HTTPS URL without credentials or fragment')
  return url
}
function semantic(release,location) {
  const strings=[]
  function collect(value) {if(typeof value==='string') strings.push(value);else if(value && typeof value==='object') Object.values(value).forEach(collect)}
  collect(release)
  if(strings.some(v=>/[\p{Cc}]/u.test(v))) fail(location,'control characters are forbidden')
  if(semver.valid(release.version)!==release.version) fail(`${location}.version`,'expected complete canonical SemVer')
  if(semver.validRange(release.compatibility.productRange)===null) fail(`${location}.compatibility.productRange`,'invalid SemVer range')
  if(release.releaseId!==`${release.packageName}@${release.version}`) fail(`${location}.releaseId`,'must match exact package name and version')
  const tarball=https(release.artifact.tarballUrl,`${location}.artifact.tarballUrl`)
  const base=release.packageName.split('/').at(-1)
  if(tarball.origin!=='https://registry.npmjs.org' || tarball.search || tarball.pathname!==`/${release.packageName}/-/${base}-${release.version}.tgz`) fail(`${location}.artifact.tarballUrl`,'expected exact public npm tarball')
  const sri=release.artifact.integrity.slice(7)
  if(Buffer.from(sri,'base64').toString('base64')!==sri) fail(`${location}.artifact.integrity`,'expected canonical SHA512 SRI')
  https(release.publisher.url,`${location}.publisher.url`)
  https(release.source.repository,`${location}.source.repository`)
  release.authors.forEach((a,i)=>{if(a.url) https(a.url,`${location}.authors[${i}].url`)})
  release.review.evidence.forEach((url,i)=>https(url,`${location}.review.evidence[${i}]`))
  if(new Set(release.requiredProtocols).size!==release.requiredProtocols.length) fail(`${location}.requiredProtocols`,'duplicate protocol')
  const targets=release.compatibility.platforms.map(p=>`${p.os}/${p.arch}`)
  if(new Set(targets).size!==targets.length) fail(`${location}.compatibility.platforms`,'duplicate platform target')
}
/** Returns deterministic complete index bytes; invalid metadata rejects the entire generation. */
export async function renderExtensions(root) {
  const directory=path.join(root,'extensions','releases')
  let files=[]
  try {
    const stat=await lstat(directory)
    if(!stat.isDirectory() || stat.isSymbolicLink()) fail('extensions/releases','expected ordinary directory')
    files=(await readdir(directory)).sort()
  } catch(error) {if(error.code!=='ENOENT') throw error}
  const releases=[],ids=new Set()
  if(files.length>2000) fail('extensions/releases','more than 2000 exact releases')
  let bytes=0
  for(const file of files) {
    if(!/^[a-zA-Z0-9][a-zA-Z0-9._-]*\.json$/.test(file)) fail(`extensions/releases/${file}`,'expected flat JSON release filename')
    const location=`extensions/releases/${file}`,content=await readOrdinary(root,location,128*1024)
    bytes+=content.length
    if(bytes>8*1024*1024) fail('extensions/releases','catalog exceeds 8 MiB')
    const release=decode(content,location)
    if(!validate({releases:[release]})) fail(location,`${validate.errors[0].instancePath}: ${validate.errors[0].message}`)
    semantic(release,location)
    if(ids.has(release.releaseId)) fail(`${location}.releaseId`,'duplicate exact release')
    ids.add(release.releaseId);releases.push(release)
  }
  releases.sort((a,b)=>a.releaseId<b.releaseId?-1:a.releaseId>b.releaseId?1:0)
  const output=JSON.stringify({releases},null,2)+'\n'
  if(Buffer.byteLength(output)+bytes>8*1024*1024) fail('extensions/index.json','complete catalog exceeds 8 MiB')
  return output
}
/** Publishes an index only after every release validates; source files remain untouched. */
export async function buildExtensions(root) {
  const content=await renderExtensions(root),temporary=path.join(root,'extensions',`.index-${randomUUID()}.tmp`)
  try {await writeFile(temporary,content,{flag:'wx',mode:0o644});await rename(temporary,path.join(root,'extensions','index.json'))}
  finally {await rm(temporary,{force:true})}
}
/** Refuses stale or unsafe generated output without modifying the repository. */
export async function validateExtensions(root) {
  const expected=await renderExtensions(root),actual=new TextDecoder('utf-8',{fatal:true,ignoreBOM:true}).decode(await readOrdinary(root,'extensions/index.json',8*1024*1024))
  if(actual!==expected) fail('extensions/index.json','stale index; run npm run build')
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const command=process.argv[2]
    if(process.argv.length!==3 || !['build','validate'].includes(command)) throw new Error('Usage: node scripts/extensions.mjs <build|validate>')
    if(command==='build') await buildExtensions(process.cwd());else await validateExtensions(process.cwd())
    console.log(`${command==='build'?'Generated':'Validated'} extension catalog`)
  } catch(error) {console.error(error.message);process.exitCode=1}
}
