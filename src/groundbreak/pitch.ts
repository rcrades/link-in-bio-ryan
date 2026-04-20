import './groundbreak.css'
import { CREDIBILITY, SPEAKER, TALK } from './data'
import {
  applyTheme,
  renderAltSwitcher,
  renderGroundbreakBadge,
  renderPreviousEngagement,
  renderSpeakerStamp
} from './shared'

applyTheme()

const html = `
  <main class="gb-page">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
      ${renderSpeakerStamp('inline')}
      ${renderGroundbreakBadge()}
    </header>

    <section class="gb-pitch-hero">
      <div>
        <div class="gb-pitch-kicker">Talk Proposal · Groundbreak 2026</div>
        <h1 class="gb-pitch-title">The <em>San Francisco</em> Consensus</h1>
        <p class="gb-pitch-tagline">${TALK.tagline}</p>
        <a href="${SPEAKER.linkedin}" class="gb-pitch-cta" target="_blank" rel="noopener noreferrer">
          Connect with Ryan →
        </a>
      </div>
      <div>
        ${renderPreviousEngagement('hero')}
      </div>
    </section>

    <section class="gb-section">
      <div class="gb-section-label">The framing</div>
      <div class="gb-hook">
        <div class="gb-hook-kicker">The talk opens on a phone call</div>
        <div class="gb-hook-scene">
          <div class="gb-hook-person">
            <div class="gb-hook-role">Father</div>
            <div class="gb-hook-detail">${TALK.narrativeHook.scene.father}</div>
          </div>
          <div class="gb-hook-v">v.</div>
          <div class="gb-hook-person">
            <div class="gb-hook-role">Daughter</div>
            <div class="gb-hook-detail">${TALK.narrativeHook.scene.daughter}</div>
          </div>
        </div>
        <div class="gb-hook-premise">${TALK.narrativeHook.scene.premise}</div>
        <div class="gb-hook-payoff">${TALK.narrativeHook.payoff}</div>
      </div>
    </section>

    <section class="gb-section">
      <div class="gb-section-label">What a Groundbreak audience walks away with</div>
      <div class="gb-pitch-takeaways">
        ${TALK.takeaways.map(t => `<div class="gb-pitch-takeaway">${t}</div>`).join('')}
      </div>
    </section>

    <section class="gb-section">
      <div class="gb-section-label">Session fit</div>
      <div style="display:grid;grid-template-columns:1fr;gap:1.4rem;margin-top:0.5rem;">
        <div>
          <div class="gb-muted" style="margin-bottom:0.4rem;">Preferred formats</div>
          <div class="gb-chip-row">
            ${TALK.formats.map(f => `<span class="gb-chip gb-chip--accent">${f}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="gb-muted" style="margin-bottom:0.4rem;">Industry topics</div>
          <div class="gb-chip-row">
            ${TALK.topics.map(t => `<span class="gb-chip">${t}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="gb-muted" style="margin-bottom:0.4rem;">Audiences</div>
          <div class="gb-chip-row">
            ${TALK.audiences.map(a => `<span class="gb-chip">${a}</span>`).join('')}
          </div>
        </div>
        <div>
          <div class="gb-muted" style="margin-bottom:0.4rem;">Personas</div>
          <div class="gb-chip-row">
            ${TALK.personas.map(p => `<span class="gb-chip">${p}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>

    <section class="gb-section">
      <div class="gb-section-label">Why this speaker</div>
      <div class="gb-pitch-cred">
        ${CREDIBILITY.map(
          c => `
          <div class="gb-pitch-cred-item">
            <div class="gb-pitch-cred-label">${c.label}</div>
            <div class="gb-pitch-cred-detail">${c.detail}</div>
          </div>
        `
        ).join('')}
      </div>
    </section>

    ${renderAltSwitcher('')}
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html
