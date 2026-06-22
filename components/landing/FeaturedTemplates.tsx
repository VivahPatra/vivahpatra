'use client'
import { TEMPLATES } from '@/lib/templates'
import Button from '@/components/shared/Button'

export default function FeaturedTemplates() {
  const doubled = [...TEMPLATES, ...TEMPLATES]

  return (
    <section className="py-20 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4">Our Templates</h2>
        <p className="font-sans text-sm text-center mb-12" style={{ color: 'var(--color-muted)' }}>
          Handpicked designs loved by couples
        </p>
      </div>

      {/* Auto-scrolling carousel — not clickable */}
      <style>{`
        @keyframes carouselScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="relative pointer-events-none select-none">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10" style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }} />

        <div className="flex gap-6" style={{ width: 'max-content', animation: 'carouselScroll 40s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={`${t.id}-${i}`} className="flex-shrink-0 w-[220px]">
              {/* Phone frame mockup */}
              <div className="rounded-[28px] overflow-hidden border-4 border-gray-800 shadow-xl"
                style={{ aspectRatio: '9/16', background: t.color }}>
                <img
                  src={`/templates/${t.id}.jpg`}
                  alt={t.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="font-display text-white text-lg opacity-50" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    {t.name}
                  </p>
                </div>
              </div>
              <p className="font-sans text-xs text-center mt-3" style={{ color: 'var(--color-muted)' }}>{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center mt-10 px-6">
        <Button href="/templates">View All Templates →</Button>
      </div>
    </section>
  )
}
