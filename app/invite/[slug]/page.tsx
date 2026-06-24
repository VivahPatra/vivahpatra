import { createClient } from '@supabase/supabase-js'
import { getTemplate } from '@/lib/templates'
import InviteClient from './InviteClient'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export default async function InvitePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabase()

  if (!supabase) {
    return <div className="min-h-screen flex items-center justify-center"><p>Service unavailable</p></div>
  }

  const { data: invite } = await supabase
    .from('published_invites')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!invite) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="font-display text-3xl mb-3">Invitation Not Found</h1>
          <p className="font-sans text-sm" style={{ color: 'var(--color-muted)' }}>This invitation link may be invalid or expired.</p>
        </div>
      </div>
    )
  }

  const template = getTemplate(invite.template_id)
  if (!template) {
    return <div className="min-h-screen flex items-center justify-center"><p>Template not found</p></div>
  }

  return <InviteClient templateUrl={template.url} data={invite.data} />
}
