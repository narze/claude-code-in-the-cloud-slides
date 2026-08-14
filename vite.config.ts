import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = dirname(fileURLToPath(import.meta.url))
const imagesDir = join(projectRoot, 'images')

// Maps the MIME types clipboard paste can realistically hand us to a file
// extension. Falls back to `.png` for anything unrecognized.
const mimeToExt: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
}

async function readRequestBody(req: AsyncIterable<Buffer>): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req)
    chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf-8')
}

// Slidev invalidates the `/@slidev/configs` virtual module whenever the deck
// headmatter changes. Nothing accepts that module, so Vite escalates to a full
// page reload - which throws away in-progress typing in the built-in slide
// editor. Dropping it from the update keeps the HMR patch and skips the reload.
// Headmatter changes (theme, transition, title, ...) then apply on the next
// manual refresh instead of instantly.
export default {
  plugins: [
    {
      name: 'local:no-full-reload-on-headmatter',
      handleHotUpdate(ctx: { modules: { id: string | null }[] }) {
        return ctx.modules.filter(mod => mod.id !== '/@slidev/configs')
      },
    },
    // Backs the clipboard-image-paste feature (see `setup/main.ts`): the
    // browser can't write to disk itself, so pasted images are POSTed here
    // as a base64 data URL and saved under `./images`. Dev-server only -
    // `slidev build`/`export` never hit this endpoint.
    {
      name: 'local:clipboard-image-upload',
      apply: 'serve' as const,
      configureServer(server: { middlewares: { use: (path: string, handler: (req: any, res: any) => Promise<void>) => void } }) {
        server.middlewares.use('/__slidev-clipboard-image', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }

          try {
            const { dataUrl } = JSON.parse(await readRequestBody(req))
            const match = /^data:(image\/[\w.+-]+);base64,(.+)$/.exec(dataUrl ?? '')
            if (!match) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'Expected a base64 image data URL' }))
              return
            }

            const [, mime, base64] = match
            const ext = mimeToExt[mime] ?? 'png'
            const filename = `pasted-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

            await mkdir(imagesDir, { recursive: true })
            await writeFile(join(imagesDir, filename), Buffer.from(base64, 'base64'))

            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ path: `/images/${filename}` }))
          }
          catch (error) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
          }
        })
      },
    },
  ],
}
