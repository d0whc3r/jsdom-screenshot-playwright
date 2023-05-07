import { Server } from './index'
import path from 'path'

describe('server', () => {
  let server: Server
  let port: number

  beforeEach(async () => {
    server = Server.instance(path.resolve(__dirname, 'mock'), true)
    port = await server.start()
  })

  afterEach(async () => {
    await server.stop()
  })

  it('should start', async () => {
    expect(port).toBeGreaterThan(0)
  })

  it('should show the html', async () => {
    const res = await fetch(`http://localhost:${port}/sample.html`)
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('text/html')
    const text = await res.text()
    expect(text).toContain('<html>')
    expect(text).toContain('<h1>Sample</h1>')
  })

  it('should stop', async () => {
    await server.stop()
    await expect(fetch(`http://localhost:${port}/sample.html`)).rejects.toThrow(
      'fetch failed'
    )
  })
})
