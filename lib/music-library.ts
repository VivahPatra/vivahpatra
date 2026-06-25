export interface MusicTrack {
  id: string
  name: string
  category: string
  duration: string
  url: string
}

export const MUSIC_LIBRARY: MusicTrack[] = [
  { id: 'shehnai-classic', name: 'Shehnai Classic', category: 'Traditional', duration: '3:45', url: '/music/shehnai-classic.mp3' },
  { id: 'sitar-melody', name: 'Sitar Melody', category: 'Traditional', duration: '4:12', url: '/music/sitar-melody.mp3' },
  { id: 'flute-romantic', name: 'Flute Romantic', category: 'Romantic', duration: '3:30', url: '/music/flute-romantic.mp3' },
  { id: 'piano-love', name: 'Piano Love Story', category: 'Modern', duration: '3:55', url: '/music/piano-love.mp3' },
  { id: 'tabla-fusion', name: 'Tabla Fusion', category: 'Fusion', duration: '4:20', url: '/music/tabla-fusion.mp3' },
  { id: 'veena-prayer', name: 'Veena Prayer', category: 'Traditional', duration: '5:00', url: '/music/veena-prayer.mp3' },
  { id: 'acoustic-bliss', name: 'Acoustic Bliss', category: 'Modern', duration: '3:15', url: '/music/acoustic-bliss.mp3' },
  { id: 'dhol-celebration', name: 'Dhol Celebration', category: 'Punjabi', duration: '3:40', url: '/music/dhol-celebration.mp3' },
]
