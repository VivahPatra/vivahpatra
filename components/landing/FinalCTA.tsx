import Button from '@/components/shared/Button'

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 text-center">
      <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to Create Your Invite?</h2>
      <p className="font-sans text-sm mb-8 max-w-md mx-auto" style={{ color: 'var(--color-muted)' }}>
        Join thousands of couples who chose digital invitations for their special day.
      </p>
      <Button href="/templates">Browse Templates</Button>
    </section>
  )
}
