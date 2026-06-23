export default function Footer() {
  return (
    <footer className="py-14 px-6" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-display text-xl mb-3" style={{ color: 'var(--color-accent)' }}>𝒱ivah 𝒫atra</h3>
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Beautiful, animated wedding invitation templates for every culture and style.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Templates</h4>
            {['Hindu', 'Sikh', 'Christian', 'Modern'].map(cat => (
              <a key={cat} href="/templates" className="block font-sans text-xs mb-2.5 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-muted)' }}>{cat} Templates</a>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Company</h4>
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="block font-sans text-xs mb-2.5 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-muted)' }}>{link}</a>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: 'var(--color-accent)' }}>Support</h4>
            <a href="/#faq" className="block font-sans text-xs mb-2.5 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-muted)' }}>FAQ</a>
            <a href="#" className="block font-sans text-xs mb-2.5 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-muted)' }}>Help Center</a>
            <a href="mailto:support@vivahpatra.co" className="block font-sans text-xs mb-2.5 hover:opacity-70 transition-opacity" style={{ color: 'var(--color-muted)' }}>Email Us</a>
          </div>
        </div>
        <div className="pt-6 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="font-sans text-[10px] tracking-wider" style={{ color: 'var(--color-muted)' }}>© 2026 Vivah Patra. Made with love in India</p>
        </div>
      </div>
    </footer>
  )
}
