import './style.css'
import * as lucide from 'lucide'
import { inject } from '@vercel/analytics'
import speakingData from './data/speaking.json'
import {
  buildResumeDocument,
  buildResumeSource,
  buildResumeView,
  collectYears,
  countEntriesForYear,
  serializeResume,
  type OutputFormat,
  type ResumeEntry,
  type ResumeProfile,
  type ResumeSource,
  type ResumeView
} from './speaking-resume-format'

type SpeakingJson = {
  profile: ResumeProfile
  topics: string[]
  formats: string[]
  stages: Array<{
    title: string
    event: string
    date: string
    detail: string
    url?: string
  }>
  conversations: Array<{
    title: string
    source: string
    date: string
    url: string
  }>
}

type OutputOption = {
  value: OutputFormat
  label: string
  hint: string
}

const OUTPUT_OPTIONS: OutputOption[] = [
  { value: 'plain', label: 'Plain text', hint: 'Labelled fields for freeform boxes' },
  { value: 'markdown', label: 'Markdown table', hint: 'Padded columns, still readable unrendered' },
  { value: 'json', label: 'JSON', hint: 'Structured records with source URLs' },
  { value: 'xml', label: 'XML', hint: 'Structured records with source URLs' },
  { value: 'csv', label: 'CSV', hint: 'One row per appearance' }
]

const raw = speakingData as SpeakingJson
const source: ResumeSource = buildResumeSource({
  profile: raw.profile,
  topics: raw.topics,
  formats: raw.formats,
  stages: raw.stages,
  conversations: raw.conversations
})
const ALL_YEARS = collectYears(source)

const state = {
  activeTab: 'a' as 'a' | 'b',
  outputFormat: 'plain' as OutputFormat,
  selectedYears: new Set<number>(ALL_YEARS)
}

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/* ------------------------------------------------------------------ */
/* Markup                                                              */
/* ------------------------------------------------------------------ */

function renderEmptyState(): string {
  return `
    <div class="resume-empty" role="note">
      <strong>No years selected.</strong>
      <span>Open <em>Copy / export</em> and choose at least one year to see resume content here.</span>
    </div>
  `
}

/** Format A — the plain-text working document, headings plus labelled fields. */
function renderFormatA(view: ResumeView): string {
  if (view.selectedYears.length === 0) return renderEmptyState()
  const doc = buildResumeDocument(view)
  const sections = doc.sections
    .map(
      (section) => `
        <section class="resume-doc-section">
          <h3 class="resume-doc-heading">${escapeHtml(section.heading)}</h3>
          <pre class="resume-doc-block">${escapeHtml(section.lines.join('\n'))}</pre>
        </section>
      `
    )
    .join('')

  return `
    <div class="resume-doc">
      <pre class="resume-doc-block resume-doc-block--meta">${escapeHtml(doc.meta.join('\n'))}</pre>
      ${sections}
    </div>
  `
}

function renderLedgerRow(entry: ResumeEntry): string {
  const link = entry.url
    ? `<a href="${escapeHtml(entry.url)}" title="${escapeHtml(entry.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open source for ${escapeHtml(entry.title)}">${escapeHtml(entry.url)}</a>`
    : '<span class="resume-ledger-none">—</span>'

  return `
    <tr>
      <th scope="row">${escapeHtml(entry.date)}</th>
      <td>${escapeHtml(entry.typeLabel)}</td>
      <td>${escapeHtml(entry.title)}</td>
      <td>${escapeHtml(entry.event)}</td>
      <td class="resume-ledger-link">${link}</td>
    </tr>
  `
}

