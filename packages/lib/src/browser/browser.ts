import { BrowserInstance } from './instance'
import type { BrowserOptions } from './types'

export class Browser {
  private static _instance: BrowserInstance | undefined

  static getBrowser(options?: BrowserOptions, withDebug = false) {
    return (
      this._instance ??
      (this._instance = new BrowserInstance(options, withDebug))
    )
  }
}
