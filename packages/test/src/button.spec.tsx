import Button from './button'
import { render } from '@testing-library/react'
import { generateImage } from 'jsdom-screenshot-playwright'

describe('Button', () => {
  it('should render successfully', async () => {
    render(<Button>Test</Button>)

    const screenshot = await generateImage()
    expect(screenshot).toMatchImageSnapshot()
  })
  it('should render successfully with variant', async () => {
    render(<Button variant="secondary">Test variant</Button>)

    const screenshot = await generateImage()
    expect(screenshot).toMatchImageSnapshot()
  })
})
