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
import linksData from './data/links.json'

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

// Function to generate social links HTML
const generateSocialLinks = (socialLinks: any[]) => {
  return socialLinks.map(link => `
    <a href="${link.link}" class="social-card" target="_blank">
      <i icon-name="${link.icon}" class="social-icon" aria-hidden="true"></i>
    </a>
  `).join('')
}

// Function to generate regular links HTML
const generateRegularLinks = (regularLinks: any[]) => {
  return regularLinks.map(link => `
    <a href="${link.link}" class="link-card" target="_blank">
      <h2>${link.header}</h2>
      <i icon-name="${link.icon}" class="link-icon" aria-hidden="true"></i>
      <p>${link.description}</p>
    </a>
  `).join('')
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
        ${generateSocialLinks(linksData.socialLinks)}
      </div>
      ${generateRegularLinks(linksData.regularLinks)}
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