export type RichTextSegment = {
  text: string
  strong?: boolean
}

export type GuestBriefBlock =
  | { type: 'paragraph'; muted?: boolean; segments: RichTextSegment[] }
  | { type: 'calloutGrid'; items: Array<{ title: string; body: string }> }
  | { type: 'cardGrid'; items: Array<{ title: string; body: string; items: string[] }> }
  | { type: 'checkList'; items: string[] }
  | { type: 'accordion'; items: Array<{ value: string; title: string; paragraphs: string[] }> }
  | { type: 'steps'; items: string[]; note: string }

export type GuestBriefContent = {
  badgeDesktop: string
  badgeMobile: string
  eyebrow: string
  title: string
  intro: string
  sections: Array<{ title: string; blocks: GuestBriefBlock[] }>
  footer: string
}
