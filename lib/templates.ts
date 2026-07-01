export interface Template {
  id: string
  name: string
  category: string
  categories?: string[]
  description: string
  color: string
  price: number
  originalPrice: number
  port: number
  url: string
  features: string[]
}

export const TEMPLATES: Template[] = [
  {
    id: 'southindian',
    name: 'South Indian',
    category: 'Hindu',
    description: 'Kerala kasavu gold theme with coconut trees, boat animations, diya glow effects, and traditional kolam patterns.',
    color: '#c9a84c',
    price: 1499,
    originalPrice: 3749,
    port: 3000,
    url: 'https://template-southindian.vercel.app',
    features: ['Curtain opener', 'Boat animation', 'Diya glow', 'Kolam patterns'],
  },
  {
    id: 'invitation',
    name: 'Ethnic Pure',
    category: 'Hindu',
    description: 'Classic gold & green design with peacock opener, lantern parallax, ornate kasavu frames.',
    color: '#c49a6c',
    price: 1499,
    originalPrice: 3749,
    port: 3001,
    url: 'https://template-invitation-liard.vercel.app',
    features: ['Peacock opener', 'Lantern parallax', 'Flower overlay', 'Ornate frames'],
  },
  {
    id: 'template2',
    name: 'Palace Romance',
    category: 'Hindu',
    description: 'Palace backdrop with cloud parallax, swing decorations, walking elephant animation.',
    color: '#c0425c',
    price: 1499,
    originalPrice: 3749,
    port: 3002,
    url: 'https://template-2-brown.vercel.app',
    features: ['Cloud parallax', 'Swing decor', 'Elephant walk', 'Palace backdrop'],
  },
  {
    id: 'template3',
    name: 'Watercolor Ink',
    category: 'Hindu',
    description: 'Artistic caricature style with ink botanical vines, floating swans, watercolor wash effects.',
    color: '#c4683a',
    price: 1499,
    originalPrice: 3749,
    port: 3003,
    url: 'https://template-3-ruddy.vercel.app',
    features: ['Auto caricature', 'Swan pond', 'Ink vines', 'Watercolor wash'],
  },
  {
    id: 'template4',
    name: 'Pichwai Art',
    category: 'Hindu',
    description: 'Krishna-Radha Pichwai painting theme with cow animations, lotus pond, sriji intro animation.',
    color: '#c8922a',
    price: 1499,
    originalPrice: 3749,
    port: 3004,
    url: 'https://template-4-chi.vercel.app',
    features: ['Sriji intro', 'Cow animation', 'Lotus pond', 'Pichwai art'],
  },
  {
    id: 'punjabi',
    name: 'Punjabi Celebration',
    category: 'Sikh',
    description: 'Turmeric & plum theme with Ik Onkar, golden temple, floating diyas, water body reflection.',
    color: '#e8a820',
    price: 1499,
    originalPrice: 3749,
    port: 3005,
    url: 'https://template-punjabi.vercel.app',
    features: ['Floating diyas', 'Water reflection', 'Golden temple', 'Fireworks'],
  },
  {
    id: 'christian',
    name: 'Beach Wedding',
    category: 'Christian',
    description: 'Ocean gradient with animated waves, floating swans, lantern parallax, beach vibes.',
    color: '#1a8a9a',
    price: 1499,
    originalPrice: 3749,
    port: 3006,
    url: 'https://template-christian.vercel.app',
    features: ['Ocean waves', 'Swan pond', 'Lantern parallax', 'Beach sunset'],
  },
  {
    id: 'modern',
    name: 'Cosmic',
    category: 'Modern',
    description: 'Celestial starry night theme with parallax layers, meteor showers, constellations, and moonrise effects.',
    color: '#d4c090',
    price: 1499,
    originalPrice: 3749,
    port: 3007,
    url: 'https://template-modern-psi.vercel.app',
    features: ['Parallax layers', 'Meteor showers', 'Constellations', 'Moonrise effect'],
  },
  {
    id: 'mandala',
    name: 'Sacred Mandala',
    category: 'Hindu',
    categories: ['Hindu', 'Modern'],
    description: 'Rotating mandala rings with jewel tones, sacred geometry borders, spinning dividers.',
    color: '#8b3a8b',
    price: 1499,
    originalPrice: 3749,
    port: 3008,
    url: 'https://template-mandala.vercel.app',
    features: ['Rotating mandalas', 'Sacred geometry', 'Jewel tones', 'Spinning dividers'],
  },
]

export const CATEGORIES = ['All', 'Hindu', 'Sikh', 'Christian', 'Modern'] as const
export type Category = (typeof CATEGORIES)[number]

export function getTemplate(id: string): Template | undefined {
  return TEMPLATES.find(t => t.id === id)
}

export function filterTemplates(category: Category): Template[] {
  if (category === 'All') return TEMPLATES
  return TEMPLATES.filter(t => t.category === category || t.categories?.includes(category))
}
