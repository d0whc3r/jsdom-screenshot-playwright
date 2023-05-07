export class Logger {
  private readonly prefix = '[jsdom-screenshot-playwright]'

  constructor(private readonly debug = false) {}

  log(...args: any[]) {
    if (this.debug) {
      args.unshift(this.prefix)
      console.log(...args)
    }
  }

  error(...args: any[]) {
    if (this.debug) {
      args.unshift(this.prefix)
      console.error(...args)
    }
  }
}
