export default function Footer() {
  return (
    <footer className="py-12 px-6" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--color-accent)' }}>Vivah Patra</h3>
            <p className="font-sans text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              Beautiful, animated wedding invitation templates for every culture and style.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase mb-3">Templates</h4>
            {['Hindu', 'Sikh', 'Christian', 'Modern'].map(cat => (
              <a key={cat} href={`/templates`} className="block font-sans text-xs mb-2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>{cat} Templates</a>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase mb-3">Company</h4>
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="block font-sans text-xs mb-2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>{link}</a>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-xs font-semibold tracking-wider uppercase mb-3">Support</h4>
            <a href="/#faq" className="block font-sans text-xs mb-2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>FAQ</a>
            <a href="#" className="block font-sans text-xs mb-2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>Help Center</a>
            <a href="mailto:support@weddinginvites.com" className="block font-sans text-xs mb-2 hover:opacity-70" style={{ color: 'var(--color-muted)' }}>Email Us</a>
          </div>
        </div>
        <div className="pt-6 text-center" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="font-sans text-xs" style={{ color: 'var(--color-muted)' }}>© 2026 Vivah Patra. Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
