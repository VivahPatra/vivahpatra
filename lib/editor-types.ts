export interface WeddingEvent {
  id: string
  name: string
  emoji: string
  image: string
  date: string
  time: string
  venue: string
  venueAddress: string
  venueMapLink: string
  description: string
  color: string
  hidden?: boolean
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

export interface InfoCard {
  icon: string
  title: string
  description: string
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
  info: boolean
  music: boolean
  footer: boolean
}

export interface WeddingFormData {
  // Couple
  groomFirst: boolean
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

  // Hero
  heroSubtitle: string
  heroImage: string

  // Invitation
  invitationHeading: string
  invitationSubtitle: string
  invitationBlessing: string
  invitationText: string

  // Media
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
  rsvpHeading: string
  rsvpText: string
  rsvpPhone: string
  rsvpMessage: string
  rsvpDeadline: string

  // Info cards
  infoCards: InfoCard[]

  // Social
  instagram: string

  // Section visibility
  sections: SectionToggle
}

export const DEFAULT_FORM_DATA: WeddingFormData = {
  groomFirst: true,
  groomName: '',
  brideName: '',
  groomParents: '',
  brideParents: '',
  groomSubtitle: '',
  brideSubtitle: '',
  weddingDate: '',
  hashtag: '',
  tagline: '',
  heroSubtitle: '',
  heroImage: '',
  invitationHeading: 'You Are Invited',
  invitationSubtitle: 'Shubh Vivah',
  invitationBlessing: '॥ Shree Ganeshaya Namah ॥',
  invitationText: 'Together with our families, we joyfully invite you to witness and bless the beginning of our forever. Your presence will make our celebration truly complete.',
  bridePhoto: '',
  groomPhoto: '',
  backgroundMusic: '',
  galleryImages: [],
  events: [
    { id: 'ceremony', name: 'Wedding Ceremony', emoji: '💍', image: 'https://vivahpatra.co/assets/events/wedding.webp', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: 'The sacred union', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: 'https://vivahpatra.co/assets/events/reception.webp', date: '', time: '', venue: '', venueAddress: '', venueMapLink: '', description: 'Celebration dinner', color: '#8b1a1a' },
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
  rsvpHeading: 'Will You Attend?',
  rsvpText: 'We would be honoured to have you celebrate with us.',
  rsvpPhone: '',
  rsvpMessage: 'Hi! I would like to RSVP for the wedding.',
  rsvpDeadline: '',
  infoCards: [],
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
    info: true,
    music: true,
    footer: true,
  },
}
