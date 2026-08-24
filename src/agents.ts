import './style.css'
import { inject } from '@vercel/analytics'

type AgentMediaIndex = {
  version: string
  owner: {
    name: string
    role: string
    primarySite: string
    wipfliProfile: string
  }
  agentUse: {
    purpose: string
    lastReviewed: string
    rules: string[]
  }
  sourceProfiles: SourceProfile[]
  items: AgentMediaItem[]
}

type SourceProfile = {
  name: string
  url: string
  use: string
}

type AgentMediaItem = {
  id: string
  title: string
  date: string
  type: string
  source: string
  url: string
  tier: string
  visibility: string
  agentNote: string
}

const TIER_LABELS: Record<string, string> = {
  'authored-or-presented': 'Authored / Presented',
  'external-authored-work': 'External Authored Work',
  'syndicated-authored-work': 'Syndicated Authored Work',
  'interview-or-appearance': 'Interviews / Appearances',
  'source-profile': 'Source Profiles',
  'credibility-mention': 'Credibility Mentions',
}

const TIER_ORDER = [
  'authored-or-presented',
  'external-authored-work',
  'syndicated-authored-work',
  'interview-or-appearance',
  'source-profile',
  'credibility-mention',
]

const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

document.documentElement.classList[
  getThemePreference() === 'dark' ? 'add' : 'remove'
]('dark')
document.body.classList.add('agent-index-body')

inject()

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const labelFor = (value: string) =>
  TIER_LABELS[value] ?? value.replace(/-/g, ' ')

const formatDate = (value: string) => {
  if (!value) return 'Date pending'
  if (/^\d{4}$/.test(value)) return value
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split('-')
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return value
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

const groupItems = (items: AgentMediaItem[]) => {
  const grouped = new Map<string, AgentMediaItem[]>()
  for (const tier of TIER_ORDER) grouped.set(tier, [])
  for (const item of items) {
    if (!grouped.has(item.tier)) grouped.set(item.tier, [])
    grouped.get(item.tier)?.push(item)
  }
  for (const tierItems of grouped.values()) {
    tierItems.sort((a, b) => b.date.localeCompare(a.date))
  }
  return grouped
}

const renderSourceProfiles = (profiles: SourceProfile[]) => `
  <section class="agent-panel">
    <div class="agent-section-heading">
      <p class="agent-kicker">Canonical Places</p>
      <h2>Profile And Source Pages</h2>
    </div>
    <div class="agent-profile-grid">
      ${profiles.map(profile => `
        <a class="agent-profile-card" href="${escapeHtml(profile.url)}" target="_blank" rel="noreferrer">
          <span>${escapeHtml(profile.name)}</span>
          <small>${escapeHtml(profile.use)}</small>
        </a>
      `).join('')}
    </div>
  </section>
`

const renderItem = (item: AgentMediaItem) => `
  <article class="agent-item" id="${escapeHtml(item.id)}">
    <div class="agent-item-main">
      <div class="agent-item-meta">
        <span>${escapeHtml(formatDate(item.date))}</span>
        <span>${escapeHtml(item.type)}</span>
        <span>${escapeHtml(item.source)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.agentNote)}</p>
      <div class="agent-item-tags">
        <code>${escapeHtml(item.tier)}</code>
        <code>${escapeHtml(item.visibility)}</code>
        <code>${escapeHtml(item.id)}</code>
      </div>
    </div>
    ${item.url ? `
      <a class="agent-item-link" href="${escapeHtml(item.url)}" target="_blank" rel="noreferrer">
        Source
      </a>
    ` : '<span class="agent-item-link agent-item-link--muted">Verify URL</span>'}
  </article>
`

const renderTier = (tier: string, items: AgentMediaItem[]) => {
  if (!items.length) return ''
  return `
    <section class="agent-panel">
      <div class="agent-section-heading">
        <p class="agent-kicker">${items.length} item${items.length === 1 ? '' : 's'}</p>
        <h2>${escapeHtml(labelFor(tier))}</h2>
      </div>
      <div class="agent-item-list">
        ${items.map(renderItem).join('')}
      </div>
    </section>
  `
}

const renderPage = (index: AgentMediaIndex) => {
  const grouped = groupItems(index.items)
  const authoredCount = index.items.filter(item =>
    ['authored-or-presented', 'external-authored-work', 'syndicated-authored-work'].includes(item.tier)
  ).length
  const appearanceCount = index.items.filter(item => item.tier === 'interview-or-appearance').length
  const mentionCount = index.items.filter(item => item.tier === 'credibility-mention').length

  return `
    <main class="agent-index-page">
      <header class="agent-hero">
        <a class="agent-back-link" href="/">RyanRademann.com</a>
        <p class="agent-kicker">Static Agent Index</p>
        <h1>Ryan Rademann Publications, Appearances, And Source Map</h1>
        <p class="agent-hero-copy">${escapeHtml(index.agentUse.purpose)}</p>
        <div class="agent-json-callout">
          <span>Machine-readable JSON</span>
          <a href="/agent-media-index.json">/agent-media-index.json</a>
        </div>
      </header>

      <section class="agent-stats" aria-label="Index summary">
        <div><strong>${index.items.length}</strong><span>Total records</span></div>
        <div><strong>${authoredCount}</strong><span>Authored / syndicated</span></div>
        <div><strong>${appearanceCount}</strong><span>Appearances</span></div>
        <div><strong>${mentionCount}</strong><span>Mentions</span></div>
      </section>

      <section class="agent-panel agent-rules">
        <div class="agent-section-heading">
          <p class="agent-kicker">Reviewed ${escapeHtml(index.agentUse.lastReviewed)}</p>
          <h2>Agent Use Rules</h2>
        </div>
        <ul>
          ${index.agentUse.rules.map(rule => `<li>${escapeHtml(rule)}</li>`).join('')}
        </ul>
      </section>

      ${renderSourceProfiles(index.sourceProfiles)}
      ${Array.from(grouped.entries()).map(([tier, items]) => renderTier(tier, items)).join('')}
    </main>
  `
}

const renderError = (message: string) => `
  <main class="agent-index-page">
    <header class="agent-hero">
      <a class="agent-back-link" href="/">RyanRademann.com</a>
      <p class="agent-kicker">Static Agent Index</p>
      <h1>Agent media index could not load.</h1>
      <p class="agent-hero-copy">${escapeHtml(message)}</p>
      <div class="agent-json-callout">
        <span>Try the JSON directly</span>
        <a href="/agent-media-index.json">/agent-media-index.json</a>
      </div>
    </header>
  </main>
`

const loadIndex = async () => {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  try {
    const response = await fetch('/agent-media-index.json', { cache: 'no-store' })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const index = await response.json() as AgentMediaIndex
    app.innerHTML = renderPage(index)
  } catch (error) {
    app.innerHTML = renderError(error instanceof Error ? error.message : 'Unknown error')
  }
}

loadIndex()
