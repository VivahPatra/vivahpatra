import { WeddingEvent, InfoCard } from './editor-types'

const IMG = 'https://vivahpatra.co/assets/events'

export const TEMPLATE_EVENTS: Record<string, WeddingEvent[]> = {
  southindian: [
    { id: 'nichayathartham', name: 'Nichayathartham', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'December 10, 2026', time: '5:00 PM', venue: 'Nair Residence', venueAddress: 'Pattom, Thiruvananthapuram, Kerala', venueMapLink: '', description: '', color: '#c9a84c' },
    { id: 'nalagu', name: 'Nalagu', emoji: '🌿', image: `${IMG}/haldi.webp`, date: 'December 13, 2026', time: '10:00 AM', venue: 'Nair Residence', venueAddress: 'Pattom, Thiruvananthapuram, Kerala', venueMapLink: '', description: '', color: '#c8a030' },
    { id: 'sangeetam', name: 'Sangeetam', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'December 13, 2026', time: '7:00 PM', venue: 'Kanakakunnu Palace', venueAddress: 'Museum Road, Thiruvananthapuram', venueMapLink: '', description: '', color: '#8b6fc4' },
    { id: 'muhurtham', name: 'Muhurtham', emoji: '🪔', image: `${IMG}/wedding.webp`, date: 'December 14, 2026', time: '8:00 AM', venue: 'Sree Padmanabhaswamy Temple Hall', venueAddress: 'East Fort, Thiruvananthapuram', venueMapLink: '', description: '', color: '#c9a84c' },
    { id: 'sadya', name: 'Sadya', emoji: '🍃', image: `${IMG}/mehendi.webp`, date: 'December 14, 2026', time: '12:30 PM', venue: 'Sree Padmanabhaswamy Temple Hall', venueAddress: 'East Fort, Thiruvananthapuram', venueMapLink: '', description: '', color: '#5a9a60' },
    { id: 'reception', name: 'Reception', emoji: '🌺', image: `${IMG}/reception.webp`, date: 'December 14, 2026', time: '7:00 PM', venue: 'Taj Vivanta Hotel', venueAddress: 'Punnen Road, Thiruvananthapuram', venueMapLink: '', description: '', color: '#c07060' },
  ],
  invitation: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'October 15, 2026', time: '6:00 PM', venue: 'The Oberoi', venueAddress: 'Dr. Zakir Hussain Marg, Delhi', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'November 12, 2026', time: '4:00 PM', venue: 'Sharma Residence', venueAddress: 'Greater Kailash, Delhi', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'November 13, 2026', time: '7:00 PM', venue: 'The Leela Palace', venueAddress: 'Diplomatic Enclave, Delhi', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.webp`, date: 'November 14, 2026', time: '10:00 AM', venue: 'Sharma Residence', venueAddress: 'Greater Kailash, Delhi', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.webp`, date: 'November 15, 2026', time: '8:00 AM', venue: 'ISKCON Temple', venueAddress: 'Hare Krishna Hill, Delhi', venueMapLink: '', description: '', color: '#c49a6c' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'November 15, 2026', time: '7:00 PM', venue: 'The Oberoi', venueAddress: 'Dr. Zakir Hussain Marg, Delhi', venueMapLink: '', description: '', color: '#8b1a1a' },
  ],
  template2: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'October 20, 2026', time: '6:00 PM', venue: 'The Grand Palace', venueAddress: 'MG Road, Mumbai', venueMapLink: '', description: '', color: '#c0425c' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'November 13, 2026', time: '4:00 PM', venue: 'Garden Terrace', venueAddress: 'Juhu, Mumbai', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'November 14, 2026', time: '8:00 PM', venue: 'Royal Ballroom', venueAddress: 'Bandra, Mumbai', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.webp`, date: 'November 14, 2026', time: '10:00 AM', venue: 'Home', venueAddress: 'Andheri, Mumbai', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.webp`, date: 'November 15, 2026', time: '9:00 AM', venue: 'Temple Hall', venueAddress: 'Dadar, Mumbai', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'November 15, 2026', time: '7:00 PM', venue: 'The Grand Palace', venueAddress: 'MG Road, Mumbai', venueMapLink: '', description: '', color: '#c0425c' },
  ],
  template3: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'November 10, 2026', time: '5:00 PM', venue: 'The Taj', venueAddress: 'Connaught Place, Delhi', venueMapLink: '', description: '', color: '#c4683a' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'December 18, 2026', time: '3:00 PM', venue: 'Home', venueAddress: 'Vasant Kunj, Delhi', venueMapLink: '', description: '', color: '#2a6a3a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'December 19, 2026', time: '7:00 PM', venue: 'ITC Maurya', venueAddress: 'Diplomatic Enclave, Delhi', venueMapLink: '', description: '', color: '#8b3a53' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.webp`, date: 'December 20, 2026', time: '8:30 AM', venue: 'Chattarpur Farms', venueAddress: 'Mehrauli, Delhi', venueMapLink: '', description: '', color: '#c4683a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'December 20, 2026', time: '7:00 PM', venue: 'The Leela Palace', venueAddress: 'Diplomatic Enclave, Delhi', venueMapLink: '', description: '', color: '#8b3a53' },
  ],
  template4: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'November 5, 2026', time: '6:00 PM', venue: 'Heritage Haveli', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'December 23, 2026', time: '4:00 PM', venue: 'Home', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#1a6b44' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.webp`, date: 'December 24, 2026', time: '9:00 AM', venue: 'Home', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'December 24, 2026', time: '7:00 PM', venue: 'Jai Mahal Palace', venueAddress: 'Civil Lines, Jaipur', venueMapLink: '', description: '', color: '#7b5ea7' },
    { id: 'wedding', name: 'Wedding', emoji: '💍', image: `${IMG}/wedding.webp`, date: 'December 25, 2026', time: '8:00 AM', venue: 'Birla Mandir', venueAddress: 'Moti Dungri, Jaipur', venueMapLink: '', description: '', color: '#c8922a' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'December 25, 2026', time: '7:00 PM', venue: 'Rambagh Palace', venueAddress: 'Bhawani Singh Road, Jaipur', venueMapLink: '', description: '', color: '#8b1a1a' },
  ],
  punjabi: [
    { id: 'roka', name: 'Roka', emoji: '🤝', image: `${IMG}/engagement.webp`, date: 'November 1, 2026', time: '5:00 PM', venue: 'Home', venueAddress: 'Chandigarh', venueMapLink: '', description: '', color: '#e8a820' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'December 18, 2026', time: '3:00 PM', venue: 'Home', venueAddress: 'Sector 17, Chandigarh', venueMapLink: '', description: '', color: '#2d7a4f' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🥁', image: `${IMG}/sangeet.webp`, date: 'December 19, 2026', time: '7:00 PM', venue: 'JW Marriott', venueAddress: 'Sector 35, Chandigarh', venueMapLink: '', description: '', color: '#c41e3a' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.webp`, date: 'December 20, 2026', time: '9:00 AM', venue: 'Home', venueAddress: 'Sector 17, Chandigarh', venueMapLink: '', description: '', color: '#ff6b35' },
    { id: 'anand-karaj', name: 'Anand Karaj', emoji: '🙏', image: `${IMG}/wedding.webp`, date: 'December 20, 2026', time: '11:00 AM', venue: 'Gurudwara Sahib', venueAddress: 'Sector 34, Chandigarh', venueMapLink: '', description: '', color: '#e8a820' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'December 20, 2026', time: '7:00 PM', venue: 'JW Marriott', venueAddress: 'Sector 35, Chandigarh', venueMapLink: '', description: '', color: '#c41e3a' },
  ],
  christian: [
    { id: 'rehearsal', name: 'Rehearsal Dinner', emoji: '🥂', image: `${IMG}/engagement.webp`, date: 'February 12, 2027', time: '7:00 PM', venue: 'Seaside Pavilion', venueAddress: 'Baga Beach Road, Goa', venueMapLink: '', description: 'An evening of laughter before the big day.', color: '#1a8a9a' },
    { id: 'mehendi', name: 'Opera Night', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'February 13, 2027', time: '4:00 PM', venue: 'Beach Lawns', venueAddress: 'Calangute, Goa', venueMapLink: '', description: 'Music and sunset by the shore.', color: '#e07050' },
    { id: 'sangeet', name: 'Beach Party', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'February 13, 2027', time: '8:00 PM', venue: "Tito's Beachside", venueAddress: 'Baga Beach, Goa', venueMapLink: '', description: 'Dance under the stars.', color: '#4a90c0' },
    { id: 'ceremony', name: 'Holy Matrimony', emoji: '✝️', image: `${IMG}/wedding.webp`, date: 'February 14, 2027', time: '11:00 AM', venue: 'Our Lady of the Sea Church', venueAddress: 'Fort Aguada Road, Goa', venueMapLink: '', description: 'Two hearts united in faith and love.', color: '#d4a040' },
    { id: 'reception', name: 'Beach Reception', emoji: '🌊', image: `${IMG}/reception.webp`, date: 'February 14, 2027', time: '6:00 PM', venue: 'Sunset Terrace Resort', venueAddress: 'Candolim Beach, Goa', venueMapLink: '', description: 'A sunset celebration of love and joy.', color: '#e07050' },
  ],
  modern: [
    { id: 'cocktail', name: 'Cocktail Night', emoji: '🍸', image: `${IMG}/sangeet.webp`, date: 'December 18, 2026', time: '8:00 PM', venue: 'Skybar Rooftop', venueAddress: 'South Delhi', venueMapLink: '', description: '', color: '#3a8fd4' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'December 19, 2026', time: '3:00 PM', venue: 'Home', venueAddress: 'South Delhi', venueMapLink: '', description: '', color: '#c0a060' },
    { id: 'sangeet', name: 'Sangeet Night', emoji: '🎵', image: `${IMG}/sangeet.webp`, date: 'December 19, 2026', time: '8:00 PM', venue: 'The Lodhi', venueAddress: 'Lodhi Road, Delhi', venueMapLink: '', description: '', color: '#e85050' },
    { id: 'wedding', name: 'The Wedding', emoji: '💍', image: `${IMG}/wedding.webp`, date: 'December 20, 2026', time: '10:00 AM', venue: 'Farmhouse', venueAddress: 'Chattarpur, Delhi', venueMapLink: '', description: '', color: '#c0a060' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'December 20, 2026', time: '7:00 PM', venue: 'The Lodhi', venueAddress: 'Lodhi Road, Delhi', venueMapLink: '', description: '', color: '#3a8fd4' },
  ],
  mandala: [
    { id: 'engagement', name: 'Engagement', emoji: '💍', image: `${IMG}/engagement.webp`, date: 'November 10, 2026', time: '6:00 PM', venue: 'Amer Fort', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#d4a830' },
    { id: 'mehendi', name: 'Mehendi', emoji: '🌿', image: `${IMG}/mehendi.webp`, date: 'December 23, 2026', time: '4:00 PM', venue: 'Home', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#2a8a6a' },
    { id: 'sangeet', name: 'Sangeet', emoji: '🎶', image: `${IMG}/sangeet.webp`, date: 'December 24, 2026', time: '7:00 PM', venue: 'City Palace', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#8b3a8b' },
    { id: 'haldi', name: 'Haldi', emoji: '✨', image: `${IMG}/haldi.webp`, date: 'December 25, 2026', time: '9:00 AM', venue: 'Home', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#d4a830' },
    { id: 'wedding', name: 'Wedding', emoji: '🔥', image: `${IMG}/wedding.webp`, date: 'December 25, 2026', time: '8:00 AM', venue: 'Birla Mandir', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#c04050' },
    { id: 'reception', name: 'Reception', emoji: '🥂', image: `${IMG}/reception.webp`, date: 'December 25, 2026', time: '7:00 PM', venue: 'Rambagh Palace', venueAddress: 'Jaipur', venueMapLink: '', description: '', color: '#8b3a8b' },
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
