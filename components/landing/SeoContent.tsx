const stats = [
  { value: '500+', label: 'Couples Invited' },
  { value: '9+', label: 'Templates' },
  { value: '₹1,499', label: 'Starting Price' },
  { value: '10 min', label: 'Setup Time' },
]

const pillars = [
  {
    tag: 'Why Digital',
    heading: 'WhatsApp Wedding Invitations — The New Tradition',
    body: 'Digital wedding invitations are animated, interactive, and shareable via WhatsApp — invite hundreds of guests instantly. Unlike printed cards costing ₹15,000–₹50,000, a Vivah Patra digital card costs just ₹1,499 with lifetime access and unlimited edits.',
  },
  {
    tag: 'Every Culture',
    heading: 'Templates for Every Indian Wedding',
    body: 'From a South Indian kasavu gold invitation to a Punjabi Sikh Anand Karaj card with Ik Onkar motifs, to a Christian beach wedding invite — 9+ animated templates covering every Indian tradition.',
  },
  {
    tag: 'How It Works',
    heading: 'Ready in Under 10 Minutes',
    body: 'Choose a template, enter your names, wedding date, venue and events in the live editor, upload your photo, and share the link. Your animated wedding card is ready to send on WhatsApp, Instagram, or any messenger.',
  },
]

const links = [
  { href: '/preview/southindian', label: 'South Indian Wedding' },
  { href: '/preview/punjabi', label: 'Punjabi Sikh Wedding' },
  { href: '/preview/christian', label: 'Christian Wedding' },
  { href: '/preview/invitation', label: 'Hindu Wedding' },
  { href: '/preview/template2', label: 'Palace Romance' },
  { href: '/preview/mandala', label: 'Mandala Wedding' },
  { href: '/preview/modern', label: 'Modern Wedding' },
  { href: '/preview/template3', label: 'Watercolor Wedding' },
  { href: '/preview/template4', label: 'Pichwai Art Wedding' },
]

export default function SeoContent() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: '#fff' }}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(232,56,79,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-5xl mx-auto relative">

        {/* Section label */}
        <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-center mb-4" style={{ color: '#e8384f' }}>
          Digital Wedding Cards India
        </p>

        <h2 className="font-display text-3xl md:text-4xl text-center mb-3" style={{ color: '#1a1a1a' }}>
          Everything You Need to Know
        </h2>
        <p className="font-sans text-sm text-center mb-14" style={{ color: '#777' }}>
          Why couples across India choose Vivah Patra for their digital wedding invitations
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map(s => (
            <div key={s.value} className="rounded-2xl p-5 text-center"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: '#fafafa' }}>
              <p className="font-display text-2xl md:text-3xl mb-1" style={{ color: '#e8384f' }}>{s.value}</p>
              <p className="font-sans text-xs" style={{ color: '#888' }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map(p => (
            <div key={p.tag} className="rounded-2xl p-6"
              style={{ border: '1px solid rgba(0,0,0,0.06)', background: '#fafafa' }}>
              <span className="inline-block font-sans text-[10px] uppercase tracking-widest px-3 py-1 rounded-full mb-4"
                style={{ background: 'rgba(232,56,79,0.08)', color: '#e8384f' }}>
                {p.tag}
              </span>
              <h3 className="font-display text-base mb-3" style={{ color: '#1a1a1a' }}>{p.heading}</h3>
              <p className="font-sans text-xs leading-relaxed" style={{ color: '#777' }}>{p.body}</p>
            </div>
          ))}
        </div>

        {/* Template links */}
        <div>
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-center mb-5" style={{ color: '#bbb' }}>
            Browse by Wedding Type
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {links.map(l => (
              <a key={l.href} href={l.href}
                className="font-sans text-xs px-4 py-2 rounded-full transition-all hover:border-red-300 hover:text-red-500 hover:bg-red-50"
                style={{ border: '1px solid #e5e7eb', color: '#666' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
