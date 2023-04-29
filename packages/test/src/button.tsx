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
  }

  return <button style={style}>{children}</button>
}
