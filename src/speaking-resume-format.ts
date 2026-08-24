/**
 * Pure data + serialization helpers for the full speaking resume.
 *
 * Everything here is derived from `src/data/speaking.json`. Nothing is invented:
 * each field maps back to a field that already exists in that file. The DOM layer
 * (`src/speaking-resume.ts`) renders these same structures, so the on-screen
 * preview and the copied output always describe the same records.
 */

export type ResumeProfile = {
  name: string
  role: string
  firm: string
  location: string
  intro: string
  bio: string
}

export type ResumeEntryKind = 'engagement' | 'conversation'

export type ResumeEntry = {
  kind: ResumeEntryKind
  typeLabel: string
  title: string
  event: string
  date: string
  year: number
  sortKey: number
  summary: string
  url: string
}

export type ResumeSource = {
  profile: ResumeProfile
  topics: string[]
  formats: string[]
  entries: ResumeEntry[]
}

export type ResumeView = {
  profile: ResumeProfile
  topics: string[]
  formats: string[]
  engagements: ResumeEntry[]
  conversations: ResumeEntry[]
  ledger: ResumeEntry[]
  selectedYears: number[]
  allYears: number[]
}

export type OutputFormat = 'plain' | 'markdown' | 'json' | 'xml' | 'csv'

export type ResumeSection = {
  heading: string
  lines: string[]
}

export type ResumeDocument = {
  meta: string[]
  sections: ResumeSection[]
}

export const SPEAKING_PAGE_URL = 'https://ryanrademann.com/speaking'

const TEXT_WIDTH = 78
const FIELD_WIDTH = 10
const FIELD_INDENT = '   '

const MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12
}

/** Parses the "Month YYYY" strings used throughout speaking.json. */
function parseDate(value: string): { year: number; month: number } {
  let year = 0
  let month = 0
  for (const part of value.trim().split(/\s+/)) {
    const cleaned = part.replace(/[^A-Za-z0-9]/g, '')
    if (/^\d{4}$/.test(cleaned)) {
      year = Number.parseInt(cleaned, 10)
      continue
    }
    const monthIndex = MONTHS[cleaned.toLowerCase()]
    if (monthIndex) month = monthIndex
  }
  return { year, month }
}

type RawStage = {
  title: string
  event: string
  date: string
  detail: string
  url?: string
}

type RawConversation = {
  title: string
  source: string
  date: string
  url: string
}

/**
 * Flattens the two speaking.json collections into one comparable record shape.
 * The source arrays are already newest-first; `sortKey` lets the combined ledger
 * keep that same newest-first chronology.
 */
export function buildResumeSource(input: {
  profile: ResumeProfile
  topics: string[]
  formats: string[]
  stages: RawStage[]
  conversations: RawConversation[]
}): ResumeSource {
  const engagements: ResumeEntry[] = input.stages.map((stage) => {
    const parsed = parseDate(stage.date)
    return {
      kind: 'engagement',
      typeLabel: 'Speaking engagement',
      title: stage.title,
      event: stage.event,
      date: stage.date,
      year: parsed.year,
      sortKey: parsed.year * 100 + parsed.month,
      summary: stage.detail,
      url: stage.url ?? ''
    }
  })

  const conversations: ResumeEntry[] = input.conversations.map((conversation) => {
    const parsed = parseDate(conversation.date)
    return {
      kind: 'conversation',
      typeLabel: 'Recorded conversation',
      title: conversation.title,
      event: conversation.source,
      date: conversation.date,
      year: parsed.year,
      sortKey: parsed.year * 100 + parsed.month,
      summary: '',
      url: conversation.url
    }
  })

  return {
    profile: input.profile,
    topics: input.topics,
    formats: input.formats,
    entries: [...engagements, ...conversations]
  }
}

/** Every year present in the source data, newest first. */
export function collectYears(source: ResumeSource): number[] {
  const years = new Set<number>()
  for (const entry of source.entries) years.add(entry.year)
  return [...years].sort((a, b) => b - a)
}

export function countEntriesForYear(source: ResumeSource, year: number): number {
  return source.entries.filter((entry) => entry.year === year).length
}

/** Narrows the source down to the selected years, preserving newest-first order. */
export function buildResumeView(source: ResumeSource, selectedYears: number[]): ResumeView {
  const allYears = collectYears(source)
  const selected = allYears.filter((year) => selectedYears.includes(year))
  const wanted = new Set(selected)
  const kept = source.entries.filter((entry) => wanted.has(entry.year))

  return {
    profile: source.profile,
    topics: source.topics,
    formats: source.formats,
    engagements: kept.filter((entry) => entry.kind === 'engagement'),
    conversations: kept.filter((entry) => entry.kind === 'conversation'),
    // Array.prototype.sort is stable, so equal-month records keep source order.
    ledger: [...kept].sort((a, b) => b.sortKey - a.sortKey),
    selectedYears: selected,
    allYears
  }
}

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

