import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  href?: string
  onClick?: () => void
  className?: string
  fullWidth?: boolean
}

export default function Button({ children, variant = 'primary', href, onClick, className = '', fullWidth }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm font-semibold tracking-wider transition-all duration-200'
  const sizes = 'px-8 py-3'
  const width = fullWidth ? 'w-full' : ''

  const variants = {
    primary: 'text-white hover:opacity-90',
    secondary: 'hover:opacity-80',
    outline: 'border hover:bg-gray-50',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--color-accent)', boxShadow: '0 4px 20px rgba(200,146,42,0.3)' },
    secondary: { background: 'var(--color-text)', color: '#fff' },
    outline: { borderColor: 'var(--color-border)', color: 'var(--color-text)' },
  }

  const cls = `${base} ${sizes} ${variants[variant]} ${width} ${className}`

  if (href) return <a href={href} className={cls} style={styles[variant]}>{children}</a>
  return <button onClick={onClick} className={cls} style={styles[variant]}>{children}</button>
}
