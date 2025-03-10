import './style.css'
import { createIcons, ArrowUpRight, Linkedin, Twitter, Building2, Calendar, Youtube, Newspaper, Rocket } from 'lucide'

console.log('Imported Lucide components:', { ArrowUpRight, Linkedin, Twitter, Building2, Calendar, Youtube, Newspaper, Rocket })

// Initialize icons
try {
  console.log('Attempting to initialize icons...')
  createIcons({
    icons: {
      'arrow-up-right': ArrowUpRight,
      'linkedin': Linkedin,
      'twitter': Twitter,
      'building': Building2,
      'calendar': Calendar,
      'youtube': Youtube,
      'newspaper': Newspaper,
      'rocket': Rocket
    }
  })
  console.log('Icons initialized successfully')
} catch (error) {
  console.error('Error initializing icons:', error)
}

// Create HTML content
const content = `
  <div>
    <div class="profile">
      <img src="/profile.jpg" alt="Ryan Rademann" />
      <h1>Ryan Rademann</h1>
      <p>Technology Consultant at Wipfli</p>
    </div>
    <div class="links-container">
      <a href="https://www.linkedin.com/in/ryanrademann/?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>LinkedIn</h2>
        <i data-lucide="linkedin" class="link-icon" aria-hidden="true"></i>
        <p>Follow me on LinkedIn.</p>
      </a>
      <a href="https://x.com/RyanRademann?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Twitter</h2>
        <i data-lucide="twitter" class="link-icon" aria-hidden="true"></i>
        <p>I retweet on more technical software and I topics.</p>
      </a>
      <a href="your-wipfli-url" class="link-card" target="_blank">
        <h2>Wipfli Bio</h2>
        <i data-lucide="building" class="link-icon" aria-hidden="true"></i>
        <p>Wipfli is a tech, succession, and transition powerhouse.</p>
      </a>
      <a href="your-calendar-url" class="link-card" target="_blank">
        <h2>Schedule a Meeting</h2>
        <i data-lucide="calendar" class="link-icon" aria-hidden="true"></i>
        <p>Book a teams, zoom, or phone call.</p>
      </a>
      <a href="your-podcast-url" class="link-card" target="_blank">
        <h2>Latest Podcast</h2>
        <i data-lucide="youtube" class="link-icon" aria-hidden="true"></i>
        <p>Constructive Podcast on YouTube - 2025 February.</p>
      </a>
      <a href="your-article-url" class="link-card" target="_blank">
        <h2>Latest Article</h2>
        <i data-lucide="newspaper" class="link-icon" aria-hidden="true"></i>
        <p>AI Agents on For Construction Pros.</p>
      </a>
      <a href="https://fieldsity.com?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Stealth Mode Side Project</h2>
        <i data-lucide="rocket" class="link-icon" aria-hidden="true"></i>
        <p>We are building in public a SMB field ops play.</p>
      </a>
    </div>
  </div>
`

// Add content to DOM and then initialize icons again
document.querySelector('#app')!.innerHTML = content
console.log('Content added to DOM')

// Re-run createIcons after content is added
try {
  console.log('Re-initializing icons after content load...')
  createIcons()
  console.log('Icons re-initialized successfully')
} catch (error) {
  console.error('Error re-initializing icons:', error)
}