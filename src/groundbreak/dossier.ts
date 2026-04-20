import './groundbreak.css'
import { DOSSIER_ANSWERS, PREVIOUS_ENGAGEMENT, SPEAKER } from './data'
import {
  applyTheme,
  renderAltSwitcher,
  renderGroundbreakBadge,
  renderPreviousEngagement
} from './shared'

applyTheme()

const chipList = (items: string[]) =>
  `<div class="gb-chip-row gb-qa-chip-row">${items
    .map(i => `<span class="gb-chip">${i}</span>`)
    .join('')}</div>`

const qa = (
  num: string,
  question: string,
  answer: string,
  opts: { highlight?: boolean; extra?: string; meta?: string } = {}
) => `
  <div class="gb-qa${opts.highlight ? ' gb-qa--highlight' : ''}">
    <div class="gb-qa-num">Question ${num}</div>
    <div class="gb-qa-q">${question}</div>
    ${answer ? `<div class="gb-qa-a">${answer}</div>` : ''}
    ${opts.extra ? `<div class="gb-qa-answer-block">${opts.extra}</div>` : ''}
    ${opts.meta ? `<div class="gb-qa-meta">${opts.meta}</div>` : ''}
  </div>
`

const html = `
  <main class="gb-page">
    <header style="display:flex;justify-content:space-between;align-items:center;gap:1rem;flex-wrap:wrap;">
      ${renderGroundbreakBadge()}
      <a href="/pages/groundbreak/" class="gb-alts-home" style="font-size:0.82rem;">← The pitch</a>
    </header>

    <section class="gb-dossier-header" style="margin-top:2rem;">
      <div class="gb-section-label">The dossier</div>
      <h1 class="gb-dossier-title">Speaker nomination — pre-answered</h1>
      <p class="gb-dossier-sub">
        Every question from the Groundbreak 2026 speaker nomination, answered the
        way I'd answer it today. Saves the reviewer a pass through the form.
        Question 7 is live and linked.
      </p>
    </section>

    <section class="gb-dossier-questions">
      ${qa('1', 'Speaker name', DOSSIER_ANSWERS.q1_name)}
      ${qa('2', 'Speaker job title', DOSSIER_ANSWERS.q2_title)}
      ${qa('3', 'Speaker headshot', '', {
        extra: `<img src="${DOSSIER_ANSWERS.q3_headshot}" alt="${SPEAKER.name}" class="gb-qa-photo" />`,
        meta: 'Hi-res available on request · 2400×2400 PNG'
      })}
      ${qa('4', 'Speaker bio (900 char max)', DOSSIER_ANSWERS.q4_bio, {
        meta: `${DOSSIER_ANSWERS.q4_bio.length} / 900 characters`
      })}
      ${qa(
        '5',
        'LinkedIn, website, or portfolio',
        `<a href="${SPEAKER.site}" target="_blank" rel="noopener" style="color:var(--primary);text-decoration:underline;">${SPEAKER.site}</a>
         · <a href="${SPEAKER.linkedin}" target="_blank" rel="noopener" style="color:var(--primary);text-decoration:underline;">LinkedIn</a>`
      )}
      ${qa('6', 'Presented at Groundbreak before?', `<strong>${DOSSIER_ANSWERS.q6_prior_groundbreak}</strong>`)}
      ${qa(
        '7',
        'Previous speaking engagement link',
        `<a href="${PREVIOUS_ENGAGEMENT.url}" target="_blank" rel="noopener" style="color:var(--gb-procore);text-decoration:underline;font-weight:600;">${PREVIOUS_ENGAGEMENT.url}</a>`,
        {
          highlight: true,
          extra: renderPreviousEngagement('inline'),
          meta: 'Featured prominently because this is the question the form explicitly asks.'
        }
      )}
      ${qa('8', 'Speaker is a', `<strong>${DOSSIER_ANSWERS.q8_speaker_is_a}</strong> — Wipfli is a Procore Partner.`)}
      ${qa('9', 'Preferred session formats', '', {
        extra: chipList(DOSSIER_ANSWERS.q9_formats),
        meta: 'Happy to anchor a solo talk or run it as a facilitated roundtable.'
      })}
      ${qa('10', 'Industry topics', '', {
        extra: chipList(DOSSIER_ANSWERS.q10_topics)
      })}
      ${qa('11', 'Procore products', '', {
        extra: chipList(DOSSIER_ANSWERS.q11_products),
        meta: 'The talk is product-agnostic but lands naturally on Procore AI.'
      })}
      ${qa('12', 'Procore integrations', DOSSIER_ANSWERS.q12_integrations, {
        meta: 'Not all operate in every engagement — list reflects the full practice.'
      })}
      ${qa('13', 'Industry audiences', '', { extra: chipList(DOSSIER_ANSWERS.q13_audiences) })}
      ${qa('14', 'Industry personas', '', { extra: chipList(DOSSIER_ANSWERS.q14_personas) })}
      ${qa('15', 'Why is this a good fit? (900 char max)', DOSSIER_ANSWERS.q15_why_good_fit, {
        meta: `${DOSSIER_ANSWERS.q15_why_good_fit.length} / 900 characters`
      })}
    </section>

    ${renderAltSwitcher('dossier/')}
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html
