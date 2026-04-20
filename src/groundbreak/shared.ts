import { ALTS, AltSlug, PREVIOUS_ENGAGEMENT, SPEAKER } from './data'

// Apply the site's theme handling (dark by default) before first paint.
export const applyTheme = () => {
  const stored =
    typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null
  const prefersLight =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  const isDark = stored ? stored === 'dark' : !prefersLight
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark')
}

// A small header that appears on every alt page.
export const renderSpeakerStamp = (variant: 'inline' | 'stacked' = 'inline') => `
  <div class="gb-stamp gb-stamp--${variant}">
    <img src="${SPEAKER.photo}" alt="${SPEAKER.name}" class="gb-stamp-photo" />
    <div class="gb-stamp-text">
      <div class="gb-stamp-name">${SPEAKER.name}</div>
      <div class="gb-stamp-title">${SPEAKER.title}</div>
      <div class="gb-stamp-firm">${SPEAKER.firm} · ${SPEAKER.location}</div>
    </div>
  </div>
`

// The block that directly answers question #7 on the Procore application.
// Featured prominently on every alt so a reviewer never has to hunt for it.
export const renderPreviousEngagement = (layout: 'hero' | 'inline' = 'inline') => `
  <a href="${PREVIOUS_ENGAGEMENT.url}" target="_blank" rel="noopener noreferrer"
     class="gb-prev gb-prev--${layout}">
    <div class="gb-prev-thumb">
      <img src="${PREVIOUS_ENGAGEMENT.thumbnail}" alt="${PREVIOUS_ENGAGEMENT.sessionTitle}" />
      <div class="gb-prev-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
    </div>
    <div class="gb-prev-body">
      <div class="gb-prev-kicker">Question 7 · Previous speaking engagement</div>
      <div class="gb-prev-event">${PREVIOUS_ENGAGEMENT.event}</div>
      <div class="gb-prev-session">${PREVIOUS_ENGAGEMENT.sessionTitle}</div>
      <div class="gb-prev-meta">
        <span>${PREVIOUS_ENGAGEMENT.duration}</span>
        <span>·</span>
        <span>${PREVIOUS_ENGAGEMENT.audience}</span>
      </div>
      <div class="gb-prev-note">${PREVIOUS_ENGAGEMENT.note}</div>
    </div>
  </a>
`

// Footer that lets the reviewer flip between alt versions of this page.
export const renderAltSwitcher = (current: AltSlug) => {
  const others = ALTS.filter(a => a.slug !== current)
  return `
    <section class="gb-alts">
      <div class="gb-alts-kicker">Same speaker · alternate angle</div>
      <div class="gb-alts-grid">
        ${others
          .map(
            alt => `
          <a href="/pages/groundbreak/${alt.slug}" class="gb-alts-card">
            <div class="gb-alts-label">${alt.label}</div>
            <div class="gb-alts-blurb">${alt.blurb}</div>
            <div class="gb-alts-arrow" aria-hidden="true">→</div>
          </a>
        `
          )
          .join('')}
      </div>
      <div class="gb-alts-footer">
        <a href="/" class="gb-alts-home">← ryanrademann.com</a>
      </div>
    </section>
  `
}

export const renderGroundbreakBadge = () => `
  <div class="gb-badge">
    <span class="gb-badge-dot" aria-hidden="true"></span>
    <span>Procore Groundbreak 2026 · Speaker Proposal</span>
  </div>
`
