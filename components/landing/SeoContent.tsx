export default function SeoContent() {
  return (
    <section className="py-16 px-6" style={{ background: '#fafafa' }}>
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl mb-6 text-center">
          Digital Wedding Invitations for Every Indian Wedding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans text-sm leading-relaxed" style={{ color: '#666' }}>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>Why Choose a Digital Wedding Invitation?</h3>
            <p className="mb-4">
              Digital wedding invitations have become the preferred choice for modern Indian couples. They are animated, interactive, and shareable via WhatsApp — making it effortless to invite hundreds of guests instantly. Unlike printed cards that cost ₹15,000–₹50,000, a Vivah Patra digital wedding card costs just ₹1499 with lifetime access and unlimited edits.
            </p>
            <h3 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>Templates for Every Culture</h3>
            <p>
              From a South Indian wedding invitation with Kerala kasavu gold theme, to a Punjabi Sikh Anand Karaj card with Ik Onkar and Golden Temple, to a Christian beach wedding invite — Vivah Patra has 9+ animated templates covering every Indian wedding tradition and culture.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>How to Create Your Wedding Invitation Online</h3>
            <p className="mb-4">
              Creating a digital wedding invitation on Vivah Patra takes under 10 minutes. Choose a template, enter your names, wedding date, venue, and event details in the live editor, upload your couple photo, and share the link via WhatsApp. Your animated wedding card is ready to send.
            </p>
            <h3 className="font-semibold mb-2" style={{ color: '#1a1a1a' }}>WhatsApp Wedding Invitations — The New Tradition</h3>
            <p>
              Over 500+ Indian couples have used Vivah Patra to send their wedding invitation on WhatsApp. The unique shareable link works on all devices — Android, iPhone, and desktop — with no app download required. Guests see beautiful animations, event timings, and venue maps all in one place.
            </p>
          </div>
        </div>

        {/* Template links for internal linking */}
        <div className="mt-10">
          <h3 className="font-sans text-xs uppercase tracking-widest mb-4 text-center" style={{ color: '#aaa' }}>Browse by Wedding Type</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: '/preview/southindian', label: 'South Indian Wedding Invitation' },
              { href: '/preview/punjabi', label: 'Punjabi Sikh Wedding Card' },
              { href: '/preview/christian', label: 'Christian Wedding Invitation' },
              { href: '/preview/invitation', label: 'Hindu Wedding Invitation' },
              { href: '/preview/template2', label: 'Palace Romance Wedding Card' },
              { href: '/preview/mandala', label: 'Mandala Wedding Invitation' },
              { href: '/preview/modern', label: 'Modern Wedding Invitation' },
              { href: '/preview/template3', label: 'Watercolor Wedding Card' },
              { href: '/preview/template4', label: 'Pichwai Art Wedding Invite' },
            ].map(l => (
              <a key={l.href} href={l.href}
                className="font-sans text-xs px-3 py-1.5 rounded-full transition-colors hover:bg-red-50"
                style={{ border: '1px solid #e5e7eb', color: '#555' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
