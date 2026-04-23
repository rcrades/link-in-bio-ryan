import './style.css'

// The banner is a fixed 2560×1440 element — YouTube's recommended upload size.
// The safe area (1546×423 centered) is visible on every device including mobile;
// anything outside it only shows on desktop/TV layouts, so critical content
// stays inside.
const CANVAS_W = 2560
const CANVAS_H = 1440
const SAFE_W = 1546
const SAFE_H = 423

const bannerMarkup = (variant: 'light' | 'dark') => `
  <div class="yt-banner yt-banner--${variant}" style="width:${CANVAS_W}px;height:${CANVAS_H}px;">
    <div class="yt-banner-pattern" aria-hidden="true"></div>

    <div class="yt-banner-safe" style="width:${SAFE_W}px;height:${SAFE_H}px;">
      <div class="yt-banner-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </div>
      <h1 class="yt-banner-title">Ryan Rademann</h1>
      <p class="yt-banner-tagline">
        Talks, interviews, and field notes on construction&rsquo;s AI moment
      </p>
      <p class="yt-banner-url">ryanrademann.com</p>
    </div>

    <div class="yt-banner-safe-outline" style="width:${SAFE_W}px;height:${SAFE_H}px;" aria-hidden="true"></div>
  </div>
`

const channelDescription = `Ryan Rademann — Partner at Wipfli, Construction & Real Estate Technology.

This channel collects talks, keynotes, and long-form interviews on the construction industry's AI moment. Featured events include Procore Groundbreak, CFMA, BuiltWorlds, the Centuri Energy & Utility Leaders' Executive Forum, Bricks & Bytes, and Office Hours Global.

Topics: construction tech strategy · agentic workflows · AI in the office and the field · talent frameworks · what frontier tools mean for the jobsite leaders have to actually run.

Not here to farm subscribers — here to document a specific moment in construction's adoption of AI. If a video is useful, pass it along.

More writing and contact: ryanrademann.com`

// Raw capture mode: /pages/youtube-banner/?raw or ?raw=dark renders ONLY the
// banner at 2560×1440 with no page chrome. Useful for automated screenshots
// and for manually framing a ⌘⇧4 grab.
const rawParam = new URLSearchParams(window.location.search).get('raw')
const isRaw = rawParam !== null

const html = isRaw
  ? (() => {
      const variant: 'light' | 'dark' = rawParam === 'dark' ? 'dark' : 'light'
      document.body.classList.add('yt-raw-body')
      return bannerMarkup(variant)
    })()
  : `
  <main class="yt-page">
    <header class="yt-page-header">
      <div>
        <h2 class="yt-page-title">YouTube Banner · iteration preview</h2>
        <p class="yt-page-sub">
          Iterate here, then screenshot. Fastest path is to open
          <a href="?raw" class="yt-inline-link">?raw</a> (or
          <a href="?raw=dark" class="yt-inline-link">?raw=dark</a>) in a
          2560×1440 window and capture the whole viewport.
        </p>
      </div>
      <div class="yt-controls">
        <button id="yt-toggle-outline" class="yt-btn">Hide safe area</button>
        <button id="yt-toggle-theme" class="yt-btn">Dark preview</button>
      </div>
    </header>

    <section class="yt-preview-section">
      <div class="yt-preview-meta">
        <span>Scaled preview</span>
        <span class="yt-meta-sep">·</span>
        <span>${CANVAS_W}×${CANVAS_H} canvas</span>
        <span class="yt-meta-sep">·</span>
        <span>safe area ${SAFE_W}×${SAFE_H}</span>
      </div>
      <div class="yt-preview-wrap">
        <div class="yt-preview" id="yt-preview">
          ${bannerMarkup('light')}
        </div>
      </div>
    </section>

    <section class="yt-description-section">
      <div class="yt-description-head">
        <h3>Channel description</h3>
        <button id="yt-copy-desc" class="yt-btn yt-btn--primary">Copy to clipboard</button>
      </div>
      <p class="yt-description-note">
        ${channelDescription.length} / 1000 characters (YouTube limit)
      </p>
      <textarea id="yt-description" class="yt-description-text" readonly>${channelDescription}</textarea>
    </section>

    <section class="yt-full-section">
      <div class="yt-full-head">
        <h3>Full-size banner for screenshot</h3>
        <p class="yt-full-note">
          Below this is the banner at its real ${CANVAS_W}×${CANVAS_H} resolution.
          Screenshot with ⌘⇧4 (macOS) or Win+Shift+S (Windows) at 100% browser zoom.
          The dashed outline is the safe-area guide and will <em>not</em> appear
          in the rendered banner — it's only drawn on the preview when the
          &ldquo;Show safe area&rdquo; control is on.
        </p>
      </div>
      <div class="yt-full-scroll">
        <div id="yt-full" class="yt-full">
          ${bannerMarkup('light')}
        </div>
      </div>
    </section>
  </main>
`

