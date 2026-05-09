import './style.css'
import * as lucide from 'lucide'
import { inject } from '@vercel/analytics'
import { getProfileImageSrc } from './utils/profileImage'

type Headshot = {
  id: string
  title: string
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
  const profileSrc = await getProfileImageSrc()
  const secondarySrc = await firstExistingImage(SECONDARY_HEADSHOT_OPTIONS)
  const headshots: Headshot[] = [
    {
      id: 'headshot-1',
      title: 'Headshot 1',
      src: profileSrc,
      filename: downloadName('1', profileSrc),
    },
  ]

  if (secondarySrc) {
    headshots.push({
      id: 'headshot-2',
      title: 'Headshot 2',
      src: secondarySrc,
      filename: downloadName('2', secondarySrc),
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
        <h2 class="headshot-card-title">${headshot.title}</h2>
        <p class="headshot-card-copy">
          Shown as a square crop here. Download or open the file for the original image.
        </p>
        <div class="headshot-meta" aria-label="Image details">
          <span data-headshot-dimensions="${headshot.id}">${format}</span>
          <span data-headshot-aspect="${headshot.id}">Checking aspect</span>
          <span>Media use</span>
        </div>
        <p class="headshot-aspect-note" data-headshot-note="${headshot.id}">
          Checking original dimensions...
        </p>
        <div class="headshot-actions">
          <a
            href="${headshot.src}"
            download="${headshot.filename}"
            class="headshot-action headshot-action--download"
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

function trimDecimal(value: number) {
  return value.toFixed(2).replace(/\.00$/, '').replace(/0$/, '')
}

function formatAspectRatio(width: number, height: number) {
  if (width === height) return '1:1'
  if (width > height) return `${trimDecimal(width / height)}:1`
  return `1:${trimDecimal(height / width)}`
}

function hydrateImageMeta() {
  document.querySelectorAll<HTMLImageElement>('.headshot-image').forEach((img) => {
    const updateMeta = () => {
      const id = img.dataset.headshotId
      if (!id || !img.naturalWidth || !img.naturalHeight) return
      const dimensions = document.querySelector<HTMLElement>(`[data-headshot-dimensions="${id}"]`)
      const aspect = document.querySelector<HTMLElement>(`[data-headshot-aspect="${id}"]`)
      const note = document.querySelector<HTMLElement>(`[data-headshot-note="${id}"]`)
      const ratio = formatAspectRatio(img.naturalWidth, img.naturalHeight)

      if (dimensions) {
        dimensions.textContent = `${img.naturalWidth} x ${img.naturalHeight} ${formatFromSrc(img.currentSrc || img.src)}`
      }
      if (aspect) {
        aspect.textContent = `Original ${ratio}`
      }
      if (note) {
        note.textContent = ratio === '1:1'
          ? 'The source image is already square.'
          : `The original ${ratio} version is available through Download or Open File.`
      }
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
