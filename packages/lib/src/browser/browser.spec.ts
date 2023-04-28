/* eslint-disable jest/no-standalone-expect */
import { Browser } from './browser'
import { BrowserInstance } from './instance'

jest.mock('./instance', () => {
  return {
    BrowserInstance: jest.fn(),
  }
})

describe('Browser', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should be defined', () => {
    expect(new Browser()).toBeTruthy()
  })

  describe('getBrowser', () => {
    beforeAll(() => {
      expect(Browser.getBrowser()).toBeTruthy()
      expect(BrowserInstance).toHaveBeenCalledTimes(1)
      expect(BrowserInstance).toHaveBeenCalledWith(undefined, false)
    })

    it('should get browser', () => {
      expect(Browser.getBrowser()).toBeTruthy()
      expect(BrowserInstance).toHaveBeenCalledTimes(0)
    })

    it('should get browser with options', () => {
      expect(Browser.getBrowser({})).toBeTruthy()
      expect(BrowserInstance).toHaveBeenCalledTimes(0)
    })

    it('should get browser with debug', () => {
      expect(Browser.getBrowser({}, true)).toBeTruthy()
      expect(BrowserInstance).toHaveBeenCalledTimes(0)
    })
  })
})
