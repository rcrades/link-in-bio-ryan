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
import publicationsData from './data/publications.json'
import { getProfileImageSrc } from './utils/profileImage'

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

// Function to generate publications HTML
const generatePublications = (publications: any[]) => {
  // Sort publications by date (newest first)
  const sortedPublications = publications.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return sortedPublications.map(pub => {
    const year = new Date(pub.date).getFullYear();
    const typeIcon = pub.type === 'article' ? 'file-text' : 
                    pub.type === 'video' ? 'video' : 
                    pub.type === 'interview' ? 'mic' : 'file';
    
    return `
      <li class="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5 grid grid-rows-2 gap-3">
        <div class="block">
          <h4 class="text-sm font-semibold leading-tight mb-1 text-white block">${pub.title}</h4>
          <p class="text-xs text-gray-400 font-medium block">${pub.source}</p>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex gap-2 items-center">
            <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
              <i icon-name="${typeIcon}" class="w-3 h-3" aria-hidden="true"></i>
              <span class="hidden sm:inline">${pub.type}</span>
              <span class="sm:hidden">${pub.type.charAt(0).toUpperCase()}</span>
            </span>
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
              ${year}
            </span>
          </div>
          <a href="${pub.url}" target="_blank" class="inline-flex items-center justify-center w-7 h-7 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            <i icon-name="arrow-up-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
          </a>
        </div>
      </li>
    `;
  }).join('')
}

// Initialize the app
async function initializeApp() {
  const profileImageSrc = await getProfileImageSrc();
  
  // Create HTML content
  const content = `
    <div>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <i icon-name="sun" class="theme-icon sun" aria-hidden="true"></i>
        <i icon-name="moon" class="theme-icon moon" aria-hidden="true"></i>
      </button>
      <div class="profile">
        <img src="${profileImageSrc}" alt="Ryan Rademann" />
        <h1>Ryan Rademann</h1>
        <p>Technology Consultant at Wipfli</p>
      </div>
    <div class="links-container">
      <div class="social-links">
        ${generateSocialLinks(linksData.socialLinks)}
      </div>
      ${generateRegularLinks(linksData.regularLinks)}
    </div>
    <!-- TEMPORARILY HIDDEN: Publications and Media section
         Reason: Mobile layout is broken/ugly - pills appearing inline with title
         See: tasks_style-cleanup.md for full details
         TODO: Fix layout and re-enable this section
    <footer class="tech-stack publications-media">
      <div class="tech-stack-header">
        <p class="love-note">
          <i icon-name="newspaper" class="tech-icon" aria-hidden="true"></i>
          Publications and Media
        </p>
        <button class="expand-button" aria-label="Show publications and media details">
          <i icon-name="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </button>
      </div>
      <div class="tech-stack-details">
        <ul class="flex flex-col gap-3 mt-4">
          ${generatePublications(publicationsData.publications)}
        </ul>
      </div>
    </footer>
    -->
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
    <!-- Favorite Apps Accordion: Start -->
    <footer class="tech-stack favorite-apps">
      <div class="tech-stack-header">
        <p class="love-note">
          <i icon-name="star" class="tech-icon" aria-hidden="true"></i>
          My favorite apps in 2025
        </p>
        <button class="expand-button" aria-label="Show favorite apps details">
          <i icon-name="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </button>
      </div>
      <div class="tech-stack-details">
        <ul>
          <li>
            <i icon-name="presentation" class="tech-icon" aria-hidden="true"></i>
            AI Slide Deck Creator: <a href="https://gamma.app/signup?r=3kue3y24828ihup" target="_blank">gamma.app <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i icon-name="layout-template" class="tech-icon" aria-hidden="true"></i>
            AI Code Gen: <a href="https://bolt.new/?rid=qsz5nv" target="_blank">bolt.new <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i icon-name="gift" class="tech-icon" aria-hidden="true"></i>
            Win four months of Claude Max: <a href="https://claude.ai/referral/AmO81PvUJQ" target="_blank">Enter here <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i icon-name="layout-template" class="tech-icon" aria-hidden="true"></i>
            Quickbooks Online: <a href="https://quickbooks.partnerlinks.io/ryanrademann" target="_blank">QBO Signup <i icon-name="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </footer>
    <!-- Favorite Apps Accordion: End -->
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

  // Add click handlers for all expandable sections
  const expandButtons = document.querySelectorAll('.expand-button');
  const detailsSections = document.querySelectorAll('.tech-stack-details');
  
  expandButtons.forEach((button, index) => {
    button.addEventListener('click', (e: Event) => {
      const clickedButton = e.currentTarget as HTMLButtonElement;
      const details = detailsSections[index];
      const isExpanded = clickedButton.getAttribute('aria-expanded') === 'true';
      
      clickedButton.setAttribute('aria-expanded', (!isExpanded).toString());
      details?.classList.toggle('expanded');
    });
  });
}

// Initialize the app
initializeApp();