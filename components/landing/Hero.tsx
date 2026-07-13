import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#fff' }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        .hero-marquee { animation: marquee 20s linear infinite; }
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(18px) } to { opacity: 1; transform: translateY(0) } }
        .h-fade-1 { animation: heroFadeUp 0.7s ease-out 0.1s both; }
        .h-fade-2 { animation: heroFadeUp 0.7s ease-out 0.3s both; }
        .h-fade-3 { animation: heroFadeUp 0.7s ease-out 0.5s both; }
        .h-fade-4 { animation: heroFadeUp 0.7s ease-out 0.65s both; }
        .h-fade-5 { animation: heroFadeUp 0.7s ease-out 0.8s both; }
        .h-fade-6 { animation: heroFadeUp 0.7s ease-out 0.95s both; }
        .h-fade-r { animation: heroFadeUp 0.7s ease-out 0.3s both; }
        @keyframes floatPhone { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
        .phone-float { animation: floatPhone 4s ease-in-out infinite; }
      `}</style>

      {/* Sale ticker */}
      <div className="w-full overflow-hidden py-2" style={{ background: '#e8384f' }}>
        <div className="hero-marquee flex gap-8 whitespace-nowrap" style={{ width: 'max-content' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="font-sans text-xs font-bold tracking-wider text-white uppercase">
              🎉 WEDDING SEASON MEGA SALE — FLAT 60% OFF &nbsp;&nbsp; ✦ &nbsp;&nbsp; Limited Time Offer &nbsp;&nbsp; ✦ &nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <div className="h-fade-1 inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: '#fff3f3', border: '1px solid #ffd0d5' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
              </span>
              <span className="font-sans text-xs font-semibold" style={{ color: '#e8384f' }}>Sale ends soon — 60% OFF all templates</span>
            </div>

            <h1 className="font-display leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1a1a1a' }}>
              <span className="h-fade-2 block">Animated Digital</span>
              <span className="h-fade-3 block" style={{ color: '#e8384f' }}>Wedding Invitations</span>
            </h1>

            <p className="h-fade-4 font-sans text-base mt-6 leading-relaxed max-w-md" style={{ color: '#666' }}>
              9+ stunning templates for every Indian wedding — Hindu, Sikh, Christian &amp; Modern. Customize in minutes, share via WhatsApp.
            </p>

            <div className="h-fade-4 flex items-center gap-3 mt-6">
              <span className="font-display text-3xl font-bold" style={{ color: '#e8384f' }}>₹1,499</span>
              <span className="font-sans text-lg line-through" style={{ color: '#bbb' }}>₹3,749</span>
              <span className="font-sans text-xs font-bold px-2 py-1 rounded" style={{ background: '#e8384f', color: '#fff' }}>60% OFF</span>
            </div>

            <div className="h-fade-5 flex flex-wrap items-center gap-3 mt-8">
              <a href="/templates" className="px-7 py-3 rounded-full font-sans text-sm font-semibold text-white transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{ background: '#e8384f' }}>
                Browse Templates →
              </a>
              <a href="/#how-it-works" className="px-6 py-3 rounded-full font-sans text-sm font-semibold transition-all hover:bg-gray-100"
                style={{ border: '1px solid #ddd', color: '#555' }}>
                How It Works
              </a>
            </div>

            <div className="h-fade-6 flex items-center gap-6 mt-10">
              {[['9+', 'Templates'], ['500+', 'Couples'], ['5', 'Cultures']].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-xl font-bold" style={{ color: '#1a1a1a' }}>{num}</p>
                  <p className="font-sans text-[10px] tracking-wider uppercase" style={{ color: '#999' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end h-fade-r">
            <a href="/preview/template2" className="phone-float relative block group">
              <div className="absolute inset-0 blur-[80px] rounded-full"
                style={{ background: 'rgba(232,56,79,0.08)', transform: 'scale(1.3)' }} />
              <div className="relative w-[260px] sm:w-[280px]">
                <div className="relative rounded-[36px] overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{ border: '6px solid #1a1a1a', aspectRatio: '9/19.5', background: '#000' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] rounded-b-2xl z-20" style={{ background: '#1a1a1a' }}>
                    <div className="absolute top-[6px] left-1/2 -translate-x-1/2 w-[40px] h-[4px] rounded-full" style={{ background: '#333' }} />
                  </div>
                  <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                    <Image src="/templates/template2.webp" alt="Palace Romance"
                      fill className="object-cover object-top" priority sizes="280px" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 active:bg-black/20 transition-all duration-300 flex items-end justify-center pb-6 z-10">
                    <span className="opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold px-4 py-1.5 rounded-full"
                      style={{ background: '#e8384f' }}>Preview</span>
                  </div>
                  <div className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[100px] h-[4px] rounded-full z-20" style={{ background: '#444' }} />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full font-sans text-[10px] tracking-wider font-semibold"
                  style={{ background: '#fff', border: '1px solid #eee', color: '#e8384f', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                  Palace Romance
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
