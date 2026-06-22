export interface WeddingEvent {
  id: string
  name: string
  emoji: string
  date: string
  time: string
  venue: string
  venueAddress: string
  venueMapLink: string
  description: string
  color: string
}

export interface StoryItem {
  date: string
  title: string
  description: string
  icon: string
  image: string
}

export interface GalleryImage {
  src: string
  alt: string
  span: 'normal' | 'wide' | 'tall'
}

export interface FamilyMember {
  name: string
  relation: string
  photo: string
  side: 'bride' | 'groom'
}

export interface SectionToggle {
  hero: boolean
  invitation: boolean
  coupleStory: boolean
  gallery: boolean
  events: boolean
  rsvp: boolean
  countdown: boolean
  venue: boolean
  family: boolean
  footer: boolean
}

export interface WeddingFormData {
  // Couple
  groomName: string
  brideName: string
  groomParents: string
  brideParents: string
  groomSubtitle: string
  brideSubtitle: string

  // Wedding
  weddingDate: string
  hashtag: string
  tagline: string
  invitationText: string

  // Media
  heroImage: string
  bridePhoto: string
  groomPhoto: string
  backgroundMusic: string
  galleryImages: GalleryImage[]

  // Events
  events: WeddingEvent[]

  // Story
  coupleStory: StoryItem[]

  // Family
  familyBride: FamilyMember[]
  familyGroom: FamilyMember[]

  // Venue
  venueName: string
  venueAddress: string
  venueMapUrl: string

  // RSVP
  rsvpPhone: string
  rsvpMessage: string
  rsvpDeadline: string

  // Social
  instagram: string

  // Section visibility
  sections: SectionToggle
}

export const DEFAULT_FORM_DATA: WeddingFormData = {
  groomName: '',
  brideName: '',
  groomParents: '',
  brideParents: '',
  groomSubtitle: '',
  brideSubtitle: '',
  weddingDate: '',
  hashtag: '',
  tagline: '',
  invitationText: 'Together with our families, we joyfully invite you to witness and bless the beginning of our forever.',
  heroImage: '',
  bridePhoto: '',
  groomPhoto: '',
  backgroundMusic: '',
  galleryImages: [],
  events: [
    { id: 'ceremony', name: 'Wedding Ceremony', emoji: '💍', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: 'The sacred union', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: 'Celebration dinner', color: '#8b1a1a' },
  ],
  coupleStory: [
    { date: '', title: 'How We Met', description: '', icon: '✨', image: '' },
    { date: '', title: 'The Proposal', description: '', icon: '💍', image: '' },
  ],
  familyBride: [],
  familyGroom: [],
  venueName: '',
  venueAddress: '',
  venueMapUrl: '',
  rsvpPhone: '',
  rsvpMessage: 'Hi! I would like to RSVP for the wedding.',
  rsvpDeadline: '',
  instagram: '',
  sections: {
    hero: true,
    invitation: true,
    coupleStory: true,
    gallery: true,
    events: true,
    rsvp: true,
    countdown: true,
    venue: true,
    family: true,
    footer: true,
  },
}
