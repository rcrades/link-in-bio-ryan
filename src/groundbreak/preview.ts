import './groundbreak.css'
import { TALK } from './data'
import {
  applyTheme,
  renderAltSwitcher,
  renderGroundbreakBadge,
  renderPreviousEngagement
} from './shared'

applyTheme()

// Each section has its own body layout so the page reads as chapters
// rather than a uniform slide deck. `layout` dispatches the inner render.
type Section =
  | { layout: 'prose'; title: string; body: string }
  | {
      layout: 'signals'
      title: string
      body: string
      signals: string[]
    }
  | {
      layout: 'moves'
      title: string
      body: string
      moves: { label: string; body: string }[]
    }
  | {
      layout: 'walk'
      title: string
      body: string
      items: string[]
    }

const sections: Section[] = [
  {
    layout: 'prose',
    title: 'The framing',
    body:
      "A father and daughter meet for lunch downtown on Sundays. He drives in from the East Bay — president of a $400M GC, sixty-one, still pours concrete in his sleep. She walks over from her side of town — late twenties, Stanford CS, Member of Technical Staff at Anthropic. She can't tell him what she's working on. She can tell him where the puck is going. This talk is an overhearing of her advice — translated for a room full of people with cranes."
  },
  {
    layout: 'prose',
    title: 'The claim',
    body:
      "Inside a ten-block radius of Market Street, a small number of labs, founders, and operators have aligned on a handful of concrete claims. The model itself is the product, not a feature bolted on top. Agents will eat applications. Context is the new moat. These aren't takes — they're the operating assumptions of the next ten years."
  },
  {
    layout: 'signals',
    title: 'Three signals the consensus is real',
    body:
      "You can argue about hype, you can't argue with receipts. Three signals that suggest the Bay Area isn't doing its usual overclaiming.",
    signals: [
      'Coding agents are now writing PRs larger than 500 lines that pass review at frontier companies — not occasionally, daily.',
      "Valuations for 'context' companies (retrieval, memory, tool-use infra) are a leading indicator of what the next moat looks like.",
      "The migration from 'apps you open' to 'agents you delegate to' is already visible inside every major product org."
    ]
  },
  {
    layout: 'prose',
    title: "Why construction isn't a participant — yet",
    body:
      "Construction is downstream of every software consensus, historically by 3–5 years. The reasons are structural (fragmentation, thin margins, the rightful conservatism of anyone responsible for a crane above a sidewalk) — not cultural. The industry's current AI dialogue is still mostly two things: displacement anxiety, and AI-as-marketing-veneer on products you already bought. Both are distractions."
  },
  {
    layout: 'moves',
    title: 'The 24-month pre-position window',
    body:
      "Consensus propagates on a lag. Construction leaders have roughly two years to pre-position before the agentic workflow patterns hit the jobsite in serious volume. Four moves that separate participants from recipients.",
    moves: [
      {
        label: 'People',
        body:
          "Hire or promote one person whose job title includes the word \u2018agents\u2019 — not \u2018AI strategy.\u2019"
      },
      {
        label: 'Data',
        body:
          'Treat your project data the way a model would — queryable, permissioned, with clean boundaries. This is 80% of the work.'
      },
      {
        label: 'Vendors',
        body:
          'Ask what they build on top of, not what they stamp on top. Anyone serious will show you a model + context story.'
      },
      {
        label: 'Governance',
        body:
          'A one-page policy for how agents act on behalf of the firm beats a 40-page AI strategy deck.'
      }
    ]
  },
  {
    layout: 'walk',
    title: 'What you walk out with',
    body:
      "This talk is designed for the exact room Groundbreak assembles: Owners, GCs, and Specialty Contractors sitting next to Procore's product org. The goal isn't inspiration — it's that a construction firm's COO flies home with three specific moves for Monday.",
    items: TALK.takeaways.map(t => t.text)
  }
]

const renderHeader = (title: string, body: string) => `
  <h2 class="gb-slide-title">${title}</h2>
  <div class="gb-slide-body">${body}</div>
`

const renderProse = (s: Extract<Section, { layout: 'prose' }>) =>
  renderHeader(s.title, s.body)

const renderSignals = (s: Extract<Section, { layout: 'signals' }>) => `
  ${renderHeader(s.title, s.body)}
  <ol class="gb-signals">
    ${s.signals
      .map(
        (sig, i) => `
      <li class="gb-signal">
        <div class="gb-signal-num">${String(i + 1).padStart(2, '0')}</div>
        <p class="gb-signal-body">${sig}</p>
      </li>
    `
      )
      .join('')}
  </ol>
`

const renderMoves = (s: Extract<Section, { layout: 'moves' }>) => `
  ${renderHeader(s.title, s.body)}
  <div class="gb-moves">
    ${s.moves
      .map(
        m => `
      <div class="gb-move">
        <div class="gb-move-label">${m.label}</div>
        <div class="gb-move-body">${m.body}</div>
      </div>
    `
      )
      .join('')}
  </div>
`

const renderWalk = (s: Extract<Section, { layout: 'walk' }>) => `
  ${renderHeader(s.title, s.body)}
  <ul class="gb-walk">
    ${s.items
      .map(
        item => `
      <li class="gb-walk-item">
        <span class="gb-walk-check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </span>
        <span>${item}</span>
      </li>
    `
      )
      .join('')}
  </ul>
`

const renderSection = (s: Section) => {
  let inner: string
  switch (s.layout) {
    case 'signals':
      inner = renderSignals(s)
      break
    case 'moves':
      inner = renderMoves(s)
      break
    case 'walk':
      inner = renderWalk(s)
      break
    default:
      inner = renderProse(s)
  }
  return `<section class="gb-slide gb-slide--${s.layout}">${inner}</section>`
}

const html = `
  <main class="gb-page">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
      ${renderGroundbreakBadge()}
      <a href="/pages/groundbreak/" class="gb-alts-home" style="font-size:0.82rem;">← The pitch</a>
    </header>

    <section class="gb-preview-hero">
      <div class="gb-pitch-kicker">A scroll-through taste of the talk</div>
      <h1 class="gb-preview-title">The San&nbsp;Francisco Consensus</h1>
      <p class="gb-preview-tagline">${TALK.tagline}</p>
      <div class="gb-preview-scroll-hint">Scroll</div>
    </section>

    ${sections.map(renderSection).join('')}

    <section class="gb-preview-proof">
      <div class="gb-preview-proof-kicker">Evidence · Question 7</div>
      ${renderPreviousEngagement('inline')}
    </section>

    ${renderAltSwitcher('preview/')}
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html

// Reveal sections on scroll using IntersectionObserver for a taste of
// on-stage pacing without shipping a heavy animation library.
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
)

document.querySelectorAll('.gb-slide').forEach(el => observer.observe(el))
