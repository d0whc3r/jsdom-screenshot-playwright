import { type CSSProperties, type ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant }: ButtonProps) {
  const style: CSSProperties = {
    backgroundColor: variant === 'primary' ? 'blue' : 'red',
  }

  return <button style={style}>{children}</button>
}
