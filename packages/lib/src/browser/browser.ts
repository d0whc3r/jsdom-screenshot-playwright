import { BrowserInstance } from './instance'
import type { BrowserOptions } from './types'

export class Browser {
  private static _instance?: BrowserInstance = undefined
  private static lastOptions?: BrowserOptions = undefined

  static getBrowser(options?: BrowserOptions, withDebug = false) {
    if (
      !this._instance ||
      (options &&
        JSON.stringify(this.lastOptions ?? '') !==
          JSON.stringify(options ?? ''))
    ) {
      this.lastOptions = options
      if (this._instance?.end) {
        this._instance.end()
      }
      return (this._instance = new BrowserInstance(options, withDebug))
    }
    return this._instance
  }
}
