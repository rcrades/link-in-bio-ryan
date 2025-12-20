// Feature Flags Configuration
const FEATURE_FLAGS = {
  publications: true  // Set to false to disable publications section
};

// Feature flag helper
const isFeatureEnabled = (feature: keyof typeof FEATURE_FLAGS) => {
  return FEATURE_FLAGS[feature];
};

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
import causesData from './data/causes.json'
import activityData from './data/activity.json'
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
  return socialLinks.map(link => {
    // Use custom SVG for X icon
    if (link.icon === 'x') {
      return `
        <a href="${link.link}" class="social-card" target="_blank">
          <img src="/logos/logo.svg" alt="X (Twitter)" class="social-icon x-logo" />
        </a>
      `
    }
    // Use custom images for LinkedIn icon (black for light mode, white for dark mode)
    if (link.icon === 'linkedin') {
      return `
        <a href="${link.link}" class="social-card" target="_blank">
          <img src="/logos/InBug-Black.png" alt="LinkedIn" class="social-icon linkedin-logo linkedin-light" />
          <img src="/logos/InBug-White.png" alt="LinkedIn" class="social-icon linkedin-logo linkedin-dark" />
        </a>
      `
    }
    // Use custom SVG for v0 icon
    if (link.icon === 'v0') {
      return `
        <a href="${link.link}" class="social-card" target="_blank">
          <img src="/logos/v0-logo-dark.svg" alt="v0" class="social-icon v0-logo" />
        </a>
      `
    }
    return `
      <a href="${link.link}" class="social-card" target="_blank">
        <i data-lucide="${link.icon}" class="social-icon" aria-hidden="true"></i>
      </a>
    `
  }).join('')
}

// Function to generate regular links HTML
const generateRegularLinks = (regularLinks: any[]) => {
  return regularLinks.map(link => `
    <a href="${link.link}" class="link-card" target="_blank">
      <h2>${link.header}</h2>
      <i data-lucide="${link.icon}" class="link-icon" aria-hidden="true"></i>
      <p>${link.description}</p>
    </a>
  `).join('')
}

