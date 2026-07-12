export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: '#fff' }}>
      <div className="w-full h-10" style={{ background: '#1a1a1a' }} />
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-4 w-32 rounded-full animate-pulse" style={{ background: '#f0f0f0' }} />
            <div className="h-12 w-3/4 rounded-xl animate-pulse" style={{ background: '#f0f0f0' }} />
            <div className="h-12 w-1/2 rounded-xl animate-pulse" style={{ background: '#fde8ea' }} />
            <div className="h-4 w-full rounded animate-pulse" style={{ background: '#f0f0f0' }} />
            <div className="h-4 w-4/5 rounded animate-pulse" style={{ background: '#f0f0f0' }} />
            <div className="flex gap-3 mt-8">
              <div className="h-12 w-40 rounded-full animate-pulse" style={{ background: '#fde8ea' }} />
              <div className="h-12 w-32 rounded-full animate-pulse" style={{ background: '#f0f0f0' }} />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 rounded-[36px] animate-pulse" style={{ aspectRatio: '9/19.5', background: '#f0f0f0' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
