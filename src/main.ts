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
      <i data-lucide="${link.icon}" class="social-icon" aria-hidden="true"></i>
    </a>
  `).join('')
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
      <span class="text-xs text-gray-400 font-medium block mb-2">Filter by year:</span>
      <div class="flex gap-1.5 items-center flex-wrap">
        <button class="wipfli-filter inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-semibold border-2 border-red-400 text-red-400 bg-transparent hover:bg-red-400/10 transition-colors" data-filter="wipfli">
          <i data-lucide="eye-off" class="w-3 h-3" aria-hidden="true"></i>
          Wipfli
        </button>
        ${filterYears.map(filter => `
          <button class="year-filter inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-gray-600 text-white hover:bg-blue-600 transition-colors" data-year="${filter.value}">
            ${filter.label}
          </button>
        `).join('')}
      </div>
    </div>
  `;
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
        <a href="${pub.url}" target="_blank" class="absolute bottom-2 right-2 inline-flex items-center justify-center w-7 h-7 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 hover:-translate-y-0.5 hover:shadow-lg">
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
      ${generateRegularLinks(linksData.regularLinks)}
    </div>
    ${isFeatureEnabled('publications') ? `
    <div class="mt-4 mb-8 p-3 border-t border-white/20 bg-gray-800/50 text-white rounded-xl shadow-lg">
      <div class="flex justify-between items-center gap-4 mb-0">
        <div class="flex items-center gap-3">
          <i data-lucide="newspaper" class="w-5 h-5 text-blue-400" aria-hidden="true"></i>
          <h2 class="text-lg font-semibold">Publications and Media</h2>
        </div>
        <button class="publications-expand-button flex items-center justify-center p-2 hover:bg-white/10 rounded-md transition-all duration-200" aria-label="Show publications and media details">
          <i data-lucide="chevron-down" class="w-5 h-5 text-blue-400 transition-transform duration-300" aria-hidden="true"></i>
        </button>
      </div>
      <div class="publications-details max-h-0 overflow-hidden opacity-0 transition-all duration-300">
        <div class="pt-3">
          ${generateYearFilters(publicationsData.publications)}
          <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5">
            ${generatePublications(publicationsData.publications)}
          </div>
        </div>
      </div>
    </div>
    ` : '<!-- Publications section disabled via feature flag -->'}
    <div class="divider">
      <i data-lucide="hard-hat" class="divider-icon" aria-hidden="true"></i>
    </div>
    <footer class="tech-stack">
      <div class="tech-stack-header">
        <p class="love-note">
          <i data-lucide="heart" class="tech-icon" aria-hidden="true"></i>
          Like this contact info page?
        </p>
        <button class="expand-button" aria-label="Show tech stack details">
          <i data-lucide="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </button>
      </div>
      <div class="tech-stack-details">
        <p class="text-xs">
          <i data-lucide="code" class="tech-icon" aria-hidden="true"></i>
          Built with a bespoke software stack in 2025
        </p>
        <ul>
          <li>
            <i data-lucide="layout-template" class="tech-icon" aria-hidden="true"></i>
            Boilerplate & Prototype: <a href="https://bolt.new/?rid=qsz5nv" target="_blank">bolt.new <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="boxes" class="tech-icon" aria-hidden="true"></i>
            Codebase: <span class="tech-pill">React</span> + <span class="tech-pill">Vite</span>
          </li>
          <li>
            <i data-lucide="cloud" class="tech-icon" aria-hidden="true"></i>
            Hosting: <span class="tech-pill">Vercel</span> + <span class="tech-pill">GoDaddy</span>
          </li>
        </ul>
        <a href="https://github.com/rcrades/link-in-bio-ryan" target="_blank" class="github-link">
          <i data-lucide="github" class="tech-icon" aria-hidden="true"></i>
          rcrades <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
    <!-- Favorite Apps Accordion: Start -->
    <footer class="tech-stack favorite-apps">
      <div class="tech-stack-header">
        <p class="love-note">
          <i data-lucide="star" class="tech-icon" aria-hidden="true"></i>
          My favorite apps in 2025
        </p>
        <button class="expand-button" aria-label="Show favorite apps details">
          <i data-lucide="chevron-down" class="tech-icon" aria-hidden="true"></i>
        </button>
      </div>
      <div class="tech-stack-details">
        <ul>
          <li>
            <i data-lucide="presentation" class="tech-icon" aria-hidden="true"></i>
            AI Slide Deck Creator: <a href="https://gamma.app/signup?r=3kue3y24828ihup" target="_blank">gamma.app <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="layout-template" class="tech-icon" aria-hidden="true"></i>
            AI Code Gen: <a href="https://bolt.new/?rid=qsz5nv" target="_blank">bolt.new <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="sparkles" class="tech-icon" aria-hidden="true"></i>
            4-months free - Google Gemini Pro: <a href="https://g.co/g1referral/K57Z7QMV" target="_blank">Google AI Pro <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="gift" class="tech-icon" aria-hidden="true"></i>
            Win four months of Claude Max: <a href="https://claude.ai/referral/AmO81PvUJQ" target="_blank">Enter here <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
          </li>
          <li>
            <i data-lucide="layout-template" class="tech-icon" aria-hidden="true"></i>
            Quickbooks Online: <a href="https://quickbooks.partnerlinks.io/ryanrademann" target="_blank">QBO Signup <i data-lucide="arrow-up-right" class="tech-icon" aria-hidden="true"></i></a>
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

  // Add click handler for publications section
  const publicationsButton = document.querySelector('.publications-expand-button');
  const publicationsDetails = document.querySelector('.publications-details');
  
  if (publicationsButton && publicationsDetails) {
    publicationsButton.addEventListener('click', (e: Event) => {
      const button = e.currentTarget as HTMLButtonElement;
      const chevron = button.querySelector('i');
      const isExpanded = publicationsDetails.classList.contains('max-h-0');
      
      if (isExpanded) {
        // Expand
        publicationsDetails.classList.remove('max-h-0', 'opacity-0');
        publicationsDetails.classList.add('max-h-[2000px]', 'opacity-100');
        chevron?.classList.add('rotate-180');
        button.setAttribute('aria-expanded', 'true');
      } else {
        // Collapse
        publicationsDetails.classList.add('max-h-0', 'opacity-0');
        publicationsDetails.classList.remove('max-h-[2000px]', 'opacity-100');
        chevron?.classList.remove('rotate-180');
        button.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Add filter functionality
  const yearFilters = document.querySelectorAll('.year-filter');
  const wipfliFilter = document.querySelector('.wipfli-filter') as HTMLButtonElement;
  const publicationItems = document.querySelectorAll('.publication-item');
  let activeYearFilter: HTMLButtonElement | null = null;
  let wipfliHidden = true; // Hide Wipfli by default
  
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
    wipfliFilter.addEventListener('click', (e: Event) => {
      wipfliHidden = !wipfliHidden;
      const button = e.currentTarget as HTMLButtonElement;
      const icon = button.querySelector('i');
      
      if (wipfliHidden) {
        // Hidden state - red border, eye-off icon
        button.classList.remove('border-gray-400', 'text-gray-400');
        button.classList.add('border-red-400', 'text-red-400');
        icon?.setAttribute('data-lucide', 'eye-off');
      } else {
        // Visible state - gray border, eye icon
        button.classList.remove('border-red-400', 'text-red-400');
        button.classList.add('border-gray-400', 'text-gray-400');
        icon?.setAttribute('data-lucide', 'eye');
      }
      
      // Re-initialize icons after changing icon names
      lucide.createIcons({
        icons: lucide.icons
      });
      
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
        activeYearFilter.classList.remove('bg-blue-600');
        activeYearFilter.classList.add('bg-gray-600');
        activeYearFilter = null;
      } else {
        // Deactivate previous filter
        if (activeYearFilter) {
          activeYearFilter.classList.remove('bg-blue-600');
          activeYearFilter.classList.add('bg-gray-600');
        }
        
        // Activate new filter
        clickedFilter.classList.add('bg-blue-600');
        clickedFilter.classList.remove('bg-gray-600');
        activeYearFilter = clickedFilter;
      }
      
      applyFilters();
    });
  });
}

// Initialize the app
initializeApp();