import './style.css'
import * as lucide from 'lucide'
import { inject } from '@vercel/analytics'
import { getProfileImageSrc } from './utils/profileImage'

// Inherit the theme the visitor picked on the main page. No toggle here —
// the page reads whatever they last set and stays consistent with the rest
// of the site.
const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}
document.documentElement.classList[
  getThemePreference() === 'dark' ? 'add' : 'remove'
]('dark')

inject()

async function renderSpeakerForm() {
  const profileSrc = await getProfileImageSrc()

  const html = `
    <main class="speaker-page">
      <header class="speaker-stamp">
        <img src="${profileSrc}" alt="Ryan Rademann" />
        <div>
          <div class="speaker-stamp-name">Ryan Rademann</div>
          <div class="speaker-stamp-role">Partner, Construction &amp; Real Estate Technology</div>
          <div class="speaker-stamp-firm">Wipfli LLP · Chicago, IL</div>
        </div>
      </header>

      <section class="speaker-intro">
        <div class="speaker-kicker">Speaker Inquiry</div>
        <h1 class="speaker-title">Tell me about your event.</h1>
        <p class="speaker-subtitle">
          I speak to construction and real-estate audiences about technology
          strategy, AI, and the decisions leaders actually have to make. Send
          a few details below and I'll follow up within a couple of days.
        </p>
      </section>

      <form id="speaker-form" class="speaker-form" novalidate>
        <div class="speaker-field">
          <label class="speaker-label" for="eventDetails">Event details</label>
          <textarea
            id="eventDetails"
            name="eventDetails"
            class="speaker-textarea"
            rows="5"
            placeholder="Audience, topic, format (solo / panel / roundtable), size, location…"
            required
          ></textarea>
        </div>

        <div class="speaker-field-row">
          <div class="speaker-field">
            <label class="speaker-label" for="eventDate">When is it?</label>
            <input
              id="eventDate"
              name="eventDate"
              type="date"
              class="speaker-input"
            />
          </div>
          <div class="speaker-field">
            <label class="speaker-label" for="contactInfo">How should I reach you?</label>
            <input
              id="contactInfo"
              name="contactInfo"
              type="text"
              class="speaker-input"
              placeholder="Email or phone"
              required
            />
          </div>
        </div>

        <button type="submit" class="speaker-submit">
          <span>Submit Inquiry</span>
          <i data-lucide="arrow-right" aria-hidden="true"></i>
        </button>
      </form>

      <section id="speaker-success" class="speaker-success" aria-live="polite">
        <div class="speaker-success-icon">
          <i data-lucide="check" aria-hidden="true"></i>
        </div>
        <h2 class="speaker-success-title">Got it — thanks.</h2>
        <p class="speaker-success-body">
          I'll be in touch within a couple of days. Feel free to head back to
          the main page while you wait.
        </p>
      </section>

      <a href="/" class="speaker-back">
        <i data-lucide="chevron-left" aria-hidden="true"></i>
        <span>Back to RyanRademann.com</span>
      </a>
    </main>
  `

  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return
  app.innerHTML = html

  // Initialize lucide icons after the DOM exists.
  try {
    lucide.createIcons({ icons: lucide.icons })
  } catch (err) {
    console.error('Error initializing icons:', err)
  }

  // Submit handler. The form stays client-side for now (no backend wired
  // yet) — swap this for a fetch() to the inquiry endpoint when it lands.
  const form = document.getElementById('speaker-form') as HTMLFormElement | null
  const success = document.getElementById('speaker-success')
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(form)
    const payload = Object.fromEntries(data.entries())
    console.log('Speaker inquiry submitted', payload)
    form.style.display = 'none'
    success?.classList.add('active')
    success?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

renderSpeakerForm()
