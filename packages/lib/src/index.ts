import { Browser, type BrowserOptions, type ScreenshotParams } from './browser'
import { Server } from './server'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import type { BrowserContextOptions, Page } from 'playwright'

const baseDir = path.join(os.tmpdir(), 'jsdom-screenshot-playwright')
const server = Server.instance(baseDir)
let closeTimeout: ReturnType<typeof setTimeout>

export async function generateImage(
  options?: ScreenshotParams
): ReturnType<Page['screenshot']> {
  const html = new XMLSerializer().serializeToString(document)
  const fileName = `tmp${Math.random().toString(36).slice(2)}.html`
  const tmpFile = path.join(baseDir, fileName)
  fs.writeFileSync(tmpFile, html)
  const url = `http://localhost:${server.port}/${fileName}`
  const result = await Browser.getBrowser().screenshot(url, options?.selector, {
    ...options,
    screenshotOptions: {
      scale: 'css',
      ...options?.screenshotOptions,
    },
  })
  fs.unlinkSync(tmpFile)
  return result
}

export function start(
  options?: BrowserOptions,
  contextOptions?: BrowserContextOptions
) {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
  return Promise.all([
    server.start(),
    Browser.getBrowser(options, options?.debug ?? false).start(contextOptions),
  ])
}

export function close() {
  if (closeTimeout) {
    clearTimeout(closeTimeout)
  }
  return new Promise((resolve, reject) => {
    closeTimeout = setTimeout(() => {
      Promise.all([server.stop(), Browser.getBrowser().end()]).then(
        resolve,
        reject
      )
    }, 2_000)
  })
}
