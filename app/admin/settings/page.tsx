'use client'

export default function AdminSettings() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl mb-1">Settings</h1>
        <p className="font-sans text-sm" style={{ color: '#666' }}>Platform configuration</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <h2 className="font-sans text-sm font-semibold mb-3">Quick Links</h2>
          <div className="space-y-2 font-sans text-sm">
            <a href="https://supabase.com/dashboard/project/uipzkfuilpscfbtolkjf" target="_blank" className="block hover:text-white" style={{ color: '#3b82f6' }}>
              Supabase Dashboard →
            </a>
            <a href="https://dashboard.razorpay.com" target="_blank" className="block hover:text-white" style={{ color: '#3b82f6' }}>
              Razorpay Dashboard →
            </a>
            <a href="https://vercel.com/pr0221/vivahpatra" target="_blank" className="block hover:text-white" style={{ color: '#3b82f6' }}>
              Vercel Dashboard →
            </a>
            <a href="https://console.cloud.google.com" target="_blank" className="block hover:text-white" style={{ color: '#3b82f6' }}>
              Google Cloud Console →
            </a>
            <a href="https://search.google.com/search-console" target="_blank" className="block hover:text-white" style={{ color: '#3b82f6' }}>
              Google Search Console →
            </a>
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#1a1a1a', border: '1px solid #222' }}>
          <h2 className="font-sans text-sm font-semibold mb-3">Admin Access</h2>
          <p className="font-sans text-sm" style={{ color: '#888' }}>Only <span style={{ color: '#e8384f' }}>pr@vivahpatra.co</span> can access this panel.</p>
          <p className="font-sans text-xs mt-2" style={{ color: '#666' }}>To change admin email, update ADMIN_EMAIL in app/admin/layout.tsx</p>
        </div>
      </div>
    </div>
  )
}
