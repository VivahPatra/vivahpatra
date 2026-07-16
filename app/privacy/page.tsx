export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20 font-sans" style={{ color: '#e0e0e0' }}>
      <h1 className="text-3xl font-bold mb-2" style={{ color: '#fff' }}>Privacy Policy</h1>
      <p className="text-sm mb-10" style={{ color: '#666' }}>Last updated: July 2026</p>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>1. Information We Collect</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>We collect your name, email address, and mobile number when you register. We also collect wedding details you enter while creating your invitation.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>2. How We Use Your Information</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Your information is used to create and manage your wedding invitation, process payments, and send transactional emails (account confirmation, purchase receipts). We do not sell your data to third parties.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>3. Data Storage</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>Your data is stored securely using Supabase (PostgreSQL). Payment processing is handled by Razorpay. We do not store card or payment details on our servers.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>4. Cookies</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>We use session cookies for authentication. No advertising or tracking cookies are used.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>5. Your Rights</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>You may request deletion of your account and data at any time by emailing <a href="mailto:pr@vivahpatra.co" style={{ color: '#e8384f' }}>pr@vivahpatra.co</a>.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2" style={{ color: '#fff' }}>6. Contact</h2>
        <p style={{ color: '#aaa', lineHeight: 1.7 }}>For any privacy concerns, contact us at <a href="mailto:pr@vivahpatra.co" style={{ color: '#e8384f' }}>pr@vivahpatra.co</a>.</p>
      </section>
    </main>
  )
}
