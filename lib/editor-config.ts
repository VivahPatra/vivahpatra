export interface TemplateEditorConfig {
  hasTagline: boolean
  hasInvitationText: boolean
  hasSubtitles: boolean
  hasFamily: boolean
  hasHindiNames: boolean
  coupleFields: string[]
  eventFields: string[]
}

const DEFAULT_CONFIG: TemplateEditorConfig = {
  hasTagline: true,
  hasInvitationText: true,
  hasSubtitles: false,
  hasFamily: true,
  hasHindiNames: false,
  coupleFields: ['groomName', 'brideName', 'groomParents', 'brideParents', 'weddingDate', 'hashtag', 'tagline', 'invitationText'],
  eventFields: ['name', 'date', 'time', 'venue', 'venueAddress', 'venueMapLink'],
}

const TEMPLATE_CONFIGS: Record<string, Partial<TemplateEditorConfig>> = {
  southindian: {
    hasTagline: false,
    hasInvitationText: false,
    hasSubtitles: true,
    hasFamily: false,
    coupleFields: ['groomName', 'brideName', 'groomSubtitle', 'brideSubtitle', 'groomParents', 'brideParents', 'weddingDate', 'hashtag'],
  },
  invitation: {
    hasHindiNames: true,
    hasSubtitles: false,
    coupleFields: ['groomName', 'brideName', 'groomParents', 'brideParents', 'weddingDate', 'hashtag'],
  },
  template2: { hasSubtitles: false },
  template3: { hasSubtitles: false },
  template4: { hasSubtitles: false },
  punjabi: { hasSubtitles: false },
  christian: { hasSubtitles: false },
  modern: { hasSubtitles: false },
  mandala: { hasSubtitles: false },
}

export function getEditorConfig(templateId: string): TemplateEditorConfig {
  return { ...DEFAULT_CONFIG, ...TEMPLATE_CONFIGS[templateId] }
}
