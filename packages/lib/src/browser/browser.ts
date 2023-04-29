import { BrowserInstance } from './instance'
import type { BrowserOptions } from './types'

export class Browser {
  private static _instance?: BrowserInstance
  private static lastOptions?: BrowserOptions

  static getBrowser(options?: BrowserOptions, withDebug = false) {
    if (
      !this._instance ||
      JSON.stringify(this.lastOptions ?? '') !== JSON.stringify(options ?? '')
    ) {
      if (this._instance) {
        this._instance.end()
      }
      return (this._instance = new BrowserInstance(options, withDebug))
    }
    return this._instance
  }
}
