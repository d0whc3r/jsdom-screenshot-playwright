import { Logger } from '../logger'
import * as fs from 'fs'
import * as http from 'http'
import * as path from 'path'

export class Server {
  private static _instance: Server
  private readonly server: http.Server
  private readonly logger: Logger

  private constructor(private readonly baseDir: string, withDebug?: boolean) {
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true })
    }
    this.logger = new Logger(withDebug)
    this.logger.log('constructor', { baseDir, withDebug })
    this.server = http.createServer((req, res) => {
      const url = new URL(req.url ?? '', `http://localhost:${this._port}`)
      this.logger.log(
        'request',
        { url: url.href, pathname: url.pathname },
        this.baseDir,
        url.pathname
      )
      const file = path.join(this.baseDir, url.pathname)
      this.logger.log('request', { url: url.href, file })
      if (!fs.existsSync(file)) {
        res.statusCode = 404
        res.end()
        return
      }
      const content = fs.readFileSync(file, 'utf8')
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      res.end(content)
    })
  }

  private _port = 0

  get port() {
    return this._port
  }

  static instance(baseDir: string, withDebug?: boolean) {
    if (
      !this._instance ||
      this._instance.baseDir !== baseDir ||
      !this._instance.server.listening
    ) {
      this._instance?.stop()
      this._instance = new Server(baseDir, withDebug)
    }
    return this._instance
  }

  async stop() {
    this.logger.log('stop')
    return new Promise<void>((resolve, reject) => {
      console.log('STOP this.server.listening', this.server.listening)
      if (this.server.listening) {
        this.server.close((err) => {
          if (err) {
            this.logger.error('stop', err)
            reject(err)
          } else {
            this.logger.log('stop', { port: this._port })
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  }

  async start() {
    this.logger.log('start')
    return new Promise<number>((resolve, reject) => {
      if (this.server.listening) {
        this.logger.log('start', { port: this._port })
        return resolve(this._port)
      }
      this.server.listen(0, () => {
        const address = this.server.address()
        if (typeof address === 'string' || !address) {
          this.logger.log('start', { address })
          return this.stop().then(() =>
            reject(new Error('Unexpected address type'))
          )
        }
        this._port = address.port
        this.logger.log('start', { port: this._port })
        resolve(this._port)
      })
      this.server.on('error', (err) => {
        this.logger.error('start', err)
        reject(err)
      })
    })
  }
}
