import { BrowserInstance } from './instance'

describe('BrowserInstance', () => {
  let instance: BrowserInstance

  beforeEach(() => {
    instance = new BrowserInstance()
  })

  afterAll(() => {
    instance.end()
  })

  it('should be defined', () => {
    expect(instance).toBeTruthy()
  })

  it('should start correctly', async () => {
    const result = await instance.start()
    expect(result).toBe(true)
  })

  it('should end without errors', async () => {
    await instance.end()
    expect(true).toBe(true)
  })

  it('should take a screenshot', async () => {
    const result = await instance.screenshot('https://example.com')
    expect(result).toBeTruthy()
  })

  it('should take a screenshot with selector', async () => {
    const result = await instance.screenshot('https://example.com', 'div')
    expect(result).toBeTruthy()
  })

  it('should take a screenshot with default selector', async () => {
    const result1 = await instance.screenshot('https://example.com', 'div')
    const result2 = await new BrowserInstance({
      defaultSelector: 'div',
    }).screenshot('https://example.com')
    expect(result1).toEqual(result2)
  })
})