// Function to generate year filter pills
const generateYearFilters = (publications: any[]) => {
  const years = [...new Set(publications.map(pub => new Date(pub.date).getFullYear()))].sort((a, b) => b - a);
  
  // Group years: keep 2022 and later separate, combine 2021 and earlier
  const filterYears: { label: string; value: string }[] = [];
  years.forEach(year => {
    if (year >= 2022) {
      filterYears.push({ label: year.toString(), value: year.toString() });
    } else if (!filterYears.find(f => f.value === '2021-prior')) {
      filterYears.push({ label: '2021 & Prior', value: '2021-prior' });
    }
  });
  
  return `
    <div class="mb-4">
      <div class="flex gap-4 items-center mb-3 flex-wrap">
        <div class="wipfli-toggle-container">
          <button class="wipfli-toggle" data-filter="wipfli">
            <span class="wipfli-toggle-label">Show Wipfli Publications</span>
            <div class="wipfli-toggle-switch">
              <div class="wipfli-toggle-slider"></div>
            </div>
          </button>
        </div>
      </div>
      <div class="flex gap-1.5 items-center flex-wrap">
        ${filterYears.map(filter => `
          <button class="year-filter inline-flex items-center px-2 py-1 rounded text-xs font-semibold transition-colors" data-year="${filter.value}">
            ${filter.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// Function to generate recent activity HTML
const generateRecentActivity = (activities: any[]) => {
  if (!activities || activities.length === 0) return '';

  return activities.map(activity => {
    const thumbnailUrl = activity.thumbnailId
      ? `https://img.youtube.com/vi/${activity.thumbnailId}/mqdefault.jpg`
      : '';

    const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    // For articles, use logo if available, otherwise icon placeholder
    const isArticle = activity.type === 'article';
    let mediaElement = '';
    if (thumbnailUrl) {
      mediaElement = `<img src="${thumbnailUrl}" alt="${activity.title}" class="activity-thumbnail" />`;
    } else if (activity.logo) {
      mediaElement = `<div class="activity-logo-placeholder"><img src="${activity.logo}" alt="${activity.description}" class="activity-logo" /></div>`;
    } else if (isArticle) {
      mediaElement = `<div class="activity-icon-placeholder"><i data-lucide="newspaper" class="activity-placeholder-icon" aria-hidden="true"></i></div>`;
    }

    return `
      <a href="${activity.url}" class="activity-item ${isArticle ? 'activity-item-article' : ''}" target="_blank">
        ${mediaElement}
        <div class="activity-content">
          <h3 class="activity-title">${activity.title}</h3>
          <p class="activity-description">${activity.description}</p>
          <span class="activity-date">${formattedDate}</span>
        </div>
        <i data-lucide="arrow-up-right" class="activity-external-icon" aria-hidden="true"></i>
      </a>
    `;
  }).join('');
}

// Function to generate causes HTML
const generateCauses = (causes: any[]) => {
  return causes.map(cause => `
    <a href="${cause.url}" class="cause-card" target="_blank">
      <div class="cause-icon-wrapper">
        <img src="${cause.logo}" alt="${cause.name} logo" class="cause-logo" />
      </div>
      <div class="cause-content">
        <h3 class="cause-name">${cause.name}</h3>
        <p class="cause-description">${cause.description}</p>
      </div>
      <i data-lucide="arrow-up-right" class="cause-link-icon" aria-hidden="true"></i>
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
    
    // Color mapping for publication types
    const typeColors = {
      article: 'border-emerald-400 text-emerald-400',
      video: 'border-purple-400 text-purple-400',
      interview: 'border-orange-400 text-orange-400'
    };
    
    const typeColorClass = typeColors[pub.type as keyof typeof typeColors] || 'border-gray-400 text-gray-400';
    
    return `
      <div class="publication-item p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/8 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md flex flex-col min-h-[140px] justify-self-start w-full relative" data-year="${year}" data-source="${pub.source.toLowerCase()}">
        <div class="flex-1 pb-10 text-left">
          <h4 class="text-sm font-semibold leading-tight mb-1.5 text-white text-left">${pub.title}</h4>
          <p class="text-xs text-gray-400 font-medium text-left">${pub.source}</p>
        </div>
        <div class="absolute bottom-2 left-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border-2 ${typeColorClass} bg-transparent">
            <i data-lucide="${typeIcon}" class="w-3 h-3" aria-hidden="true"></i>
            ${pub.type === 'interview' ? 'video interview' : pub.type}
          </span>
        </div>
        <a href="${pub.url}" target="_blank" class="publication-link-btn absolute bottom-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded transition-all duration-200">
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5" aria-hidden="true"></i>
        </a>
      </div>
    `;
  }).join('')
}

// Initialize the app
async function initializeApp() {
  const profileImageSrc = await getProfileImageSrc();
  
  // Create HTML content
  const content = `
    <div>
      <!-- Theme toggle - positioned via CSS (top-right on desktop, bottom on mobile) -->
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <i data-lucide="sun" class="theme-icon sun" aria-hidden="true"></i>
        <i data-lucide="moon" class="theme-icon moon" aria-hidden="true"></i>
      </button>

      <!-- Profile section - compact on mobile (side by side), horizontal on desktop -->
      <div class="profile">
        <img src="${profileImageSrc}" alt="Ryan Rademann" />
        <div class="profile-text">
          <h1>Ryan Rademann</h1>
          <p>Technology Consultant at Wipfli</p>
          <p class="location">
            <i data-lucide="map-pin" class="location-icon" aria-hidden="true"></i>
            Chicago, IL
          </p>
        </div>
      </div>

      <!-- Mobile-only: Social links row -->
      <div class="mobile-social-links">
        ${generateSocialLinks(linksData.socialLinks)}
      </div>

      <!-- Mobile-only: Schedule a Meeting button (prominent CTA) -->
      <div class="mobile-cta">
        <a href="${linksData.regularLinks.find(l => l.header === 'Schedule a Meeting')?.link || '#'}" class="mobile-cta-button" target="_blank">
          <i data-lucide="calendar" class="mobile-cta-icon" aria-hidden="true"></i>
          <span>Schedule a Meeting</span>
        </a>
      </div>

      <!-- Mobile-only: Recent Activity -->
      <div class="mobile-recent-activity">
        <div class="recent-activity-header">
          <i data-lucide="activity" class="recent-activity-header-icon" aria-hidden="true"></i>
          <h2>Recent Activity</h2>
        </div>
        <div class="recent-activity">
          ${generateRecentActivity(activityData.activities)}
        </div>
      </div>

      <!-- Mobile-only: Rest of the links (excluding Schedule a Meeting) -->
      <div class="mobile-links-container">
        ${generateRegularLinks(linksData.regularLinks.filter(l => l.header !== 'Schedule a Meeting'))}
      </div>

    <!-- Desktop grid layout -->
    <div class="desktop-grid">
      <div class="grid-header-left">
        <div class="social-links">
          ${generateSocialLinks(linksData.socialLinks)}
        </div>
      </div>
      <div class="grid-header-right">
        <div class="recent-activity-header">
          <i data-lucide="activity" class="recent-activity-header-icon" aria-hidden="true"></i>
          <h2>Recent Activity</h2>
        </div>
      </div>
      <div class="grid-content-left">
        <div class="links-container">
          ${generateRegularLinks(linksData.regularLinks)}
        </div>
      </div>
      <div class="grid-content-right">
        <div class="recent-activity">
          ${generateRecentActivity(activityData.activities)}
        </div>
      </div>
    </div>
    ${isFeatureEnabled('publications') ? `
    <div class="mt-4 mb-8 p-3 border-t border-white/20 bg-gray-800/50 text-white rounded-xl shadow-lg">
      <div class="expandable-header-row publications-header-row flex justify-between items-center gap-4 mb-0" role="button" tabindex="0" aria-expanded="false" aria-controls="publications-details">
        <div class="publications-header">
          <i data-lucide="newspaper" class="publications-header-icon" aria-hidden="true"></i>
          <h2>Publications and Media</h2>
        </div>
        <span class="expand-indicator flex items-center justify-center p-2">
          <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300" aria-hidden="true"></i>
        </span>
      </div>
      <div id="publications-details" class="publications-details max-h-0 overflow-hidden opacity-0 transition-all duration-300">
        <div class="pt-3">
          ${generateYearFilters(publicationsData.publications)}
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
            ${generatePublications(publicationsData.publications)}
          </div>
        </div>
      </div>
    </div>
    ` : '<!-- Publications section disabled via feature flag -->'}
    <div class="causes-section">
      <div class="expandable-header-row flex justify-between items-center gap-4 mb-0" role="button" tabindex="0" aria-expanded="false" aria-controls="causes-details">
        <div class="causes-header">
          <i data-lucide="heart" class="causes-header-icon" aria-hidden="true"></i>
          <h2>Community Involvement</h2>
        </div>
        <span class="expand-indicator flex items-center justify-center p-2">
          <i data-lucide="chevron-down" class="w-5 h-5 transition-transform duration-300" aria-hidden="true"></i>
        </span>
      </div>
      <div id="causes-details" class="causes-details max-h-0 overflow-hidden opacity-0 transition-all duration-300">
        <div class="pt-3">
          <div class="causes-grid">
            ${generateCauses(causesData.causes)}
          </div>
        </div>
      </div>
    </div>
    <div class="divider">
      <i data-lucide="hard-hat" class="divider-icon" aria-hidden="true"></i>
    </div>
    <footer class="tech-stack">
      <div class="tech-stack-header">
        <p class="love-note">
          <i data-lucide="heart" class="tech-icon" aria-hidden="true"></i>
          Like this contact info page?
        </p>
      </div>
      <div class="tech-stack-buttons">
        <a href="https://v0.link/ryan-rademann" target="_blank" class="create-your-own-btn">
          <i data-lucide="sparkles" class="btn-icon" aria-hidden="true"></i>
          Create your own with v0
          <i data-lucide="arrow-up-right" class="btn-icon-external" aria-hidden="true"></i>
        </a>
        <button id="show-tech-stack-btn" class="show-tech-stack-btn">
          Show me this thing's tech stack
        </button>
      </div>
    </footer>

    <!-- Tech Stack Modal Overlay -->
    <div id="tech-stack-modal" class="tech-stack-modal" aria-hidden="true">
      <div class="tech-stack-modal-backdrop"></div>
      <div class="tech-stack-modal-content">
        <button id="close-tech-stack-modal" class="tech-stack-modal-close" aria-label="Close">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
        <h2 class="tech-stack-modal-title">
          <i data-lucide="code" class="tech-icon" aria-hidden="true"></i>
          Tech Stack
        </h2>
        <p class="tech-stack-modal-subtitle">Built with a bespoke software stack in 2025</p>
        <ul class="tech-stack-modal-list">
          <li>
            <i data-lucide="layout-template" class="tech-icon" aria-hidden="true"></i>
            <span>Boilerplate & Prototype:</span>
            <a href="https://v0.link/ryan-rademann" target="_blank">v0.app <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="boxes" class="tech-icon" aria-hidden="true"></i>
            <span>Front End:</span>
            <span class="tech-pill">React</span> + <span class="tech-pill">Vite</span>
          </li>
          <li>
            <i data-lucide="database" class="tech-icon" aria-hidden="true"></i>
            <span>Back End:</span>
            <a href="https://convex.dev/referral/RCRADE2932" target="_blank">Convex <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="cloud" class="tech-icon" aria-hidden="true"></i>
            <span>Hosting:</span>
            <span class="tech-pill">Vercel</span>
          </li>
        </ul>
        <a href="https://github.com/rcrades/link-in-bio-ryan" target="_blank" class="github-link">
          <i data-lucide="github" class="tech-icon" aria-hidden="true"></i>
          View on GitHub
          <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <!-- Favorite Apps Accordion: Start -->
    <footer class="tech-stack favorite-apps">
      <div class="tech-stack-header expandable-header-row" role="button" tabindex="0" aria-expanded="false" aria-controls="tech-stack-details-2">
        <p class="love-note">
          <i data-lucide="star" class="tech-icon" aria-hidden="true"></i>
          My favorite apps in 2025
        </p>
        <span class="expand-indicator">
          <i data-lucide="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </span>
      </div>
      <div id="tech-stack-details-2" class="tech-stack-details">
        <ul>
          <li>
            <i data-lucide="layout-template" class="tech-icon" aria-hidden="true"></i>
            AI Code Gen: <a href="https://v0.link/ryan-rademann" target="_blank">v0.app <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
            <!-- Previous referral link: bolt.new/?rid=qsz5nv -->
          </li>
          <li>
            <i data-lucide="database" class="tech-icon" aria-hidden="true"></i>
            Easy backend for vibe-coded apps: <a href="https://convex.dev/referral/RCRADE2932" target="_blank">Convex <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="presentation" class="tech-icon" aria-hidden="true"></i>
            AI Slide Deck Creator: <a href="https://gamma.app/signup?r=3kue3y24828ihup" target="_blank">gamma.app <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="briefcase" class="tech-icon" aria-hidden="true"></i>
            Quickbooks Online: <a href="https://quickbooks.partnerlinks.io/ryanrademann" target="_blank">QBO Signup <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </footer>
    <!-- Favorite Apps Accordion: End -->

    <!-- Mobile-only: Theme toggle at bottom -->
    <div class="mobile-theme-toggle">
      <button id="theme-toggle-mobile" class="theme-toggle-bottom" aria-label="Toggle theme">
        <i data-lucide="sun" class="theme-icon sun" aria-hidden="true"></i>
        <i data-lucide="moon" class="theme-icon moon" aria-hidden="true"></i>
        <span class="theme-label">Switch Theme</span>
      </button>
    </div>
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

  // Add theme toggle functionality (both desktop and mobile buttons)
  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });
  document.getElementById('theme-toggle-mobile')?.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  // Tech Stack Modal functionality
  const techStackModal = document.getElementById('tech-stack-modal');
  const showTechStackBtn = document.getElementById('show-tech-stack-btn');
  const closeTechStackBtn = document.getElementById('close-tech-stack-modal');
  const modalBackdrop = techStackModal?.querySelector('.tech-stack-modal-backdrop');

  const openModal = () => {
    if (techStackModal) {
      techStackModal.classList.add('open');
      techStackModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Re-initialize icons in modal
      lucide.createIcons({ icons: lucide.icons });
    }
  };

  const closeModal = () => {
    if (techStackModal) {
      techStackModal.classList.remove('open');
      techStackModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  showTechStackBtn?.addEventListener('click', openModal);
  closeTechStackBtn?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && techStackModal?.classList.contains('open')) {
      closeModal();
    }
  });

  // Add click handlers for all expandable sections (entire header row clickable on desktop)
  const expandableHeaders = document.querySelectorAll('.expandable-header-row');

  expandableHeaders.forEach((header) => {
    const toggleExpand = () => {
      const controlsId = header.getAttribute('aria-controls');
      const details = controlsId ? document.getElementById(controlsId) : null;
      const chevron = header.querySelector('.expand-indicator i');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      if (details) {
        // Check if this is a max-h style section (publications, causes) or toggle class style (tech-stack)
        if (details.classList.contains('max-h-0') || details.classList.contains('max-h-[2000px]')) {
          if (!isExpanded) {
            // Expand
            details.classList.remove('max-h-0', 'opacity-0');
            details.classList.add('max-h-[2000px]', 'opacity-100');
          } else {
            // Collapse
            details.classList.add('max-h-0', 'opacity-0');
            details.classList.remove('max-h-[2000px]', 'opacity-100');
          }
        } else {
          // Toggle expanded class for tech-stack style
          details.classList.toggle('expanded');
        }
      }

      // Update aria-expanded and rotate chevron
      header.setAttribute('aria-expanded', (!isExpanded).toString());
      if (chevron) {
        if (!isExpanded) {
          chevron.classList.add('rotate-180');
        } else {
          chevron.classList.remove('rotate-180');
        }
      }
    };

    // Click handler
    header.addEventListener('click', toggleExpand);

    // Keyboard handler for accessibility
    header.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
        e.preventDefault();
        toggleExpand();
      }
    });
  });

  // Add filter functionality
  const yearFilters = document.querySelectorAll('.year-filter');
  const wipfliFilter = document.querySelector('.wipfli-toggle') as HTMLButtonElement;
  const publicationItems = document.querySelectorAll('.publication-item');
  let activeYearFilter: HTMLButtonElement | null = null;
  let wipfliHidden = true; // Hide Wipfli by default

  // Count Wipfli publications
  const wipfliCount = Array.from(publicationItems).filter(item => {
    const source = item.getAttribute('data-source') || '';
    return source.includes('wipfli');
  }).length;
  
  // Apply initial Wipfli filter (hide by default)
  const applyFilters = () => {
    publicationItems.forEach(item => {
      const itemYear = parseInt(item.getAttribute('data-year') || '0');
      const itemSource = item.getAttribute('data-source') || '';
      const isWipfli = itemSource.includes('wipfli');
      
      let shouldShow = true;
      
      // Apply Wipfli filter
      if (wipfliHidden && isWipfli) {
        shouldShow = false;
      }
      
      // Apply year filter if active
      if (activeYearFilter && shouldShow) {
        const selectedYear = activeYearFilter.getAttribute('data-year');
        if (selectedYear === '2021-prior') {
          shouldShow = itemYear <= 2021;
        } else {
          shouldShow = itemYear.toString() === selectedYear;
        }
      }
      
      (item as HTMLElement).style.display = shouldShow ? 'flex' : 'none';
    });
  };
  
  // Apply initial filters
  applyFilters();
  
  // Wipfli filter toggle
  if (wipfliFilter) {
    // Set initial label with count
    const label = wipfliFilter.querySelector('.wipfli-toggle-label');
    if (label) label.textContent = `Show Wipfli Publications (${wipfliCount})`;

    wipfliFilter.addEventListener('click', (e: Event) => {
      wipfliHidden = !wipfliHidden;
      const button = e.currentTarget as HTMLButtonElement;
      const label = button.querySelector('.wipfli-toggle-label');

      if (wipfliHidden) {
        // Hidden state - show "Show Wipfli Publications"
        button.classList.remove('active');
        if (label) label.textContent = `Show Wipfli Publications (${wipfliCount})`;
      } else {
        // Visible state - show "Hide Wipfli Publications"
        button.classList.add('active');
        if (label) label.textContent = `Hide Wipfli Publications (${wipfliCount})`;
      }

      applyFilters();
    });
  }
  
  // Year filter functionality
  yearFilters.forEach(filter => {
    filter.addEventListener('click', (e: Event) => {
      const clickedFilter = e.currentTarget as HTMLButtonElement;
      
      // Toggle behavior: if clicking the same filter, deactivate it
      if (activeYearFilter === clickedFilter) {
        // Deactivate current filter
        activeYearFilter.classList.remove('active-filter');
        activeYearFilter = null;
      } else {
        // Deactivate previous filter
        if (activeYearFilter) {
          activeYearFilter.classList.remove('active-filter');
        }

        // Activate new filter
        clickedFilter.classList.add('active-filter');
        activeYearFilter = clickedFilter;
      }
      
      applyFilters();
    });
  });
}

// Initialize the app
initializeApp();