document.querySelector<HTMLDivElement>('#app')!.innerHTML = html

// --- Controls -------------------------------------------------------------

const toggleOutlineBtn = document.getElementById('yt-toggle-outline')
const toggleThemeBtn = document.getElementById('yt-toggle-theme')
const preview = document.getElementById('yt-preview')
const full = document.getElementById('yt-full')

// Raw mode is the final deliverable; don't draw the safe-area guide on it
// and honour the `?raw=dark` request.
let showOutline = !isRaw
let isDark = isRaw && rawParam === 'dark'

const applyOutline = () => {
  document.querySelectorAll('.yt-banner').forEach(el => {
    el.classList.toggle('yt-banner--with-outline', showOutline)
  })
  if (toggleOutlineBtn) {
    toggleOutlineBtn.textContent = showOutline ? 'Hide safe area' : 'Show safe area'
  }
}

const applyTheme = () => {
  const cls = isDark ? 'yt-banner--dark' : 'yt-banner--light'
  const other = isDark ? 'yt-banner--light' : 'yt-banner--dark'
  document.querySelectorAll('.yt-banner').forEach(el => {
    el.classList.remove(other)
    el.classList.add(cls)
  })
  if (toggleThemeBtn) {
    toggleThemeBtn.textContent = isDark ? 'Light preview' : 'Dark preview'
  }
}

toggleOutlineBtn?.addEventListener('click', () => {
  showOutline = !showOutline
  applyOutline()
})

toggleThemeBtn?.addEventListener('click', () => {
  isDark = !isDark
  applyTheme()
})

applyOutline()
applyTheme()

// --- Copy description -----------------------------------------------------

const copyBtn = document.getElementById('yt-copy-desc') as HTMLButtonElement | null
const desc = document.getElementById('yt-description') as HTMLTextAreaElement | null
copyBtn?.addEventListener('click', async () => {
  if (!desc) return
  try {
    await navigator.clipboard.writeText(desc.value)
    copyBtn.textContent = 'Copied ✓'
    setTimeout(() => {
      copyBtn.textContent = 'Copy to clipboard'
    }, 1600)
  } catch {
    // Fallback — select the text so the user can ⌘C manually.
    desc.select()
    copyBtn.textContent = 'Press ⌘C'
    setTimeout(() => {
      copyBtn.textContent = 'Copy to clipboard'
    }, 2200)
  }
})

// --- Responsive preview scale --------------------------------------------
// The scaled preview fits in whatever width the viewport offers. We compute
// the scale once on load and on resize so the preview is always visible.
const scalePreview = () => {
  if (!preview) return
  const wrap = preview.parentElement
  if (!wrap) return
  const available = wrap.clientWidth
  const scale = Math.min(1, available / CANVAS_W)
  preview.style.transform = `scale(${scale})`
  // Reserve the scaled height so the page layout doesn't collapse.
  ;(wrap as HTMLElement).style.height = `${CANVAS_H * scale}px`
}
scalePreview()
window.addEventListener('resize', scalePreview)

// The full-size banner sits inside a horizontally-scrolling container so the
// user can see it at real pixels. Make sure the full container is tall enough.
if (full) {
  ;(full as HTMLElement).style.width = `${CANVAS_W}px`
  ;(full as HTMLElement).style.height = `${CANVAS_H}px`
}
