import { type CSSProperties, type ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary' }: ButtonProps) {
  const style: CSSProperties = {
    backgroundColor: variant === 'primary' ? 'blue' : 'red',
    color: variant === 'primary' ? 'white' : 'black',
    height: '25px',
    width: '100px',
    fontFamily: 'Roboto, sans-serif',
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
        rel="stylesheet"
      />
      <button style={style}>{children}</button>
    </>
  )
}
