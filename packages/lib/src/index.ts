import { Browser, type BrowserOptions, type ScreenshotParams } from './browser'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import type { BrowserContextOptions, Page } from 'playwright'

export async function generateImage(
  options?: ScreenshotParams
): ReturnType<Page['screenshot']> {
  const html = new XMLSerializer().serializeToString(document)
  const tmpFile = path.join(
    os.tmpdir(),
    `tmp${Math.random().toString(36).slice(2)}.html`
  )
  fs.writeFileSync(tmpFile, html)
  const url = `file://${tmpFile}`
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
  return Browser.getBrowser(options, options?.debug ?? false).start(
    contextOptions
  )
}

export function close() {
  return Browser.getBrowser().end()
}
