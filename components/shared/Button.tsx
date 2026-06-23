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
  const base = 'inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm font-semibold tracking-wider transition-all duration-300'
  const sizes = 'px-8 py-3'
  const width = fullWidth ? 'w-full' : ''

  const variants = {
    primary: 'text-white hover:brightness-110 hover:scale-[1.02]',
    secondary: 'hover:opacity-80',
    outline: 'border hover:border-[rgba(200,146,42,0.5)]',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: { background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent2))', boxShadow: '0 4px 24px rgba(200,146,42,0.25)' },
    secondary: { background: 'var(--color-text)', color: 'var(--color-bg)' },
    outline: { borderColor: 'var(--color-border)', color: 'var(--color-text)' },
  }

  const cls = `${base} ${sizes} ${variants[variant]} ${width} ${className}`

  if (href) return <a href={href} className={cls} style={styles[variant]}>{children}</a>
  return <button onClick={onClick} className={cls} style={styles[variant]}>{children}</button>
}
