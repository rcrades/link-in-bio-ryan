import './style.css'
import * as lucide from 'lucide'
import { inject } from '@vercel/analytics'
import { getProfileImageSrc } from './utils/profileImage'

type Headshot = {
  id: string
  title: string
  label: string
  description: string
  src: string
  filename: string
}

const SECONDARY_HEADSHOT_OPTIONS = [
  // Drop the second public image into public/headshots/ with one of these names.
  '/headshots/ryan-rademann-secondary.jpg',
  '/headshots/ryan-rademann-secondary.jpeg',
  '/headshots/ryan-rademann-secondary.png',
  '/headshots/ryan-rademann-secondary.webp',
  '/headshots/ryan-rademann-secondary.avif',
]

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

async function imageExists(src: string) {
  try {
    const response = await fetch(src, { method: 'HEAD' })
    const contentType = response.headers.get('content-type') || ''
    return response.ok && contentType.startsWith('image/')
  } catch {
    return false
  }
}

async function firstExistingImage(srcs: string[]) {
  for (const src of srcs) {
    if (await imageExists(src)) return src
  }
  return null
}

function formatFromSrc(src: string) {
  const ext = src.split('.').pop()?.toUpperCase()
  if (!ext) return 'Image'
  if (ext === 'JPG') return 'JPEG'
  return ext
}

function downloadName(label: string, src: string) {
  const ext = src.split('.').pop() || 'jpg'
  return `ryan-rademann-${label}-headshot.${ext}`
}

async function getHeadshots(): Promise<Headshot[]> {
  const primarySrc = await getProfileImageSrc()
  const secondarySrc = await firstExistingImage(SECONDARY_HEADSHOT_OPTIONS)
  const headshots: Headshot[] = [
    {
      id: 'primary',
      title: 'Primary Headshot',
      label: 'Profile',
      description: 'Current profile photo for podcast and media use.',
      src: primarySrc,
      filename: downloadName('primary', primarySrc),
    },
  ]

  if (secondarySrc) {
    headshots.push({
      id: 'secondary',
      title: 'Alternate Headshot',
      label: 'Alternate',
      description: 'Secondary option for layouts that need a different crop.',
      src: secondarySrc,
      filename: downloadName('alternate', secondarySrc),
    })
  }

  return headshots
}

function renderHeadshotCard(headshot: Headshot) {
  const format = formatFromSrc(headshot.src)

  return `
    <article class="headshot-card">
      <div class="headshot-preview">
        <img
          src="${headshot.src}"
          alt="${headshot.title} of Ryan Rademann"
          class="headshot-image"
          data-headshot-id="${headshot.id}"
        />
      </div>
      <div class="headshot-card-body">
        <div class="headshot-label">${headshot.label}</div>
        <h2 class="headshot-card-title">${headshot.title}</h2>
        <p class="headshot-card-copy">${headshot.description}</p>
        <div class="headshot-meta" aria-label="Image details">
          <span data-headshot-meta="${headshot.id}">${format}</span>
          <span>Media use</span>
        </div>
        <div class="headshot-actions">
          <a
            href="${headshot.src}"
            download="${headshot.filename}"
            class="headshot-action headshot-action--primary"
            aria-label="Download ${headshot.title.toLowerCase()}"
          >
            <i data-lucide="download" aria-hidden="true"></i>
            <span>Download</span>
          </a>
          <a
            href="${headshot.src}"
            target="_blank"
            rel="noopener"
            class="headshot-action"
            aria-label="Open ${headshot.title.toLowerCase()} full size"
          >
            <i data-lucide="external-link" aria-hidden="true"></i>
            <span>Open File</span>
          </a>
        </div>
      </div>
    </article>
  `
}

function hydrateImageMeta() {
  document.querySelectorAll<HTMLImageElement>('.headshot-image').forEach((img) => {
    const updateMeta = () => {
      const id = img.dataset.headshotId
      if (!id || !img.naturalWidth || !img.naturalHeight) return
      const meta = document.querySelector<HTMLElement>(`[data-headshot-meta="${id}"]`)
      if (!meta) return
      meta.textContent = `${img.naturalWidth} x ${img.naturalHeight} ${formatFromSrc(img.currentSrc || img.src)}`
    }

    if (img.complete) {
      updateMeta()
    } else {
      img.addEventListener('load', updateMeta, { once: true })
    }
  })
}

async function renderHeadshotsPage() {
  const headshots = await getHeadshots()
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  app.innerHTML = `
    <main class="headshots-page">
      <nav class="headshots-nav" aria-label="Headshots navigation">
        <a href="/" class="headshots-back" aria-label="Back to RyanRademann.com">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
          <span>RyanRademann.com</span>
        </a>
      </nav>

      <header class="headshots-header">
        <div class="headshots-kicker">Media Kit</div>
        <h1 class="headshots-title">Ryan Rademann Headshots</h1>
        <p class="headshots-subtitle">For podcast, speaker, and media use.</p>
      </header>

      <section class="headshots-grid" aria-label="Available headshots">
        ${headshots.map(renderHeadshotCard).join('')}
      </section>
    </main>
  `

  try {
    lucide.createIcons({ icons: lucide.icons })
  } catch (err) {
    console.error('Error initializing icons:', err)
  }

  hydrateImageMeta()
}

renderHeadshotsPage()