function wrapText(text: string, width: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (current.length === 0) {
      current = word
    } else if (current.length + 1 + word.length <= width) {
      current = `${current} ${word}`
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current.length > 0) lines.push(current)
  return lines.length > 0 ? lines : ['']
}

function fieldLines(label: string, value: string, wrap: boolean): string[] {
  const gutter = `${FIELD_INDENT}${' '.repeat(FIELD_WIDTH)}`
  const head = `${FIELD_INDENT}${`${label}:`.padEnd(FIELD_WIDTH)}`
  if (!wrap) return [`${head}${value}`]
  const wrapped = wrapText(value, TEXT_WIDTH - gutter.length)
  return wrapped.map((line, index) => (index === 0 ? `${head}${line}` : `${gutter}${line}`))
}

function entryLines(entry: ResumeEntry, index: number): string[] {
  const lines = [`${index + 1}. ${entry.title}`]
  lines.push(...fieldLines('Type', entry.typeLabel, false))
  lines.push(...fieldLines('Date', entry.date, false))
  lines.push(...fieldLines('Event', entry.event, true))
  if (entry.summary) lines.push(...fieldLines('Summary', entry.summary, true))
  if (entry.url) lines.push(...fieldLines('Link', entry.url, false))
  return lines
}

function joinEntryBlocks(entries: ResumeEntry[], emptyMessage: string): string[] {
  if (entries.length === 0) return [emptyMessage]
  const lines: string[] = []
  entries.forEach((entry, index) => {
    if (index > 0) lines.push('')
    lines.push(...entryLines(entry, index))
  })
  return lines
}

function describeYears(view: ResumeView): string {
  if (view.selectedYears.length === 0) return 'none selected'
  if (view.selectedYears.length === view.allYears.length) {
    return `${view.selectedYears.join(', ')} (all years)`
  }
  return view.selectedYears.join(', ')
}

/**
 * The Format A document: text headings plus consistently labelled fields.
 * Rendered directly on screen and reused verbatim for the plain-text export.
 */
export function buildResumeDocument(view: ResumeView): ResumeDocument {
  const { profile } = view

  const meta = [
    'FULL SPEAKING RESUME',
    profile.name,
    `Years included: ${describeYears(view)}`,
    `Speaking engagements: ${view.engagements.length} · Recorded conversations: ${view.conversations.length}`,
    `Source: ${SPEAKING_PAGE_URL}`
  ]

  const sections: ResumeSection[] = [
    {
      heading: 'PROFILE',
      lines: [
        ...fieldLines('Name', profile.name, false),
        ...fieldLines('Role', profile.role, true),
        ...fieldLines('Firm', profile.firm, false),
        ...fieldLines('Location', profile.location, false)
      ]
    },
    { heading: 'INTRODUCTION', lines: wrapText(profile.intro, TEXT_WIDTH) },
    { heading: 'BIOGRAPHY', lines: wrapText(profile.bio, TEXT_WIDTH) },
    { heading: 'SPEAKING TOPICS', lines: view.topics.map((topic) => `- ${topic}`) },
    { heading: 'SESSION FORMATS', lines: view.formats.map((format) => `- ${format}`) },
    {
      heading: 'SPEAKING ENGAGEMENTS',
      lines: joinEntryBlocks(view.engagements, 'No speaking engagements in the selected years.')
    },
    {
      heading: 'RECORDED CONVERSATIONS',
      lines: joinEntryBlocks(view.conversations, 'No recorded conversations in the selected years.')
    }
  ]

  return { meta, sections }
}

/* ------------------------------------------------------------------ */
/* Serializers                                                         */
/* ------------------------------------------------------------------ */

function serializePlain(view: ResumeView): string {
  const doc = buildResumeDocument(view)
  const blocks: string[] = [doc.meta.join('\n')]
  for (const section of doc.sections) {
    blocks.push([section.heading, '-'.repeat(section.heading.length), ...section.lines].join('\n'))
  }
  return `${blocks.join('\n\n')}\n`
}

function markdownCell(value: string): string {
  return value.replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim()
}

/**
 * Pads every cell to a uniform column width so the table still scans cleanly
 * when it is pasted into a form field that does not render Markdown.
 */
function markdownTable(rows: string[][]): string[] {
  const widths = rows[0].map((_, column) =>
    rows.reduce((width, row) => Math.max(width, row[column].length), 0)
  )
  const renderRow = (row: string[]): string =>
    `| ${row.map((cell, column) => cell.padEnd(widths[column])).join(' | ')} |`
  const divider = `| ${widths.map((width) => '-'.repeat(Math.max(width, 3))).join(' | ')} |`
  return [renderRow(rows[0]), divider, ...rows.slice(1).map(renderRow)]
}

