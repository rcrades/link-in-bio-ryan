import './style.css'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../convex/_generated/api'

const templates = [
  {
    title: 'How to Start with v0',
    imageNames: ['start-w-v0.png', 'How to Start with v0'],
    url: 'https://v0.app/templates/how-to-start-with-v0-K1gbGUb2rXK'
  },
  {
    title: 'v0 System Instructions',
    imageNames: ['prompts image.png', 'v0 System Instructions'],
    url: 'https://v0.app/templates/v0-system-instructions-RutwgOGrI7y'
  }
]

type Template = (typeof templates)[number]
type TemplateImage = {
  name: string
  alt?: string
  url: string | null
}

const htmlEscapes: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

const app = document.querySelector<HTMLDivElement>('#app')

if (app) {
  app.innerHTML = renderTemplates()
  void hydrateTemplateImages(app)
}

async function hydrateTemplateImages(container: HTMLDivElement) {
  const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined
  if (!convexUrl) return

  try {
    const client = new ConvexHttpClient(convexUrl)
    const images = await client.query(api.images.publicByNames, {
      names: templates.flatMap((template) => template.imageNames)
    }) as TemplateImage[]
    const imagesByName = new Map(images.filter(hasUrl).map((image) => [image.name, image]))

    if (imagesByName.size > 0) {
      container.innerHTML = renderTemplates(imagesByName)
    }
  } catch (err) {
    console.warn('Convex v0 template image fetch failed, using text thumbnails', err)
  }
}

function renderTemplates(imagesByName = new Map<string, TemplateImage>()) {
  return `
  <div class="v0-page">
    <div class="v0-grid">
      ${templates.map((template) => `
        <div class="v0-card">
          <a href="${template.url}" target="_blank" rel="noopener noreferrer" class="v0-thumb-wrap" aria-label="Open ${escapeAttribute(template.title)}">
            ${renderTemplateImage(template, imagesByName)}
            <div class="v0-overlay">
              <span class="v0-overlay-text">Open v0 Template</span>
            </div>
          </a>
          <div class="v0-card-footer">
            <span class="v0-card-title">${escapeHtml(template.title)}</span>
            <a href="${template.url}" target="_blank" rel="noopener noreferrer" class="v0-launch-btn">Launch</a>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`
}

function renderTemplateImage(template: Template, imagesByName: Map<string, TemplateImage>) {
  const image = template.imageNames.map((name) => imagesByName.get(name)).find(Boolean)
  if (image?.url) {
    return `<img src="${escapeAttribute(image.url)}" alt="${escapeAttribute(image.alt ?? template.title)}" class="v0-thumb" />`
  }

  return `
    <div class="v0-thumb-fallback" role="img" aria-label="${escapeAttribute(template.title)}">
      <span>${escapeHtml(template.title)}</span>
    </div>
  `
}

function hasUrl(image: TemplateImage): image is TemplateImage & { url: string } {
  return typeof image.url === 'string' && image.url.length > 0
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => htmlEscapes[character])
}

function escapeAttribute(value: string) {
  return escapeHtml(value)
}
