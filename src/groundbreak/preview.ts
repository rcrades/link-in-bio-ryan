import './groundbreak.css'
import { TALK } from './data'
import {
  applyTheme,
  renderAltSwitcher,
  renderGroundbreakBadge,
  renderPreviousEngagement
} from './shared'

applyTheme()

const slides = [
  {
    n: '00',
    title: 'The framing',
    body:
      "A father and daughter on a Sunday phone call. He's in the East Bay — president of a $400M GC, sixty-one, still pours concrete in his sleep. She's in the city — late twenties, Stanford CS, Member of Technical Staff at Anthropic. She can't tell him what she's working on. She can tell him where the puck is going. This talk is an overhearing of her advice — translated for a room full of people with cranes.",
    list: null
  },
  {
    n: '01',
    title: 'The claim',
    body:
      "Inside a ten-block radius of Market Street, a small number of labs, founders, and operators have aligned on a handful of concrete claims. The model is the kernel. Agents will eat applications. Context is the new moat. These aren't takes — they're the operating assumptions of the next ten years.",
    list: null
  },
  {
    n: '02',
    title: 'Three signals the consensus is real',
    body:
      "You can argue about hype, you can't argue with receipts. Three signals that suggest the Bay Area isn't doing its usual overclaiming:",
    list: [
      'Coding agents are now writing PRs larger than 500 lines that pass review at frontier companies — not occasionally, daily.',
      "Valuations for 'context' companies (retrieval, memory, tool-use infra) are a leading indicator of what the next moat looks like.",
      "The migration from 'apps you open' to 'agents you delegate to' is already visible inside every major product org."
    ]
  },
  {
    n: '03',
    title: "Why construction isn't a participant — yet",
    body:
      "Construction is downstream of every software consensus, historically by 3–5 years. The reasons are structural (fragmentation, thin margins, the rightful conservatism of anyone responsible for a crane above a sidewalk) — not cultural. The industry's current AI dialogue is still mostly two things: displacement anxiety, and AI-as-marketing-veneer on products you already bought. Both are distractions.",
    list: null
  },
  {
    n: '04',
    title: 'The 24-month pre-position window',
    body:
      "Consensus propagates on a lag. Construction leaders have roughly two years to pre-position before the agentic workflow patterns hit the jobsite in serious volume. Four moves that separate participants from recipients:",
    list: [
      "People: hire or promote one person whose job title includes the word 'agents' — not 'AI strategy.'",
      'Data: treat your project data the way a model would — queryable, permissioned, with clean boundaries. This is 80% of the work.',
      'Vendors: ask them what they build on top of, not what they stamp on top. Anyone serious will show you a model + context story.',
      'Governance: a one-page policy for how agents act on behalf of the firm beats a 40-page AI strategy deck.'
    ]
  },
  {
    n: '05',
    title: 'What you walk out with',
    body:
      "This talk is designed for the exact room Groundbreak assembles: Owners, GCs, and Specialty Contractors sitting next to Procore's product org. The goal isn't inspiration — it's that a preconstruction VP flies home with three specific moves for Monday.",
    list: TALK.takeaways
  }
]

const renderSlide = (s: typeof slides[number]) => `
  <section class="gb-slide">
    <div class="gb-slide-num">Slide ${s.n}</div>
    <h2 class="gb-slide-title">${s.title}</h2>
    <div class="gb-slide-body">${s.body}</div>
    ${s.list ? `<ul class="gb-slide-list">${s.list.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
  </section>
`

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

    ${slides.map(renderSlide).join('')}

    <section class="gb-preview-proof">
      <div class="gb-preview-proof-kicker">Evidence · Question 7</div>
      ${renderPreviousEngagement('inline')}
    </section>

    ${renderAltSwitcher('preview/')}
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html

// Reveal slides on scroll using IntersectionObserver for a taste of
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