function serializeMarkdown(view: ResumeView): string {
  const { profile } = view
  const lines: string[] = [
    `# Full speaking resume — ${profile.name}`,
    '',
    `**Role:** ${profile.role}`,
    `**Firm:** ${profile.firm}`,
    `**Location:** ${profile.location}`,
    `**Years included:** ${describeYears(view)}`,
    `**Source:** ${SPEAKING_PAGE_URL}`,
    '',
    '## Introduction',
    '',
    ...wrapText(profile.intro, TEXT_WIDTH),
    '',
    '## Biography',
    '',
    ...wrapText(profile.bio, TEXT_WIDTH),
    '',
    '## Topics',
    '',
    ...view.topics.map((topic) => `- ${topic}`),
    '',
    '## Formats',
    '',
    ...view.formats.map((format) => `- ${format}`),
    '',
    '## Chronological ledger',
    ''
  ]

  if (view.ledger.length === 0) {
    lines.push('_No appearances in the selected years._')
  } else {
    const rows: string[][] = [['Date', 'Type', 'Title', 'Event / source', 'Link']]
    for (const entry of view.ledger) {
      rows.push([
        markdownCell(entry.date),
        markdownCell(entry.typeLabel),
        markdownCell(entry.title),
        markdownCell(entry.event),
        markdownCell(entry.url || '—')
      ])
    }
    lines.push(...markdownTable(rows))
  }

  return `${lines.join('\n')}\n`
}

function serializeJson(view: ResumeView): string {
  const entryToJson = (entry: ResumeEntry): Record<string, string | number | null> => ({
    type: entry.typeLabel,
    title: entry.title,
    event: entry.event,
    date: entry.date,
    year: entry.year,
    summary: entry.summary || null,
    url: entry.url || null
  })

  return `${JSON.stringify(
    {
      resume: {
        title: 'Full speaking resume',
        source: SPEAKING_PAGE_URL,
        yearsIncluded: view.selectedYears,
        yearsAvailable: view.allYears,
        profile: view.profile,
        topics: view.topics,
        formats: view.formats,
        engagements: view.engagements.map(entryToJson),
        conversations: view.conversations.map(entryToJson),
        ledger: view.ledger.map(entryToJson)
      }
    },
    null,
    2
  )}\n`
}

function xmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function xmlTag(name: string, value: string, indent: string): string {
  return `${indent}<${name}>${xmlText(value)}</${name}>`
}

function serializeXml(view: ResumeView): string {
  const entryXml = (entry: ResumeEntry, tag: string, indent: string): string[] => {
    const inner = `${indent}  `
    const lines = [
      `${indent}<${tag} year="${entry.year}">`,
      xmlTag('type', entry.typeLabel, inner),
      xmlTag('title', entry.title, inner),
      xmlTag('event', entry.event, inner),
      xmlTag('date', entry.date, inner)
    ]
    if (entry.summary) lines.push(xmlTag('summary', entry.summary, inner))
    if (entry.url) lines.push(xmlTag('url', entry.url, inner))
    lines.push(`${indent}</${tag}>`)
    return lines
  }

  const { profile } = view
  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<speakingResume>',
    xmlTag('title', 'Full speaking resume', '  '),
    xmlTag('source', SPEAKING_PAGE_URL, '  '),
    `  <yearsIncluded>${view.selectedYears
      .map((year) => `<year>${year}</year>`)
      .join('')}</yearsIncluded>`,
    '  <profile>',
    xmlTag('name', profile.name, '    '),
    xmlTag('role', profile.role, '    '),
    xmlTag('firm', profile.firm, '    '),
    xmlTag('location', profile.location, '    '),
    xmlTag('intro', profile.intro, '    '),
    xmlTag('bio', profile.bio, '    '),
    '  </profile>',
    '  <topics>',
    ...view.topics.map((topic) => xmlTag('topic', topic, '    ')),
    '  </topics>',
    '  <formats>',
    ...view.formats.map((format) => xmlTag('format', format, '    ')),
    '  </formats>',
    '  <engagements>',
    ...view.engagements.flatMap((entry) => entryXml(entry, 'engagement', '    ')),
    '  </engagements>',
    '  <conversations>',
    ...view.conversations.flatMap((entry) => entryXml(entry, 'conversation', '    ')),
    '  </conversations>',
    '</speakingResume>'
  ]
  return `${lines.join('\n')}\n`
}

function csvCell(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

function serializeCsv(view: ResumeView): string {
  const rows: string[][] = [['Type', 'Date', 'Year', 'Title', 'Event', 'Summary', 'URL']]
  for (const entry of view.ledger) {
    rows.push([
      entry.typeLabel,
      entry.date,
      String(entry.year),
      entry.title,
      entry.event,
      entry.summary,
      entry.url
    ])
  }
  // CRLF line endings keep spreadsheet imports predictable (RFC 4180).
  return `${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}\r\n`
}

export function serializeResume(format: OutputFormat, view: ResumeView): string {
  switch (format) {
    case 'plain':
      return serializePlain(view)
    case 'markdown':
      return serializeMarkdown(view)
    case 'json':
      return serializeJson(view)
    case 'xml':
      return serializeXml(view)
    case 'csv':
      return serializeCsv(view)
  }
}
