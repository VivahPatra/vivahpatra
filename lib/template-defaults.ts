import { WeddingEvent, InfoCard } from './editor-types'

const IMG = '/assets/events'

export const TEMPLATE_EVENTS: Record<string, WeddingEvent[]> = {
  southindian: [
    { id: 'nichayathartham', name: 'Nichayathartham', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c9a84c' },
    { id: 'nalagu', name: 'Nalagu', emoji: '🌿', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8a030' },
{ id: 'sangeetam', name: 'Sangeetam', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b6fc4' },
    { id: 'muhurtham', name: 'Muhurtham', emoji: '🪔', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c9a84c' },
    { id: 'sadya', name: 'Sadya', emoji: '🍃', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#5a9a60' },
    { id: 'reception', name: 'Reception', emoji: '🌺', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c07060' },
  ],
  invitation: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b1a1a' },
  ],
  template2: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c0425c' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c0425c' },
  ],
  template3: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c4683a' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#2a6a3a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b3a53' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c4683a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b3a53' },
  ],
  template4: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b1a1a' },
  ],
  punjabi: [
    { id: 'roka', name: 'Roka', emoji: '🤝', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e8a820' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#2d7a4f' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🥁', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c41e3a' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#ff6b35' },
    { id: 'anand-karaj', name: 'Anand Karaj', emoji: '🙏', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e8a820' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c41e3a' },
  ],
  christian: [
    { id: 'rehearsal', name: 'Rehearsal Dinner', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#1a8a9a' },
    { id: 'mehendi', name: 'Opera Night', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e07050' },
    { id: 'sangeet', name: 'Beach Party', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#4a90c0' },
    { id: 'ceremony', name: 'Holy Matrimony', emoji: '✝️', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#d4a040' },
    { id: 'reception', name: 'Beach Reception', emoji: '🌊', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e07050' },
  ],
  modern: [
    { id: 'cocktail', name: 'Cocktail Night', emoji: '🍸', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#3a8fd4' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c0a060' },
    { id: 'sangeet', name: 'Sangeet Night', emoji: '🎵', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e85050' },
    { id: 'wedding', name: 'The Wedding', emoji: '💍', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c0a060' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#3a8fd4' },
  ],
  mandala: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#d4a830' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#2a8a6a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b3a8b' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#d4a830' },
    { id: 'wedding', name: 'Wedding', emoji: '🔥', image: `${IMG}/wedding.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c04050' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#8b3a8b' },
  ],
}

export function getDefaultEvents(templateId: string): WeddingEvent[] {
  return TEMPLATE_EVENTS[templateId] || TEMPLATE_EVENTS.invitation
}

export const TEMPLATE_INFO_CARDS: Record<string, InfoCard[]> = {
  southindian: [
    { icon: '👗', title: 'Dress Code', description: 'Traditional Kerala attire preferred — kasavu saree or mundum neriyathum for ladies, mundu for gents.' },
    { icon: '#️⃣', title: 'Wedding Hashtag', description: 'Share your photos with our wedding hashtag on Instagram.' },
    { icon: '🅿️', title: 'Parking', description: 'Valet parking available at all venues. Please carry your invitation.' },
    { icon: '🌿', title: 'Sadya', description: 'Traditional Kerala Sadya served on banana leaf. 26 dishes including avial, thoran, payasam.' },
    { icon: '🌤️', title: 'Weather', description: 'December weather is pleasant — 22°C to 32°C. Light cotton or silk is ideal.' },
    { icon: '🪔', title: 'Tradition', description: 'The Muhurtham follows traditional Kerala rites. Please arrive by 7:45 AM.' },
  ],
  invitation: [
    { icon: '👗', title: 'Dress Code', description: 'Traditional Indian attire for ceremonies, elegant ethnic for reception.' },
    { icon: '#️⃣', title: 'Wedding Hashtag', description: 'Share your photos with our wedding hashtag on Instagram.' },
    { icon: '🅿️', title: 'Parking', description: 'Valet parking available at all venues.' },
    { icon: '🎁', title: 'Gifts', description: 'Your presence is the best gift. If you wish to bless us, we prefer monetary gifts.' },
    { icon: '🌤️', title: 'Weather', description: 'Check the weather forecast and dress accordingly.' },
    { icon: '📱', title: 'Contact', description: 'For any queries, please reach out via WhatsApp.' },
  ],
}

const DEFAULT_INFO_CARDS: InfoCard[] = [
  { icon: '👗', title: 'Dress Code', description: 'Traditional attire for ceremonies, elegant wear for reception.' },
  { icon: '#️⃣', title: 'Wedding Hashtag', description: 'Share your photos with our wedding hashtag on Instagram.' },
  { icon: '🅿️', title: 'Parking', description: 'Parking available at the venue. Please follow signage.' },
  { icon: '🎁', title: 'Gifts', description: 'Your presence is the best gift. If you wish to bless us, we prefer monetary gifts.' },
  { icon: '🌤️', title: 'Weather', description: 'Check the weather forecast and dress accordingly.' },
  { icon: '📱', title: 'Contact', description: 'For any queries, please reach out via WhatsApp.' },
]

export function getDefaultInfoCards(templateId: string): InfoCard[] {
  return TEMPLATE_INFO_CARDS[templateId] || DEFAULT_INFO_CARDS
}
