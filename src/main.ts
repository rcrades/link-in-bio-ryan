// Theme handling
const getThemePreference = () => {
  // First check localStorage
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
  // Then check system preference, default to dark if no preference
  const systemPreference = window.matchMedia('(prefers-color-scheme: light)');
  return systemPreference.matches ? 'light' : 'dark';
};

// Apply theme immediately
const isDark = getThemePreference() === 'dark';
document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

// Watch for theme changes
if (typeof localStorage !== 'undefined') {
  const observer = new MutationObserver(() => {
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
}

import './style.css'
import * as lucide from 'lucide'

// Initialize icons with all available icons
try {
  console.log('Attempting to initialize icons...')
  lucide.createIcons({
    icons: lucide.icons
  })
  console.log('Icons initialized successfully')
} catch (error) {
  console.error('Error initializing icons:', error)
}

// Create HTML content
const content = `
  <div>
    <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
      <i icon-name="sun" class="theme-icon sun" aria-hidden="true"></i>
      <i icon-name="moon" class="theme-icon moon" aria-hidden="true"></i>
    </button>
    <div class="profile">
      <img src="/profile.jpg" alt="Ryan Rademann" />
      <h1>Ryan Rademann</h1>
      <p>Technology Consultant at Wipfli</p>
    </div>
    <div class="links-container">
      <div class="social-links">
        <a href="https://www.linkedin.com/in/ryanrademann/?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="social-card" target="_blank">
          <i icon-name="linkedin" class="social-icon" aria-hidden="true"></i>
        </a>
        <a href="https://x.com/RyanRademann?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="social-card" target="_blank">
          <i icon-name="twitter" class="social-icon" aria-hidden="true"></i>
        </a>
      </div>
      <a href="https://www.wipfli.com/about-wipfli/partners-and-associates/ryan-rademann?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Wipfli Bio</h2>
        <i icon-name="building-2" class="link-icon" aria-hidden="true"></i>
        <p>Construction's tech, succession, <br>and transition powerhouse.</p>
      </a>
      <a href="https://outlook.office.com/bookwithme/user/32a54d6a57dc459c9dd140df42f528d4%40wipfli.com?bookingcode=5bfcef0c-c41a-4af4-ac45-a82ca5adc519&anonymous&isanonymous=true&utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Schedule a Meeting</h2>
        <i icon-name="calendar" class="link-icon" aria-hidden="true"></i>
        <p>Book a teams, zoom, or phone call.</p>
      </a>
      <a href="https://youtu.be/i8l8gEdD6fQ?si=3hOmM_x3Zedb-0I3&utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Latest Podcast</h2>
        <i icon-name="youtube" class="link-icon" aria-hidden="true"></i>
        <p>Constructive Podcast on YouTube<br>2025 February.</p>
      </a>
      <a href="https://www.forconstructionpros.com/construction-technology/project-management/article/22932667/wipfli-llp-how-ai-agents-are-leading-the-future-of-construction?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Latest Article</h2>
        <i icon-name="newspaper" class="link-icon" aria-hidden="true"></i>
        <p>AI Agents on<br>For Construction Pros.</p>
      </a>
      <a href="https://fieldsity.com?utm_source=linkinbio&utm_medium=social&utm_campaign=profile" class="link-card" target="_blank">
        <h2>Stealth Mode Project</h2>
        <i icon-name="rocket" class="link-icon" aria-hidden="true"></i>
        <p>I am an advisor to a startup<br>building field AI for SMB.</p>
      </a>
    </div>
    <div class="divider">
      <i icon-name="hard-hat" class="divider-icon" aria-hidden="true"></i>
    </div>
    <footer class="tech-stack">
      <div class="tech-stack-header">
        <p class="love-note">
          <i icon-name="heart" class="tech-icon" aria-hidden="true"></i>
          Like this contact info page?
        </p>
        <button class="expand-button" aria-label="Show tech stack details">
          <i icon-name="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </button>
      </div>
      <div class="tech-stack-details">
        <p class="text-xs">
          <i icon-name="code" class="tech-icon" aria-hidden="true"></i>
          Built with a bespoke software stack in 2025
        </p>
        <ul>
          <li>
            <i icon-name="layout-template" class="tech-icon" aria-hidden="true"></i>
            Boilerplate & Prototype: <a href="https://bolt.new/?rid=qsz5nv" target="_blank">bolt.new <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i icon-name="boxes" class="tech-icon" aria-hidden="true"></i>
            Codebase: <span class="tech-pill">React</span> + <span class="tech-pill">Vite</span>
          </li>
          <li>
            <i icon-name="cloud" class="tech-icon" aria-hidden="true"></i>
            Hosting: <span class="tech-pill">Vercel</span> + <span class="tech-pill">GoDaddy</span>
          </li>
        </ul>
        <a href="https://github.com/rcrades/link-in-bio-ryan" target="_blank" class="github-link">
          <i icon-name="github" class="tech-icon" aria-hidden="true"></i>
          rcrades <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  </div>
`

// Add content to DOM and then initialize icons again
document.querySelector('#app')!.innerHTML = content
console.log('Content added to DOM')

// Re-run createIcons after content is added
try {
  console.log('Re-initializing icons after content load...')
  lucide.createIcons({
    icons: lucide.icons
  })
  console.log('Icons re-initialized successfully')
} catch (error) {
  console.error('Error re-initializing icons:', error)
}

// Add theme toggle functionality
document.getElementById('theme-toggle')?.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// Add click handler for tech stack expansion
document.querySelector('.expand-button')?.addEventListener('click', (e: Event) => {
  const button = e.currentTarget as HTMLButtonElement;
  const details = document.querySelector('.tech-stack-details');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  button.setAttribute('aria-expanded', (!isExpanded).toString());
  details?.classList.toggle('expanded');
});