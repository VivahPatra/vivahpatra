import { WeddingEvent } from './editor-types'

const IMG = '/assets/events'

export const TEMPLATE_EVENTS: Record<string, WeddingEvent[]> = {
  southindian: [
    { id: 'nichayathartham', name: 'Nichayathartham', emoji: '💍', image: `${IMG}/engagement.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c9a84c' },
    { id: 'nalagu', name: 'Nalagu', emoji: '🌿', image: `${IMG}/haldi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#c8a030' },
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
    { id: 'mehendi', name: 'Mehendi Night', emoji: '🌿', image: `${IMG}/mehendi.png`, date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: '', color: '#e07050' },
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
