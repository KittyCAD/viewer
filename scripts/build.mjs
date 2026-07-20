import * as esbuild from 'esbuild'
import fs from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const kittycadRoot = path.resolve(root, '..', 'kittycad.ts')
const modelingAppStdRoot = path.resolve(root, '..', 'modeling-app', 'rust', 'kcl-lib', 'std')
const assetsDir = path.join(root, 'public', 'assets')
const kclWasmPackageRoot = path.join(root, 'node_modules', '@kittycad', 'kcl-wasm-lib')
const watch = process.argv.includes('--watch')
const serve = process.argv.includes('--serve')

await fs.mkdir(assetsDir, { recursive: true })
await verifyKclWasmVersion()
await copyKclWasm()
await copyStdKclFiles()

const workerOptions = {
  absWorkingDir: root,
  bundle: true,
  entryPoints: [path.join(kittycadRoot, 'src', 'worker-engine.ts')],
  format: 'esm',
  logLevel: 'info',
  outfile: path.join(assetsDir, 'worker-engine.js'),
  platform: 'browser',
  plugins: [viewerDependencyPlugin()],
  sourcemap: true,
  target: 'es2024',
  treeShaking: false,
}

const appOptions = {
  absWorkingDir: root,
  bundle: true,
  entryPoints: [path.join(root, 'src', 'main.ts')],
  format: 'esm',
  logLevel: 'info',
  outfile: path.join(assetsDir, 'main.js'),
  platform: 'browser',
  plugins: [kittycadSourcePlugin()],
  sourcemap: true,
  target: 'es2024',
}

if (watch) {
  const workerContext = await esbuild.context(workerOptions)
  const appContext = await esbuild.context(appOptions)
  await workerContext.watch()
  await appContext.watch()
  console.log('Watching src and local kittycad.ts sources...')
  if (serve) startStaticServer()
} else {
  await esbuild.build(workerOptions)
  await esbuild.build(appOptions)
  if (serve) startStaticServer()
}

async function copyKclWasm() {
  const wasmPath = path.join(kclWasmPackageRoot, 'kcl_wasm_lib_bg.wasm')
  await fs.copyFile(wasmPath, path.join(root, 'public', 'kcl_wasm_lib_bg.wasm'))
}

async function copyStdKclFiles() {
  const target = path.join(root, 'public', 'kcl-std')
  await fs.rm(target, { recursive: true, force: true })
  await fs.cp(modelingAppStdRoot, target, { recursive: true })
}

async function verifyKclWasmVersion() {
  const kittycadPackage = await readJson(path.join(kittycadRoot, 'package.json'))
  const viewerWasmPackage = await readJson(path.join(kclWasmPackageRoot, 'package.json'))
  const expectedVersion = kittycadPackage.dependencies?.['@kittycad/kcl-wasm-lib']

  if (!expectedVersion) {
    throw new Error('Unable to find @kittycad/kcl-wasm-lib in kittycad.ts/package.json.')
  }

  if (viewerWasmPackage.version !== expectedVersion) {
    throw new Error(
      `@kittycad/kcl-wasm-lib version mismatch. kittycad.ts requires ${expectedVersion}, ` +
        `but this viewer has ${viewerWasmPackage.version}. Run ` +
        `npm install @kittycad/kcl-wasm-lib@${expectedVersion}.`
    )
  }
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

function kittycadSourcePlugin() {
  return {
    name: 'kittycad-source',
    setup(build) {
      build.onResolve({ filter: /^@kittycad\/lib$/ }, () => ({
        namespace: 'kittycad-client-shim',
        path: 'client',
      }))

      build.onLoad({ filter: /.*/, namespace: 'kittycad-client-shim' }, () => ({
        contents: `export { Client } from ${JSON.stringify(path.join(kittycadRoot, 'src', 'client.ts'))}`,
        loader: 'js',
        resolveDir: root,
      }))

      build.onResolve({ filter: /^@kittycad\/lib-websocket-engine$/ }, () => ({
        path: path.join(kittycadRoot, 'src', 'websocket-engine.ts'),
      }))

      build.onResolve({ filter: /^web-worker:/ }, (args) => ({
        namespace: 'worker-constructor',
        path: args.path,
      }))

      build.onLoad({ filter: /.*/, namespace: 'worker-constructor' }, () => ({
        contents: `
          export default class WorkerEngine extends Worker {
            constructor() {
              super(new URL('./worker-engine.js', import.meta.url), { type: 'module' })
            }
          }
        `,
        loader: 'js',
      }))
    },
  }
}

function viewerDependencyPlugin() {
  return {
    name: 'viewer-dependencies',
    setup(build) {
      build.onResolve({ filter: /^@kittycad\/kcl-wasm-lib$/ }, () => ({
        path: path.join(kclWasmPackageRoot, 'kcl_wasm_lib.js'),
      }))
    },
  }
}

function startStaticServer() {
  const publicDir = path.join(root, 'public')
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url || '/', 'http://localhost')
      const requested = url.pathname === '/' ? '/index.html' : url.pathname
      const filePath = path.resolve(publicDir, `.${decodeURIComponent(requested)}`)
      if (!filePath.startsWith(publicDir)) {
        res.writeHead(403)
        res.end('Forbidden')
        return
      }

      const body = await fs.readFile(filePath)
      res.writeHead(200, { 'content-type': contentType(filePath) })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })

  server.listen(5173, () => {
    console.log('Serving http://localhost:5173')
  })
}

function contentType(filePath) {
  switch (path.extname(filePath)) {
    case '.css':
      return 'text/css; charset=utf-8'
    case '.html':
      return 'text/html; charset=utf-8'
    case '.js':
      return 'text/javascript; charset=utf-8'
    case '.map':
      return 'application/json; charset=utf-8'
    case '.wasm':
      return 'application/wasm'
    default:
      return 'application/octet-stream'
  }
}
