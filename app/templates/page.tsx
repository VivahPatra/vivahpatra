import TemplateGrid from '@/components/templates/TemplateGrid'
import Footer from '@/components/shared/Footer'

export const metadata = {
  title: 'Choose Your Template — Wedding Invites',
  description: 'Browse stunning animated wedding invitation templates. Hindu, Sikh, Christian, and Modern designs.',
}

export default function TemplatesPage() {
  return (
    <>
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl text-center mb-2">Choose Your Template</h1>
          <p className="font-sans text-sm text-center mb-10" style={{ color: 'var(--color-muted)' }}>
            Stunning animated invitations for every culture and style
          </p>
          <TemplateGrid />
        </div>
      </section>
      <Footer />
    </>
  )
}