/** Format B — one compact row per appearance, newest first. */
function renderFormatB(view: ResumeView): string {
  if (view.selectedYears.length === 0) return renderEmptyState()
  if (view.ledger.length === 0) {
    return `
      <div class="resume-empty" role="note">
        <strong>Nothing recorded in the selected years.</strong>
        <span>Add another year to see rows here.</span>
      </div>
    `
  }

  return `
    <p class="resume-ledger-hint">Wide table &mdash; scroll it sideways to reach the event and link columns.</p>
    <div class="resume-ledger-scroll" role="region" tabindex="0" aria-label="Chronological speaking ledger, scrollable">
      <table class="resume-ledger">
        <caption>
          ${view.ledger.length} appearances, newest first · years ${escapeHtml(view.selectedYears.join(', '))}
        </caption>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Title</th>
            <th scope="col">Event / source</th>
            <th scope="col">Link</th>
          </tr>
        </thead>
        <tbody>
          ${view.ledger.map(renderLedgerRow).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderYearCheckboxes(): string {
  return ALL_YEARS.map((year) => {
    const checked = state.selectedYears.has(year) ? ' checked' : ''
    const count = countEntriesForYear(source, year)
    return `
      <label class="resume-year">
        <input type="checkbox" name="resume-year" value="${year}" data-year-input aria-label="Include ${year} (${count} ${count === 1 ? 'entry' : 'entries'})"${checked} />
        <span class="resume-year-label">${year}</span>
        <span class="resume-year-count">${count}</span>
      </label>
    `
  }).join('')
}

function renderOutputOptions(): string {
  return OUTPUT_OPTIONS.map((option) => {
    const checked = state.outputFormat === option.value ? ' checked' : ''
    return `
      <label class="resume-output">
        <input type="radio" name="resume-output" value="${option.value}" data-output-input aria-label="Output format: ${escapeHtml(option.label)}"${checked} />
        <span class="resume-output-label">${escapeHtml(option.label)}</span>
        <span class="resume-output-hint">${escapeHtml(option.hint)}</span>
      </label>
    `
  }).join('')
}

function renderPage(): string {
  const { profile } = source

  return `
    <main class="resume-page">
      <nav class="speaking-nav" aria-label="Resume page navigation">
        <a href="/speaking" class="speaking-back" aria-label="Back to the speaking page">
          <i data-lucide="chevron-left" aria-hidden="true"></i>
          <span>Speaking</span>
        </a>
        <a href="/" class="speaking-nav-link">RyanRademann.com</a>
      </nav>

      <header class="resume-header">
        <div class="speaking-kicker">Speaker resume</div>
        <h1 class="resume-title">Full speaking resume</h1>
        <p class="resume-lede">
          A working document for conference speaker-application forms. Every field below comes from the
          same source as the speaking page &mdash; select what you need, copy it, paste it.
        </p>
        <p class="resume-identity">
          ${escapeHtml(profile.name)} &middot; ${escapeHtml(profile.role)} &middot;
          ${escapeHtml(profile.firm)} &middot; ${escapeHtml(profile.location)}
        </p>
      </header>

      <section class="resume-toolbar" aria-labelledby="resume-toolbar-title">
        <h2 class="resume-visually-hidden" id="resume-toolbar-title">Copy and export controls</h2>
        <div class="resume-toolbar-row">
          <button
            type="button"
            id="export-toggle"
            class="resume-export-toggle"
            aria-expanded="false"
            aria-controls="export-panel"
            aria-label="Open copy and export options"
          >
            <i data-lucide="clipboard-copy" aria-hidden="true"></i>
            <span>Copy / export</span>
            <i data-lucide="chevron-down" aria-hidden="true" class="resume-export-chevron"></i>
          </button>
          <p class="resume-filter-summary" id="filter-summary"></p>
        </div>

        <div id="export-panel" class="resume-export-panel" hidden>
          <fieldset class="resume-fieldset">
            <legend>Output format</legend>
            <div class="resume-output-grid">${renderOutputOptions()}</div>
          </fieldset>

          <fieldset class="resume-fieldset">
            <legend>Years to include</legend>
            <div class="resume-year-actions">
              <button type="button" id="years-all" class="resume-mini-button" aria-label="Select all years">All years</button>
              <button type="button" id="years-clear" class="resume-mini-button" aria-label="Clear all selected years">Clear</button>
            </div>
            <div class="resume-year-grid">${renderYearCheckboxes()}</div>
          </fieldset>

          <div class="resume-copy-row">
            <button type="button" id="copy-button" class="resume-copy-button" aria-label="Copy the selected years in the chosen output format">
              <i data-lucide="copy" aria-hidden="true"></i>
              <span id="copy-button-label">Copy plain text</span>
            </button>
            <p class="resume-copy-hint" id="copy-hint"></p>
          </div>
        </div>

        <p class="resume-copy-status" id="copy-status" role="status" aria-live="polite"></p>
      </section>

      <div class="resume-tabs">
        <div class="resume-tablist" role="tablist" aria-label="Resume formats">
          <button
            type="button"
            role="tab"
            id="tab-a"
            class="resume-tab"
            aria-controls="panel-a"
            aria-selected="true"
            aria-label="Format A, application-ready plaintext resume"
            tabindex="0"
          >
            <span class="resume-tab-name">Format A</span>
            <span class="resume-tab-sub">Application-ready plaintext. Labelled fields for freeform boxes.</span>
          </button>
          <button
            type="button"
            role="tab"
            id="tab-b"
            class="resume-tab"
            aria-controls="panel-b"
            aria-selected="false"
            aria-label="Format B, compact chronological ledger"
            tabindex="-1"
          >
            <span class="resume-tab-name">Format B</span>
            <span class="resume-tab-sub">Chronological ledger. One row per appearance, built for scanning.</span>
          </button>
        </div>

        <div id="panel-a" class="resume-panel" role="tabpanel" aria-labelledby="tab-a" tabindex="0"></div>
        <div id="panel-b" class="resume-panel" role="tabpanel" aria-labelledby="tab-b" tabindex="0" hidden></div>
      </div>

      <footer class="resume-footer">
        <p>
          Source of truth: the speaking page data set. Nothing here is generated or embellished.
          <a href="/speaking">Back to the speaking page</a>.
        </p>
      </footer>
    </main>
  `
}

/* ------------------------------------------------------------------ */
/* Behaviour                                                           */
/* ------------------------------------------------------------------ */

function currentView(): ResumeView {
  return buildResumeView(source, [...state.selectedYears])
}

function selectedYearsDesc(): number[] {
  return ALL_YEARS.filter((year) => state.selectedYears.has(year))
}

function setStatus(message: string, tone: 'idle' | 'success' | 'error'): void {
  const status = document.getElementById('copy-status')
  if (!status) return
  status.textContent = message
  status.classList.remove('is-success', 'is-error')
  if (tone === 'success') status.classList.add('is-success')
  if (tone === 'error') status.classList.add('is-error')
}

function refreshSummary(view: ResumeView): void {
  const summary = document.getElementById('filter-summary')
  if (!summary) return

  if (view.selectedYears.length === 0) {
    summary.textContent = 'No years selected — nothing to preview or copy.'
    summary.classList.add('is-empty')
    return
  }

  summary.classList.remove('is-empty')
  const scope =
    view.selectedYears.length === view.allYears.length
      ? `All ${view.allYears.length} years`
      : `${view.selectedYears.length} of ${view.allYears.length} years (${view.selectedYears.join(', ')})`
  summary.textContent = `${scope} · ${view.engagements.length} engagements · ${view.conversations.length} recorded conversations`
}

function refreshCopyControls(view: ResumeView): void {
  const button = document.getElementById('copy-button') as HTMLButtonElement | null
  const label = document.getElementById('copy-button-label')
  const hint = document.getElementById('copy-hint')
  const option = OUTPUT_OPTIONS.find((entry) => entry.value === state.outputFormat)
  const empty = view.selectedYears.length === 0

  if (label && option) label.textContent = `Copy ${option.label.toLowerCase()}`

  if (button) {
    button.disabled = empty
    button.setAttribute('aria-disabled', empty ? 'true' : 'false')
  }

  if (hint) {
    hint.textContent = empty
      ? 'Select at least one year before copying.'
      : `Copies ${view.ledger.length} ${view.ledger.length === 1 ? 'record' : 'records'} from ${view.selectedYears.join(', ')}.`
    hint.classList.toggle('is-empty', empty)
  }
}

function refreshPanels(view: ResumeView): void {
  const panelA = document.getElementById('panel-a')
  const panelB = document.getElementById('panel-b')
  if (panelA) panelA.innerHTML = renderFormatA(view)
  if (panelB) panelB.innerHTML = renderFormatB(view)
}

function refresh(): void {
  const view = currentView()
  refreshSummary(view)
  refreshCopyControls(view)
  refreshPanels(view)
}

function activateTab(next: 'a' | 'b', moveFocus: boolean): void {
  state.activeTab = next
  for (const key of ['a', 'b'] as const) {
    const tab = document.getElementById(`tab-${key}`)
    const panel = document.getElementById(`panel-${key}`)
    const isActive = key === next
    if (tab) {
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false')
      tab.setAttribute('tabindex', isActive ? '0' : '-1')
      if (isActive && moveFocus) tab.focus()
    }
    if (panel) panel.hidden = !isActive
  }
}

/**
 * Uses the async clipboard API where it exists, and falls back to a temporary
 * off-screen textarea for browsers (or insecure origins) without it.
 */
async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (error) {
      console.warn('Clipboard API copy failed, falling back.', error)
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', 'readonly')
  textarea.setAttribute('aria-hidden', 'true')
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)

  try {
    textarea.select()
    textarea.setSelectionRange(0, textarea.value.length)
    return document.execCommand('copy')
  } catch (error) {
    console.error('Fallback copy failed.', error)
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}

function bindEvents(): void {
  const toggle = document.getElementById('export-toggle')
  const panel = document.getElementById('export-panel')

  toggle?.addEventListener('click', () => {
    if (!panel) return
    const open = toggle.getAttribute('aria-expanded') === 'true'
    toggle.setAttribute('aria-expanded', open ? 'false' : 'true')
    panel.hidden = open
  })

  document.querySelectorAll<HTMLInputElement>('[data-output-input]').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return
      state.outputFormat = input.value as OutputFormat
      refreshCopyControls(currentView())
      setStatus('', 'idle')
    })
  })

  document.querySelectorAll<HTMLInputElement>('[data-year-input]').forEach((input) => {
    input.addEventListener('change', () => {
      const year = Number.parseInt(input.value, 10)
      if (input.checked) state.selectedYears.add(year)
      else state.selectedYears.delete(year)
      refresh()
      setStatus('', 'idle')
    })
  })

  const setAllYears = (checked: boolean): void => {
    state.selectedYears = checked ? new Set(ALL_YEARS) : new Set<number>()
    document.querySelectorAll<HTMLInputElement>('[data-year-input]').forEach((input) => {
      input.checked = checked
    })
    refresh()
    setStatus('', 'idle')
  }

  document.getElementById('years-all')?.addEventListener('click', () => setAllYears(true))
  document.getElementById('years-clear')?.addEventListener('click', () => setAllYears(false))

  const tablist = document.querySelector<HTMLDivElement>('.resume-tablist')
  tablist?.addEventListener('click', (event) => {
    const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]')
    if (!tab) return
    activateTab(tab.id === 'tab-b' ? 'b' : 'a', false)
  })

  tablist?.addEventListener('keydown', (event) => {
    const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    if (event.key === 'Home') return activateTab('a', true)
    if (event.key === 'End') return activateTab('b', true)
    activateTab(state.activeTab === 'a' ? 'b' : 'a', true)
  })

  document.getElementById('copy-button')?.addEventListener('click', async () => {
    const view = currentView()
    if (view.selectedYears.length === 0) {
      setStatus('Nothing copied. Select at least one year first.', 'error')
      return
    }

    const option = OUTPUT_OPTIONS.find((entry) => entry.value === state.outputFormat)
    const payload = serializeResume(state.outputFormat, view)
    const copied = await copyText(payload)

    if (copied) {
      setStatus(
        `Copied ${option?.label ?? state.outputFormat} for ${selectedYearsDesc().join(', ')} — ${view.ledger.length} ${view.ledger.length === 1 ? 'record' : 'records'}.`,
        'success'
      )
    } else {
      setStatus('Copy failed. Your browser blocked clipboard access — select the text and copy manually.', 'error')
    }
  })
}

function renderResumePage(): void {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  app.innerHTML = renderPage()
  bindEvents()
  activateTab(state.activeTab, false)
  refresh()
  setStatus('', 'idle')

  try {
    lucide.createIcons({ icons: lucide.icons })
  } catch (error) {
    console.error('Error initializing icons:', error)
  }
}

renderResumePage()
