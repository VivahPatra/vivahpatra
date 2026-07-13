'use client'
import { useEffect } from 'react'

export default function ProtectionLayer() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault()
    const blockKey = (e: KeyboardEvent) => {
      if (e.key === 'F12') { e.preventDefault(); return }
      if (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) { e.preventDefault(); return }
      if (e.ctrlKey && ['U','S'].includes(e.key.toUpperCase())) { e.preventDefault() }
    }
    document.addEventListener('contextmenu', block)
    document.addEventListener('dragstart', block)
    document.addEventListener('keydown', blockKey)
    return () => {
      document.removeEventListener('contextmenu', block)
      document.removeEventListener('dragstart', block)
      document.removeEventListener('keydown', blockKey)
    }
  }, [])
  return null
}
