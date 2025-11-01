// Theme handling
const getThemePreference = () => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
    return localStorage.getItem('theme');
  }
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
import podcastsData from './data/podcasts.json'
import { getProfileImageSrc } from './utils/profileImage'

// Initialize icons
try {
  lucide.createIcons({
    icons: lucide.icons
  })
} catch (error) {
  console.error('Error initializing icons:', error)
}

// Function to generate social links HTML
const generateSocialLinks = (socialLinks: any[]) => {
  return socialLinks.map(link => `
    <a href="${link.link}" class="social-card" target="_blank">
      <i data-lucide="${link.icon}" class="social-icon" aria-hidden="true"></i>
    </a>
  `).join('')
}

// Function to generate playlists HTML
const generatePlaylists = (playlists: any[]) => {
  return playlists.map(playlist => `
    <div class="podcast-playlist-card">
      <div class="playlist-thumbnails">
        ${playlist.thumbnails.map((thumb: string) => `
          <img src="${thumb}" alt="" class="playlist-thumb" />
        `).join('')}
      </div>
      <div class="playlist-info">
        <h3 class="playlist-title">${playlist.title}</h3>
        <p class="playlist-creator">${playlist.creator}</p>
        <div class="playlist-platform">
          <i data-lucide="music" class="platform-icon" aria-hidden="true"></i>
          <span>${playlist.platform}</span>
        </div>
      </div>
      <a href="${playlist.link}" target="_blank" class="podcast-play-button">
        Play
      </a>
    </div>
  `).join('')
}

// Function to generate podcast appearances HTML
const generatePodcastAppearances = (appearances: any[]) => {
  return appearances.map(podcast => `
    <div class="podcast-appearance-card">
      <div class="podcast-thumbnail-container">
        <img src="${podcast.thumbnail}" alt="${podcast.title}" class="podcast-thumbnail" />
        <div class="podcast-play-overlay">
          <i data-lucide="play" class="play-icon" aria-hidden="true"></i>
        </div>
      </div>
      <div class="podcast-info">
        <h3 class="podcast-title">${podcast.title}</h3>
        <p class="podcast-show">${podcast.show}</p>
      </div>
      <button class="podcast-play-button">
        Play
      </button>
    </div>
  `).join('')
}

// Initialize the app
async function initializeApp() {
  const profileImageSrc = await getProfileImageSrc();

  // Create HTML content
  const content = `
    <div>
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <i data-lucide="sun" class="theme-icon sun" aria-hidden="true"></i>
        <i data-lucide="moon" class="theme-icon moon" aria-hidden="true"></i>
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
      </div>

      <!-- My Playlists Section -->
      <div class="podcast-section">
        <h2 class="podcast-section-title">my playlists</h2>
        ${generatePlaylists(podcastsData.playlists)}
      </div>

      <!-- Podcast Appearances Section -->
      <div class="podcast-section">
        <h2 class="podcast-section-title">podcast appearances</h2>
        <div class="podcast-appearances-grid">
          ${generatePodcastAppearances(podcastsData.appearances)}
        </div>
      </div>

      <div class="divider">
        <i data-lucide="hard-hat" class="divider-icon" aria-hidden="true"></i>
      </div>

      <footer class="tech-stack">
        <div class="tech-stack-header">
          <p class="love-note">
            <i data-lucide="heart" class="tech-icon" aria-hidden="true"></i>
            Like this podcast page?
          </p>
          <button class="expand-button" aria-label="Show tech stack details">
            <i data-lucide="chevron-down" class="tech-icon" aria-hidden="true"></i>
          </button>
        </div>
        <div class="tech-stack-details">
          <p class="text-xs">
            <i data-lucide="code" class="tech-icon" aria-hidden="true"></i>
            Beta podcast prototype - Built in 2025
          </p>
          <ul>
            <li>
              <i data-lucide="arrow-left" class="tech-icon" aria-hidden="true"></i>
              <a href="/" target="_blank">Back to main page <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  `

  // Add content to DOM
  document.querySelector('#app')!.innerHTML = content

  // Re-initialize icons
  try {
    lucide.createIcons({
      icons: lucide.icons
    })
  } catch (error) {
    console.error('Error re-initializing icons:', error)
  }

  // Add theme toggle functionality
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  // Add expand button functionality
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

  // Add play button handlers (placeholder for now)
  const playButtons = document.querySelectorAll('.podcast-play-button');
  playButtons.forEach(button => {
    button.addEventListener('click', (e: Event) => {
      e.preventDefault();
      alert('Audio playback would start here!');
    });
  });
}

// Initialize the app
initializeApp();
