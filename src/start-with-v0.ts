import './style.css'

const templates = [
  {
    title: 'How to Start with v0',
    image: '/v0-templates/start-w-v0.png',
    url: 'https://v0.app/templates/how-to-start-with-v0-K1gbGUb2rXK'
  },
  {
    title: 'v0 System Instructions',
    image: '/v0-templates/prompts image.png',
    url: 'https://v0.app/templates/v0-system-instructions-RutwgOGrI7y'
  }
]

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="v0-page">
    <div class="v0-grid">
      ${templates.map(t => `
        <div class="v0-card">
          <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="v0-thumb-wrap">
            <img src="${t.image}" alt="${t.title}" class="v0-thumb" />
            <div class="v0-overlay">
              <span class="v0-overlay-text">Open v0 Template</span>
            </div>
          </a>
          <div class="v0-card-footer">
            <span class="v0-card-title">${t.title}</span>
            <a href="${t.url}" target="_blank" rel="noopener noreferrer" class="v0-launch-btn">Launch</a>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
`
