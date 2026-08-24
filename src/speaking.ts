import './style.css'
import * as lucide from 'lucide'
import { inject } from '@vercel/analytics'
import speakingData from './data/speaking.json'
import linksData from './data/links.json'
import { getProfileImageSrc } from './utils/profileImage'

type Stage = {
  title: string
  event: string
  date: string
  detail: string
  url?: string
  linkLabel?: string
  image: string
  imageAlt: string
  imageFit: 'cover' | 'contain'
}

type Conversation = {
  title: string
  source: string
  date: string
  url: string
}

type SpeakingData = {
  profile: {
    name: string
    role: string
    firm: string
    location: string
    intro: string
    bio: string
  }
  topics: string[]
  formats: string[]
  stages: Stage[]
  conversations: Conversation[]
}

const data = speakingData as SpeakingData
const bookingUrl = linksData.regularLinks.find(
  (link) => link.header === 'Schedule a Meeting'
)?.link ?? 'https://www.linkedin.com/in/ryanrademann/'

const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme')
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

document.documentElement.classList[
  getThemePreference() === 'dark' ? 'add' : 'remove'
]('dark')
document.body.classList.add('speaking-body')

inject()

function renderStage(stage: Stage) {
  const link = stage.url
    ? `<a class="speaking-stage-link" href="${stage.url}" target="_blank" rel="noopener noreferrer">
        <span>${stage.linkLabel ?? 'View details'}</span>
        <i data-lucide="arrow-up-right" aria-hidden="true"></i>
      </a>`
    : ''

  return `
    <article class="speaking-stage-card">
      <div class="speaking-stage-visual speaking-stage-visual--${stage.imageFit}">
        <img src="${stage.image}" alt="${stage.imageAlt}" />
      </div>
      <div class="speaking-stage-body">
        <div class="speaking-stage-meta">
          <span>${stage.date}</span>
          <span aria-hidden="true">·</span>
          <span>${stage.event}</span>
        </div>
        <h3>${stage.title}</h3>
        <p>${stage.detail}</p>
        ${link}
      </div>
    </article>
  `
}

function renderConversation(conversation: Conversation) {
  return `
    <a
      class="speaking-conversation"
      href="${conversation.url}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Open ${conversation.title}"
    >
      <div>
        <div class="speaking-conversation-meta">${conversation.date} · ${conversation.source}</div>
        <h3>${conversation.title}</h3>
      </div>
      <i data-lucide="arrow-up-right" aria-hidden="true"></i>
    </a>
  `
}

async function renderSpeakingPage() {
  const profileSrc = await getProfileImageSrc()
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  app.innerHTML = `
    <main class="speaking-page">
      <nav class="speaking-nav" aria-label="Speaking page navigation">
        <a href="/" class="speaking-back" aria-label="Back to RyanRademann.com">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
          <span>RyanRademann.com</span>
        </a>
        <a href="/headshots" class="speaking-nav-link">Headshots</a>
      </nav>

      <header class="speaking-hero">
        <div class="speaking-hero-copy">
          <div class="speaking-kicker">Speaking</div>
          <h1>Talks, panels, and working sessions.</h1>
          <p>${data.profile.intro}</p>
          <a
            class="speaking-resume-cta"
            href="/speaking/resume"
            aria-label="Open the detailed speaker resume"
          >
            <i data-lucide="file-text" aria-hidden="true"></i>
            <span>Detailed speaker resume</span>
            <i data-lucide="arrow-right" aria-hidden="true" class="speaking-resume-cta-arrow"></i>
          </a>
        </div>
        <aside class="speaking-profile" aria-label="About Ryan Rademann">
          <img src="${profileSrc}" alt="Ryan Rademann" />
          <div>
            <div class="speaking-profile-name">${data.profile.name}</div>
            <div class="speaking-profile-role">${data.profile.role}</div>
            <div class="speaking-profile-firm">${data.profile.firm} · ${data.profile.location}</div>
          </div>
        </aside>
      </header>

      <section class="speaking-fit" aria-labelledby="speaking-fit-title">
        <div>
          <div class="speaking-section-label">In the room</div>
          <h2 id="speaking-fit-title">Practical ideas, translated for construction.</h2>
        </div>
        <div class="speaking-fit-columns">
          <div>
            <h3>Topics</h3>
            <ul>
              ${data.topics.map((topic) => `<li>${topic}</li>`).join('')}
            </ul>
          </div>
          <div>
            <h3>Formats</h3>
            <ul>
              ${data.formats.map((format) => `<li>${format}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>

      <section class="speaking-section" aria-labelledby="selected-stages-title">
        <div class="speaking-section-heading">
          <div>
            <div class="speaking-section-label">Selected stages</div>
            <h2 id="selected-stages-title">Recent speaking work</h2>
          </div>
          <span>${data.stages.length} engagements</span>
        </div>
        <div class="speaking-stage-list">
          ${data.stages.map(renderStage).join('')}
        </div>
      </section>

      <section class="speaking-section" aria-labelledby="conversations-title">
        <div class="speaking-section-heading">
          <div>
            <div class="speaking-section-label">Recorded conversations</div>
            <h2 id="conversations-title">Interviews and panels</h2>
          </div>
        </div>
        <div class="speaking-conversation-grid">
          ${data.conversations.map(renderConversation).join('')}
        </div>
      </section>

      <section class="speaking-about" aria-labelledby="about-ryan-title">
        <div class="speaking-section-label">About Ryan</div>
        <h2 id="about-ryan-title">Technology strategy grounded in how work gets done.</h2>
        <p>${data.profile.bio}</p>
      </section>

      <section class="speaking-cta" aria-labelledby="speaking-cta-title">
        <div>
          <div class="speaking-section-label">Planning an event?</div>
          <h2 id="speaking-cta-title">Start with the room, the audience, and the decision you want to move.</h2>
        </div>
        <a href="${bookingUrl}" class="speaking-cta-link" target="_blank" rel="noopener noreferrer">
          <span>Schedule a conversation</span>
          <i data-lucide="arrow-right" aria-hidden="true"></i>
        </a>
      </section>
    </main>
  `

  try {
    lucide.createIcons({ icons: lucide.icons })
  } catch (error) {
    console.error('Error initializing icons:', error)
  }
}

renderSpeakingPage()
