import { type CSSProperties, type ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary' }: ButtonProps) {
  const style: CSSProperties = {
    backgroundColor: variant === 'primary' ? 'blue' : 'red',
    color: variant === 'primary' ? 'white' : 'black',
    height: '30px',
    width: '120px',
    fontFamily: 'Roboto, arial, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
  }

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <button style={style}>{children}</button>
    </>
  )
}
