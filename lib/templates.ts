export interface Template {
  id: string
  name: string
  category: string
  description: string
  color: string
  price: number
  port: number
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
    port: 3000,
    features: ['Curtain opener', 'Boat animation', 'Diya glow', 'Kolam patterns'],
  },
  {
    id: 'invitation',
    name: 'Royal Indian',
    category: 'Hindu',
    description: 'Classic gold & green design with peacock opener, lantern parallax, ornate kasavu frames.',
    color: '#c49a6c',
    price: 1499,
    port: 3001,
    features: ['Peacock opener', 'Lantern parallax', 'Flower overlay', 'Ornate frames'],
  },
  {
    id: 'template2',
    name: 'Palace Romance',
    category: 'Hindu',
    description: 'Palace backdrop with cloud parallax, swing decorations, walking elephant animation.',
    color: '#c0425c',
    price: 1499,
    port: 3002,
    features: ['Cloud parallax', 'Swing decor', 'Elephant walk', 'Palace backdrop'],
  },
  {
    id: 'template3',
    name: 'Watercolor Ink',
    category: 'Hindu',
    description: 'Artistic caricature style with ink botanical vines, floating swans, watercolor wash effects.',
    color: '#c4683a',
    price: 1499,
    port: 3003,
    features: ['Auto caricature', 'Swan pond', 'Ink vines', 'Watercolor wash'],
  },
  {
    id: 'template4',
    name: 'Pichwai Art',
    category: 'Hindu',
    description: 'Krishna-Radha Pichwai painting theme with cow animations, lotus pond, sriji intro animation.',
    color: '#c8922a',
    price: 1499,
    port: 3004,
    features: ['Sriji intro', 'Cow animation', 'Lotus pond', 'Pichwai art'],
  },
  {
    id: 'punjabi',
    name: 'Punjabi Celebration',
    category: 'Sikh',
    description: 'Turmeric & plum theme with Ik Onkar, golden temple, floating diyas, water body reflection.',
    color: '#e8a820',
    price: 1499,
    port: 3005,
    features: ['Floating diyas', 'Water reflection', 'Golden temple', 'Fireworks'],
  },
  {
    id: 'christian',
    name: 'Beach Wedding',
    category: 'Christian',
    description: 'Ocean gradient with animated waves, floating swans, lantern parallax, beach vibes.',
    color: '#1a8a9a',
    price: 1499,
    port: 3006,
    features: ['Ocean waves', 'Swan pond', 'Lantern parallax', 'Beach sunset'],
  },
  {
    id: 'modern',
    name: 'Modern City',
    category: 'Modern',
    description: 'Horizontal scroll layout with glassmorphism cards, city bokeh lights, minimal aesthetic.',
    color: '#c0a060',
    price: 1499,
    port: 3007,
    features: ['Horizontal scroll', 'Glassmorphism', 'City bokeh', 'Minimal design'],
  },
  {
    id: 'mandala',
    name: 'Sacred Mandala',
    category: 'Hindu',
    description: 'Rotating mandala rings with jewel tones, sacred geometry borders, spinning dividers.',
    color: '#8b3a8b',
    price: 1499,
    port: 3008,
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
  return TEMPLATES.filter(t => t.category === category)
}
