export default function Footer() {
  return (
    <footer className="py-14 px-6" style={{ borderTop: '1px solid #eee', background: '#fafafa' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="font-display text-xl mb-3" style={{ color: '#1a1a1a' }}>𝒱ivah 𝒫atra</h3>
            <p className="font-sans text-xs leading-relaxed" style={{ color: '#999' }}>
              Beautiful, animated wedding invitation templates for every culture and style.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#e8384f' }}>Templates</h4>
            {(['Hindu', 'Sikh', 'Christian', 'Modern'] as const).map(cat => (
              <a key={cat} href={`/templates?category=${cat}`} className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>{cat} Templates</a>
            ))}
            <a href="/templates?category=Modern" className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>Sacred Mandala</a>
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#e8384f' }}>Company</h4>
            {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map(link => (
              <a key={link} href="#" className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>{link}</a>
            ))}
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-semibold tracking-[0.3em] uppercase mb-4" style={{ color: '#e8384f' }}>Support</h4>
            <a href="/#faq" className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>FAQ</a>
            <a href="#" className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>Help Center</a>
            <a href="mailto:support@vivahpatra.co" className="block font-sans text-xs mb-2.5 hover:text-black transition-colors" style={{ color: '#999' }}>Email Us</a>
          </div>
        </div>
        <div className="pt-6 text-center" style={{ borderTop: '1px solid #eee' }}>
          <p className="font-sans text-[10px] tracking-wider" style={{ color: '#bbb' }}>© 2026 Vivah Patra. Made with love in India</p>
        </div>
      </div>
    </footer>
  )
}
