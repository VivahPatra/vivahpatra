export interface MusicTrack {
  id: string
  name: string
  category: string
  duration: string
  url: string
}

const BASE = 'https://vivahpatra.co/music'

export const MUSIC_LIBRARY: MusicTrack[] = [
  { id: 'aaj-sajeya', name: 'Aaj Sajeya', category: 'Punjabi', duration: '', url: `${BASE}/aaj-sajeya.mp3` },
  { id: 'christian', name: 'Christian Wedding', category: 'Christian', duration: '', url: `${BASE}/christian.mp3` },
  { id: 'ek-ladki-ko-dekha', name: 'Ek Ladki Ko Dekha', category: 'Romantic', duration: '', url: `${BASE}/ek-ladki-ko-dekha.mp3` },
  { id: 'saathiya', name: 'Saathiya', category: 'Romantic', duration: '', url: `${BASE}/saathiya.mp3` },
  { id: 'southindian', name: 'South Indian Classical', category: 'Traditional', duration: '', url: `${BASE}/southindian.mp3` },
  { id: 'tumhi-dekho-na', name: 'Tumhi Dekho Na', category: 'Romantic', duration: '', url: `${BASE}/tumhi-dekho-na.mp3` },
]

export const TEMPLATE_DEFAULT_MUSIC: Record<string, string> = {
  punjabi: `${BASE}/aaj-sajeya.mp3`,
  christian: `${BASE}/christian.mp3`,
  template2: `${BASE}/ek-ladki-ko-dekha.mp3`,
  template3: `${BASE}/ek-ladki-ko-dekha.mp3`,
  southindian: `${BASE}/southindian.mp3`,
  modern: `${BASE}/tumhi-dekho-na.mp3`,
  template4: `${BASE}/tumhi-dekho-na.mp3`,
  invitation: `${BASE}/saathiya.mp3`,
  mandala: `${BASE}/saathiya.mp3`,
}
