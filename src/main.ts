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
import { inject } from '@vercel/analytics'
import linksData from './data/links.json'
import publicationsData from './data/publications.json'
import causesData from './data/causes.json'
import activityData from './data/activity.json'
import { getProfileImageSrc } from './utils/profileImage'

// Initialize Vercel Analytics
inject()

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
        <a href="${link.link}" class="social-card flex-1 flex items-center justify-center p-5 rounded-xl relative overflow-hidden bg-card text-primary border border-card-border" target="_blank">
          <img src="/logos/logo.svg" alt="X (Twitter)" class="social-icon x-logo" />
        </a>
      `
    }
    // Use custom images for LinkedIn icon (black for light mode, white for dark mode)
    if (link.icon === 'linkedin') {
      return `
        <a href="${link.link}" class="social-card flex-1 flex items-center justify-center p-5 rounded-xl relative overflow-hidden bg-card text-primary border border-card-border" target="_blank">
          <img src="/logos/InBug-Black.png" alt="LinkedIn" class="social-icon linkedin-logo linkedin-light" />
          <img src="/logos/InBug-White.png" alt="LinkedIn" class="social-icon linkedin-logo linkedin-dark" />
        </a>
      `
    }
    // Use custom SVG for v0 icon
    if (link.icon === 'v0') {
      return `
        <a href="${link.link}" class="social-card flex-1 flex items-center justify-center p-5 rounded-xl relative overflow-hidden bg-card text-primary border border-card-border" target="_blank">
          <img src="/logos/v0-logo-dark.svg" alt="v0" class="social-icon v0-logo" />
        </a>
      `
    }
    return `
      <a href="${link.link}" class="social-card flex-1 flex items-center justify-center p-5 rounded-xl relative overflow-hidden bg-card text-primary border border-card-border" target="_blank">
        <i data-lucide="${link.icon}" class="social-icon" aria-hidden="true"></i>
      </a>
    `
  }).join('')
}

// Function to generate regular links HTML
const generateRegularLinks = (regularLinks: any[]) => {
  return regularLinks.map(link => `
    <a href="${link.link}" class="link-card group block relative w-full py-7 px-6 mb-5 min-h-[110px] rounded-2xl overflow-hidden no-underline cursor-pointer bg-card text-card-foreground border border-card-border border-l-4 border-l-primary shadow-card transition-all duration-400 ease-bounce-in hover:translate-x-2 hover:-translate-y-1 hover:shadow-card-hover hover:border-l-[6px]" target="_blank">
      <h2 class="m-0 text-xl font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis pr-12 relative z-10">${link.header}</h2>
      <i data-lucide="${link.icon}" class="link-icon absolute top-7 right-6 w-6 h-6 opacity-50 text-primary z-10 transition-all duration-400 ease-bounce-in group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-[5deg] group-hover:text-primary-dark" aria-hidden="true"></i>
      <p class="mt-2 mb-0 text-sm opacity-85 font-normal pr-12 leading-relaxed h-12 block text-left overflow-hidden text-foreground-muted relative z-10">${link.description}</p>
    </a>
  `).join('')
}

// Publication type metadata — mirrors the per-card pill colors in generatePublications
const PUBLICATION_TYPES: Record<string, { label: string; icon: string }> = {
  article: { label: 'Article', icon: 'file-text' },
  video: { label: 'Video', icon: 'video' },
  interview: { label: 'Video Interview', icon: 'tv' }
};

// Function to generate publication filter pills (year + format chips + Wipfli toggle)
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

  // Format (type) chips — only types present in the data
  const presentTypes = [...new Set(publications.map(p => p.type))];
  const typeCounts = publications.reduce((acc: Record<string, number>, p) => {
    acc[p.type] = (acc[p.type] || 0) + 1;
    return acc;
  }, {});
  const showTypeChips = presentTypes.length >= 2;

  return `
    <div class="mb-4">
      <div class="flex gap-4 items-center mb-3 flex-wrap">
        <div class="wipfli-toggle-container">
          <button class="wipfli-toggle" data-filter="wipfli">
            <span class="wipfli-toggle-label">Show Wipfli Media</span>
            <div class="wipfli-toggle-switch">
              <div class="wipfli-toggle-slider"></div>
            </div>
          </button>
        </div>
      </div>
      ${showTypeChips ? `
        <div class="flex gap-1.5 items-center flex-wrap mb-2">
          <button class="publication-type-filter activity-chip active-filter inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors" data-publication-type="all">
            All (${publications.length})
          </button>
          ${presentTypes.map(type => {
            const meta = PUBLICATION_TYPES[type] || { label: type, icon: 'file' };
            return `
              <button class="publication-type-filter activity-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors" data-publication-type="${type}">
                <i data-lucide="${meta.icon}" class="w-3 h-3" aria-hidden="true"></i>
                ${meta.label} (${typeCounts[type]})
              </button>
            `;
          }).join('')}
        </div>
      ` : ''}
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

// Activity type metadata — icon, label, and pill color for each format
const ACTIVITY_TYPES: Record<string, { label: string; icon: string; colorClass: string }> = {
  'in-person': { label: 'In-Person', icon: 'mic', colorClass: 'border-amber-400 text-amber-400' },
  'article': { label: 'Article', icon: 'newspaper', colorClass: 'border-emerald-400 text-emerald-400' },
  'video': { label: 'Video', icon: 'video', colorClass: 'border-purple-400 text-purple-400' }
};

const getActivityTypeMeta = (type: string) =>
  ACTIVITY_TYPES[type] || { label: type, icon: 'circle', colorClass: 'border-gray-400 text-gray-400' };

// Function to generate activity type filter chips
const generateActivityFilters = (activities: any[], scopeId: string) => {
  const types = [...new Set(activities.map(a => a.type))];
  if (types.length < 2) return '';

  const counts = activities.reduce((acc: Record<string, number>, a) => {
    acc[a.type] = (acc[a.type] || 0) + 1;
    return acc;
  }, {});

  return `
    <div class="activity-filter-chips flex gap-1.5 flex-wrap mb-3" data-activity-filter-scope="${scopeId}">
      <button class="activity-chip active-filter inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors" data-activity-type="all">
        All (${activities.length})
      </button>
      ${types.map(type => {
        const meta = getActivityTypeMeta(type);
        return `
          <button class="activity-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors" data-activity-type="${type}">
            <i data-lucide="${meta.icon}" class="w-3 h-3" aria-hidden="true"></i>
            ${meta.label} (${counts[type]})
          </button>
        `;
      }).join('')}
    </div>
  `;
};

// Function to generate recent activity HTML
const generateRecentActivity = (activities: any[]) => {
  if (!activities || activities.length === 0) return '';

  return activities.map(activity => {
    // Support custom thumbnail path or YouTube auto-generated thumbnail
    const thumbnailUrl = activity.thumbnail
      ? activity.thumbnail
      : activity.thumbnailId
        ? `https://img.youtube.com/vi/${activity.thumbnailId}/mqdefault.jpg`
        : '';

    const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    });

    const typeMeta = getActivityTypeMeta(activity.type);
    const isArticle = activity.type === 'article';

    // Media element: thumbnail image, logo wrapper, or type-icon placeholder fallback
    let mediaElement = '';
    if (thumbnailUrl) {
      mediaElement = `<img src="${thumbnailUrl}" alt="${activity.title}" class="activity-thumbnail" />`;
    } else if (activity.logo) {
      const bgClass = activity.logoBg === 'light' ? 'activity-logo-placeholder activity-logo-placeholder-light' : 'activity-logo-placeholder';
      mediaElement = `<div class="${bgClass}"><img src="${activity.logo}" alt="${activity.description}" class="activity-logo" /></div>`;
    } else {
      mediaElement = `<div class="activity-icon-placeholder"><i data-lucide="${typeMeta.icon}" class="activity-placeholder-icon" aria-hidden="true"></i></div>`;
    }

    return `
      <a href="${activity.url}" class="activity-item group flex gap-4 p-4 rounded-xl relative overflow-hidden no-underline mb-4 last:mb-0 bg-background-secondary text-foreground border border-card-border transition-all duration-300 ease-bounce-in hover:-translate-y-1 hover:shadow-strong hover:border-primary ${isArticle ? 'activity-item-article' : ''}" target="_blank" data-activity-type="${activity.type}">
        ${mediaElement}
        <div class="activity-content flex-1 min-w-0 flex flex-col justify-center relative z-10">
          <h3 class="activity-title text-base font-semibold text-foreground m-0 mb-1 leading-tight">${activity.title}</h3>
          <p class="activity-description text-sm text-foreground-muted m-0 leading-snug">${activity.description}</p>
          <div class="flex items-center gap-2 mt-1.5 flex-wrap">
            <span class="activity-type-badge inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6875rem] font-medium border ${typeMeta.colorClass}">
              <i data-lucide="${typeMeta.icon}" class="w-2.5 h-2.5" aria-hidden="true"></i>
              ${typeMeta.label}
            </span>
            <span class="activity-date text-xs text-foreground-muted opacity-70">${formattedDate}</span>
          </div>
        </div>
        <i data-lucide="arrow-up-right" class="activity-external-icon w-4 h-4 text-primary opacity-50 flex-shrink-0 self-start mt-1 transition-all duration-300 ease-bounce-in relative z-10 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true"></i>
      </a>
    `;
  }).join('');
}

// Function to generate causes HTML
const generateCauses = (causes: any[]) => {
  return causes.map(cause => `
    <a href="${cause.url}" class="cause-card group flex items-center gap-4 py-5 px-4 bg-background-secondary border border-card-border rounded-xl no-underline text-card-foreground transition-all duration-400 ease-bounce-in relative overflow-hidden hover:translate-x-1.5 hover:shadow-strong hover:border-primary" target="_blank">
      <div class="cause-icon-wrapper flex items-center justify-center w-12 h-12 bg-card rounded-[10px] border-2 border-card-border flex-shrink-0 transition-all duration-400 ease-bounce-in relative z-10 group-hover:border-primary group-hover:bg-primary group-hover:-rotate-[5deg] group-hover:scale-105">
        <img src="${cause.logo}" alt="${cause.name} logo" class="cause-logo w-8 h-8 object-contain transition-[filter] duration-400" />
      </div>
      <div class="cause-content flex-1 min-w-0 relative z-10">
        <h3 class="cause-name text-lg font-semibold text-foreground m-0 mb-1 tracking-tight">${cause.name}</h3>
        <p class="cause-description text-sm text-foreground-muted m-0 leading-snug">${cause.description}</p>
      </div>
      <i data-lucide="arrow-up-right" class="cause-link-icon w-5 h-5 text-primary opacity-50 flex-shrink-0 relative z-10 transition-all duration-400 ease-bounce-in group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:-rotate-[5deg]" aria-hidden="true"></i>
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
                    pub.type === 'interview' ? 'tv' : 'file';
    
    // Color mapping for publication types
    const typeColors = {
      article: 'border-emerald-400 text-emerald-400',
      video: 'border-purple-400 text-purple-400',
      interview: 'border-orange-400 text-orange-400'
    };
    
    const typeColorClass = typeColors[pub.type as keyof typeof typeColors] || 'border-gray-400 text-gray-400';
    
    return `
      <div class="publication-item p-2 flex flex-col min-h-[140px] justify-self-start w-full" data-year="${year}" data-source="${pub.source.toLowerCase()}" data-type="${pub.type}">
        <div class="flex-1 pb-10 text-left relative z-[1]">
          <h4 class="text-sm font-semibold leading-tight mb-1.5 text-foreground text-left">${pub.title}</h4>
          <p class="text-xs text-foreground-muted font-medium text-left">${pub.source}</p>
        </div>
        <div class="absolute bottom-2 left-2 z-[1]">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border-2 ${typeColorClass}">
            <i data-lucide="${typeIcon}" class="w-3 h-3" aria-hidden="true"></i>
            ${pub.type === 'interview' ? 'video interview' : pub.type}
          </span>
        </div>
        <a href="${pub.url}" target="_blank" class="publication-link-btn absolute bottom-2 right-2 z-[2] inline-flex items-center justify-center w-7 h-7 rounded-md bg-primary text-card transition-all duration-300 ease-bounce-in">
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
      <!-- Theme toggle - desktop only -->
      <button id="theme-toggle" class="theme-toggle hidden desktop:flex absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-card-border bg-card text-primary cursor-pointer p-2 items-center justify-center transition-all duration-400 ease-bounce-in z-10 shadow-soft animate-slide-in-toggle hover:-translate-y-1 hover:shadow-strong hover:border-primary" aria-label="Toggle theme">
        <i data-lucide="sun" class="theme-icon sun w-5 h-5" aria-hidden="true"></i>
        <i data-lucide="moon" class="theme-icon moon w-5 h-5" aria-hidden="true"></i>
      </button>

      <!-- Profile section - horizontal on mobile, larger on desktop -->
      <div class="profile flex items-center gap-4 text-left mb-6 desktop:items-start desktop:gap-7 desktop:mb-10 animate-slide-in-profile">
        <img src="${profileImageSrc}" alt="Ryan Rademann" class="profile-img w-20 h-20 desktop:w-40 desktop:h-40 rounded-full object-cover border-4 border-primary shadow-elevated transition-all duration-400 ease-bounce-in hover:scale-105 flex-shrink-0" />
        <div class="profile-text flex-1 min-w-0 desktop:pt-3">
          <h1 class="font-display text-[1.75rem] desktop:text-5xl font-normal m-0 mb-0.5 leading-tight tracking-tight text-foreground">Ryan Rademann</h1>
          <p class="m-0 font-medium text-sm desktop:text-lg text-foreground-muted">Technology Consultant at Wipfli</p>
          <p class="location flex items-center gap-2 mt-1 text-xs desktop:text-sm font-normal text-foreground-muted">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 desktop:w-4 desktop:h-4 text-primary" aria-hidden="true"></i>
            Chicago, IL
          </p>
        </div>
      </div>

      <!-- Mobile-only: Social links row -->
      <div class="mobile-social-links flex justify-center gap-3 mb-4 desktop:hidden">
        ${generateSocialLinks(linksData.socialLinks)}
      </div>

      <!-- Mobile-only: Schedule a Meeting button -->
      <div class="mobile-cta mb-5 desktop:hidden">
        <a href="${linksData.regularLinks.find(l => l.header === 'Schedule a Meeting')?.link || '#'}" class="mobile-cta-button flex items-center justify-center gap-3 w-full py-4 px-6 bg-card text-foreground border-[3px] border-primary rounded-xl no-underline font-semibold text-base transition-all duration-300 ease-bounce-in shadow-soft hover:-translate-y-0.5 hover:shadow-strong hover:border-primary-dark hover:bg-background-secondary" target="_blank">
          <i data-lucide="calendar" class="w-5 h-5 text-primary" aria-hidden="true"></i>
          <span>Schedule a Meeting</span>
        </a>
      </div>

      <!-- Mobile-only: Recent Activity -->
      <div class="mobile-recent-activity mb-6 desktop:hidden">
        <div class="recent-activity-header flex items-center gap-3 mb-3">
          <i data-lucide="activity" class="w-5 h-5 text-primary" aria-hidden="true"></i>
          <h2 class="font-display text-xl font-normal text-foreground m-0">Recent Activity</h2>
        </div>
        ${generateActivityFilters(activityData.activities, 'mobile')}
        <div class="recent-activity">
          ${generateRecentActivity(activityData.activities)}
        </div>
      </div>

      <!-- Mobile-only: Rest of the links -->
      <div class="mobile-links-container mb-6 desktop:hidden">
        <div class="flex items-center gap-3 mb-3">
          <i data-lucide="briefcase" class="w-5 h-5 text-primary" aria-hidden="true"></i>
          <h2 class="font-display text-xl font-normal text-foreground m-0">My Work</h2>
        </div>
        ${generateRegularLinks(linksData.regularLinks.filter(l => l.header !== 'Schedule a Meeting'))}
      </div>

    <!-- Desktop grid layout -->
    <div class="desktop-grid hidden desktop:grid desktop:grid-cols-2 desktop:gap-x-8">
      <div class="grid-header-left col-span-1 row-span-1">
        <div class="social-links flex gap-4 mb-5 w-full">
          ${generateSocialLinks(linksData.socialLinks)}
        </div>
      </div>
      <div class="grid-header-right col-span-1 row-span-1 flex items-end pb-5">
        <div class="recent-activity-header flex items-center gap-3 mb-0">
          <i data-lucide="activity" class="w-5 h-5 text-primary" aria-hidden="true"></i>
          <h2 class="font-display text-[1.35rem] font-normal text-foreground m-0 tracking-tight">Recent Activity</h2>
        </div>
      </div>
      <div class="grid-content-left col-span-1 row-span-1 self-start">
        <div class="links-container mt-0">
          ${generateRegularLinks(linksData.regularLinks)}
        </div>
      </div>
      <div class="grid-content-right col-span-1 row-span-1 relative z-[2] self-start">
        ${generateActivityFilters(activityData.activities, 'desktop')}
        <div class="recent-activity">
          ${generateRecentActivity(activityData.activities)}
        </div>
      </div>
    </div>
    <!-- Paired Accordion: Publications & Causes -->
    <div class="accordion-pair relative z-[1] flex flex-col lg:flex-row gap-4 mt-8 mb-8" data-accordion-group>
      ${isFeatureEnabled('publications') ? `
      <!-- Publications Card -->
      <div class="accordion-card flex-1 bg-card border border-card-border rounded-2xl overflow-hidden transition-all duration-500 ease-out" data-accordion-card="publications">
        <div class="accordion-header p-5 cursor-pointer" role="button" tabindex="0" aria-expanded="false" aria-controls="publications-details">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <i data-lucide="newspaper" class="w-5 h-5 text-primary" aria-hidden="true"></i>
              <h2 class="font-display text-xl font-normal text-foreground m-0">Media Appearances</h2>
            </div>
            <span class="expand-indicator p-2">
              <i data-lucide="chevron-down" class="w-5 h-5 text-primary transition-transform duration-300" aria-hidden="true"></i>
            </span>
          </div>
          <!-- Teaser: counts + ghost previews -->
          <div class="accordion-teaser mt-4 transition-all duration-300">
            <div class="flex items-center gap-4 text-sm text-foreground-muted mb-3">
              <span class="flex items-center gap-1.5">
                <i data-lucide="file-text" class="w-4 h-4" aria-hidden="true"></i>
                ${publicationsData.publications.filter((p: {type: string}) => p.type === 'article').length} Articles
              </span>
              <span class="flex items-center gap-1.5">
                <i data-lucide="tv" class="w-4 h-4" aria-hidden="true"></i>
                ${publicationsData.publications.filter((p: {type: string}) => p.type === 'interview').length} Interviews
              </span>
            </div>
            <div class="flex gap-2">
              ${publicationsData.publications.slice(0, 3).map(() => `
                <div class="h-2 bg-primary/20 rounded-full flex-1"></div>
              `).join('')}
            </div>
          </div>
        </div>
        <div id="publications-details" class="accordion-content max-h-0 overflow-hidden opacity-0 transition-all duration-500">
          <div class="px-5 pb-5">
            ${generateYearFilters(publicationsData.publications)}
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2.5 mt-4">
              ${generatePublications(publicationsData.publications)}
            </div>
          </div>
        </div>
      </div>
      ` : '<!-- Publications section disabled via feature flag -->'}

      <!-- Causes Card -->
      <div class="accordion-card flex-1 bg-card border border-card-border rounded-2xl overflow-hidden transition-all duration-500 ease-out" data-accordion-card="causes">
        <div class="accordion-header p-5 cursor-pointer" role="button" tabindex="0" aria-expanded="false" aria-controls="causes-details">
          <div class="flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <i data-lucide="heart" class="w-5 h-5 text-primary" aria-hidden="true"></i>
              <h2 class="font-display text-xl font-normal text-foreground m-0">Community</h2>
            </div>
            <span class="expand-indicator p-2">
              <i data-lucide="chevron-down" class="w-5 h-5 text-primary transition-transform duration-300" aria-hidden="true"></i>
            </span>
          </div>
          <!-- Teaser: organization logos -->
          <div class="accordion-teaser mt-4 transition-all duration-300">
            <p class="text-sm text-foreground-muted mb-3">${causesData.causes.length} organizations I support</p>
            <div class="flex gap-3">
              ${causesData.causes.map((cause: {name: string; logo: string}) => `
                <div class="w-10 h-10 rounded-lg bg-background-secondary border border-card-border flex items-center justify-center overflow-hidden" title="${cause.name}">
                  <img src="${cause.logo}" alt="" class="w-6 h-6 object-contain cause-logo-preview" />
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div id="causes-details" class="accordion-content max-h-0 overflow-hidden opacity-0 transition-all duration-500">
          <div class="px-5 pb-5">
            <div class="causes-grid">
              ${generateCauses(causesData.causes)}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider flex items-center justify-center my-12 opacity-40 animate-fade-in-divider group">
      <i data-lucide="hard-hat" class="divider-icon w-12 h-12 text-accent transition-all duration-400 group-hover:rotate-[15deg] group-hover:scale-110 group-hover:opacity-80" aria-hidden="true"></i>
    </div>
    <footer class="tech-stack mt-4 py-8 px-7 desktop:py-5 desktop:px-6 rounded-2xl w-full mb-8 relative overflow-hidden bg-card text-card-foreground border border-card-border shadow-card animate-slide-in-tech desktop:flex desktop:items-center desktop:justify-between desktop:gap-6">
      <div class="tech-stack-header flex justify-between items-center gap-4 desktop:flex-shrink-0">
        <p class="love-note m-0 flex items-center gap-3 text-sm font-medium tracking-tight text-card-foreground">
          <i data-lucide="heart" class="w-4 h-4 text-card-foreground" aria-hidden="true"></i>
          Like this contact info page?
        </p>
      </div>
      <div class="tech-stack-buttons flex flex-col gap-3 mt-4 desktop:flex-row desktop:items-center desktop:mt-0 desktop:gap-6">
        <a href="https://v0.link/ryan-rademann" target="_blank" class="create-your-own-btn flex items-center justify-center gap-2 py-3.5 px-5 desktop:py-3 desktop:px-5 bg-primary text-white border-none rounded-[10px] no-underline text-base font-semibold cursor-pointer transition-all duration-300 ease-bounce-in shadow-medium hover:-translate-y-0.5 hover:shadow-strong hover:bg-primary-dark desktop:whitespace-nowrap">
          <i data-lucide="sparkles" class="w-4 h-4" aria-hidden="true"></i>
          Create your own with v0
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 opacity-80" aria-hidden="true"></i>
        </a>
        <button id="show-tech-stack-btn" class="show-tech-stack-btn bg-transparent border-none p-2 text-foreground-muted text-sm cursor-pointer underline underline-offset-2 transition-colors duration-200 hover:text-foreground desktop:whitespace-nowrap">
          Show me this thing's tech stack
        </button>
      </div>
    </footer>

    <!-- Tech Stack Modal Overlay -->
    <div id="tech-stack-modal" class="tech-stack-modal fixed inset-0 z-[1000] flex items-center justify-center opacity-0 invisible transition-all duration-300" aria-hidden="true">
      <div class="tech-stack-modal-backdrop absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
      <div class="tech-stack-modal-content relative w-[90%] max-w-[500px] max-h-[85vh] overflow-y-auto bg-card border border-card-border rounded-[20px] p-8 shadow-modal scale-90 translate-y-5 transition-transform duration-300 ease-bounce-in">
        <button id="close-tech-stack-modal" class="tech-stack-modal-close absolute top-4 right-4 w-10 h-10 border-none bg-background-secondary rounded-full cursor-pointer flex items-center justify-center text-foreground-muted transition-all duration-200 hover:bg-primary hover:text-white hover:rotate-90" aria-label="Close">
          <i data-lucide="x" class="w-5 h-5" aria-hidden="true"></i>
        </button>
        <h2 class="tech-stack-modal-title flex items-center gap-3 font-display text-3xl font-normal m-0 mb-2 text-foreground">
          <i data-lucide="code" class="w-6 h-6 text-primary" aria-hidden="true"></i>
          Tech Stack
        </h2>
        <p class="tech-stack-modal-subtitle text-foreground-muted text-sm m-0 mb-6">Built with a bespoke software stack in 2025</p>
        <ul class="tech-stack-modal-list list-none p-0 m-0 mb-6 flex flex-col gap-4">
          <li class="flex items-center gap-3 p-4 bg-background-secondary rounded-xl text-sm">
            <i data-lucide="layout-template" class="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true"></i>
            <span class="text-foreground-muted">Boilerplate & Prototype:</span>
            <a href="https://v0.link/ryan-rademann" target="_blank" class="text-primary no-underline font-semibold inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary-dark">v0.app <i data-lucide="arrow-up-right" class="w-3 h-3" aria-hidden="true"></i></a>
          </li>
          <li class="flex items-center gap-3 p-4 bg-background-secondary rounded-xl text-sm">
            <i data-lucide="boxes" class="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true"></i>
            <span class="text-foreground-muted">Front End:</span>
            <span class="tech-pill inline-block py-1.5 px-3 rounded-md bg-background-secondary border border-card-border text-foreground font-semibold text-sm transition-all duration-300 hover:bg-accent-light hover:border-accent hover:-translate-y-0.5">React</span> + <span class="tech-pill inline-block py-1.5 px-3 rounded-md bg-background-secondary border border-card-border text-foreground font-semibold text-sm transition-all duration-300 hover:bg-accent-light hover:border-accent hover:-translate-y-0.5">Vite</span>
          </li>
          <li class="flex items-center gap-3 p-4 bg-background-secondary rounded-xl text-sm">
            <i data-lucide="database" class="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true"></i>
            <span class="text-foreground-muted">Back End:</span>
            <a href="https://convex.dev/referral/RCRADE2932" target="_blank" class="text-primary no-underline font-semibold inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary-dark">Convex <i data-lucide="arrow-up-right" class="w-3 h-3" aria-hidden="true"></i></a>
          </li>
          <li class="flex items-center gap-3 p-4 bg-background-secondary rounded-xl text-sm">
            <i data-lucide="cloud" class="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true"></i>
            <span class="text-foreground-muted">Hosting:</span>
            <span class="tech-pill inline-block py-1.5 px-3 rounded-md bg-background-secondary border border-card-border text-foreground font-semibold text-sm transition-all duration-300 hover:bg-accent-light hover:border-accent hover:-translate-y-0.5">Vercel</span>
          </li>
        </ul>
        <a href="https://github.com/rcrades/link-in-bio-ryan" target="_blank" class="github-link flex items-center gap-3 mt-0 p-4 rounded-[10px] border-2 border-primary bg-primary text-card no-underline text-sm font-semibold transition-all duration-300 ease-bounce-in shadow-medium hover:-translate-y-1 hover:scale-[1.02] hover:shadow-elevated hover:bg-primary-dark hover:border-primary-dark">
          <i data-lucide="github" class="w-5 h-5" aria-hidden="true"></i>
          View on GitHub
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 ml-1" aria-hidden="true"></i>
        </a>
      </div>
    </div>
    <!-- Favorite Apps Accordion: Start -->
    <footer class="tech-stack favorite-apps mt-4 py-8 px-7 rounded-2xl w-full mb-8 relative overflow-hidden bg-card text-card-foreground border border-card-border">
      <div class="tech-stack-header expandable-header-row flex justify-between items-center gap-4 cursor-pointer rounded-lg py-2 px-3 -my-2 -mx-3 transition-colors duration-200 desktop:hover:bg-background-secondary" role="button" tabindex="0" aria-expanded="false" aria-controls="tech-stack-details-2">
        <p class="love-note m-0 flex items-center gap-3 text-sm font-medium tracking-tight text-card-foreground">
          <i data-lucide="star" class="tech-icon w-4 h-4 text-card-foreground" aria-hidden="true"></i>
          My favorite apps in 2025
        </p>
        <span class="expand-indicator transition-all duration-200 desktop:hover:text-primary desktop:hover:scale-110">
          <i data-lucide="chevron-down" class="tech-icon w-5 h-5 text-card-foreground transition-transform duration-300" aria-hidden="true"></i>
        </span>
      </div>
      <div id="tech-stack-details-2" class="tech-stack-details">
        <ul class="list-none p-0 mt-4 mb-0 flex flex-col gap-3">
          <li class="flex items-center gap-3 py-3.5 px-4 rounded-[10px] border border-card-border bg-background-secondary text-card-foreground transition-all duration-300 ease-bounce-in text-sm hover:translate-x-1 hover:border-primary hover:bg-card hover:shadow-md">
            <i data-lucide="layout-template" class="w-[1.1rem] h-[1.1rem] text-card-foreground shrink-0" aria-hidden="true"></i>
            AI Code Gen: <a href="https://v0.link/ryan-rademann" target="_blank" class="text-primary no-underline transition-all duration-300 py-1.5 px-3 rounded-md bg-background-secondary border border-card-border font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-primary hover:text-card hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md">v0.app <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 mt-px" aria-hidden="true"></i></a>
          </li>
          <li class="flex items-center gap-3 py-3.5 px-4 rounded-[10px] border border-card-border bg-background-secondary text-card-foreground transition-all duration-300 ease-bounce-in text-sm hover:translate-x-1 hover:border-primary hover:bg-card hover:shadow-md">
            <i data-lucide="database" class="w-[1.1rem] h-[1.1rem] text-card-foreground shrink-0" aria-hidden="true"></i>
            Easy backend for vibe-coded apps: <a href="https://convex.dev/referral/RCRADE2932" target="_blank" class="text-primary no-underline transition-all duration-300 py-1.5 px-3 rounded-md bg-background-secondary border border-card-border font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-primary hover:text-card hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md">Convex <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 mt-px" aria-hidden="true"></i></a>
          </li>
          <li class="flex items-center gap-3 py-3.5 px-4 rounded-[10px] border border-card-border bg-background-secondary text-card-foreground transition-all duration-300 ease-bounce-in text-sm hover:translate-x-1 hover:border-primary hover:bg-card hover:shadow-md">
            <i data-lucide="presentation" class="w-[1.1rem] h-[1.1rem] text-card-foreground shrink-0" aria-hidden="true"></i>
            AI Slide Deck Creator: <a href="https://gamma.app/signup?r=3kue3y24828ihup" target="_blank" class="text-primary no-underline transition-all duration-300 py-1.5 px-3 rounded-md bg-background-secondary border border-card-border font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-primary hover:text-card hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md">gamma.app <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 mt-px" aria-hidden="true"></i></a>
          </li>
          <li class="flex items-center gap-3 py-3.5 px-4 rounded-[10px] border border-card-border bg-background-secondary text-card-foreground transition-all duration-300 ease-bounce-in text-sm hover:translate-x-1 hover:border-primary hover:bg-card hover:shadow-md">
            <i data-lucide="briefcase" class="w-[1.1rem] h-[1.1rem] text-card-foreground shrink-0" aria-hidden="true"></i>
            Quickbooks Online: <a href="https://quickbooks.partnerlinks.io/ryanrademann" target="_blank" class="text-primary no-underline transition-all duration-300 py-1.5 px-3 rounded-md bg-background-secondary border border-card-border font-semibold text-sm inline-flex items-center gap-1.5 hover:bg-primary hover:text-card hover:border-primary-dark hover:-translate-y-0.5 hover:shadow-md">QBO Signup <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 mt-px" aria-hidden="true"></i></a>
          </li>
        </ul>
      </div>
    </footer>
    <!-- Favorite Apps Accordion: End -->

    <!-- Mobile-only: Theme toggle at bottom -->
    <div class="mobile-theme-toggle mt-8 pt-6 border-t border-card-border desktop:hidden">
      <button id="theme-toggle-mobile" class="theme-toggle-bottom flex items-center justify-center gap-3 w-full py-3.5 px-4 bg-card border border-card-border rounded-xl text-foreground-muted cursor-pointer text-[0.9rem] font-medium transition-all duration-300 hover:border-primary hover:text-foreground" aria-label="Toggle theme">
        <i data-lucide="sun" class="theme-icon sun w-[1.1rem] h-[1.1rem] text-primary" aria-hidden="true"></i>
        <i data-lucide="moon" class="theme-icon moon w-[1.1rem] h-[1.1rem] text-primary" aria-hidden="true"></i>
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

  // Add click handlers for accordion-pair cards (Publications & Causes)
  const accordionGroup = document.querySelector('[data-accordion-group]');
  const accordionCards = document.querySelectorAll('[data-accordion-card]');

  accordionCards.forEach((card) => {
    const header = card.querySelector('.accordion-header');

    const toggleAccordion = () => {
      const content = card.querySelector('.accordion-content');
      const chevron = card.querySelector('.expand-indicator i');
      const teaser = card.querySelector('.accordion-teaser');
      const isExpanded = header?.getAttribute('aria-expanded') === 'true';

      if (!isExpanded) {
        // Collapse all other cards in this group
        accordionCards.forEach((otherCard) => {
          if (otherCard !== card) {
            const otherContent = otherCard.querySelector('.accordion-content');
            const otherChevron = otherCard.querySelector('.expand-indicator i');
            const otherHeader = otherCard.querySelector('.accordion-header');
            const otherTeaser = otherCard.querySelector('.accordion-teaser');

            otherContent?.classList.add('max-h-0', 'opacity-0');
            otherContent?.classList.remove('max-h-[2000px]', 'opacity-100');
            otherChevron?.classList.remove('rotate-180');
            otherHeader?.setAttribute('aria-expanded', 'false');
            otherTeaser?.classList.remove('opacity-0', 'h-0', 'mt-0', 'overflow-hidden');
            otherCard.classList.remove('accordion-expanded');
          }
        });

        // Expand this card
        content?.classList.remove('max-h-0', 'opacity-0');
        content?.classList.add('max-h-[2000px]', 'opacity-100');
        chevron?.classList.add('rotate-180');
        teaser?.classList.add('opacity-0', 'h-0', 'mt-0', 'overflow-hidden');
        card.classList.add('accordion-expanded');
        accordionGroup?.classList.add('has-expanded');
      } else {
        // Collapse this card
        content?.classList.add('max-h-0', 'opacity-0');
        content?.classList.remove('max-h-[2000px]', 'opacity-100');
        chevron?.classList.remove('rotate-180');
        teaser?.classList.remove('opacity-0', 'h-0', 'mt-0', 'overflow-hidden');
        card.classList.remove('accordion-expanded');
        accordionGroup?.classList.remove('has-expanded');
      }

      header?.setAttribute('aria-expanded', (!isExpanded).toString());
    };

    header?.addEventListener('click', toggleAccordion);
    header?.addEventListener('keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent;
      if (keyEvent.key === 'Enter' || keyEvent.key === ' ') {
        e.preventDefault();
        toggleAccordion();
      }
    });
  });

  // Add click handlers for other expandable sections (tech-stack, favorite-apps)
  const expandableHeaders = document.querySelectorAll('.expandable-header-row');

  expandableHeaders.forEach((header) => {
    const toggleExpand = () => {
      const controlsId = header.getAttribute('aria-controls');
      const details = controlsId ? document.getElementById(controlsId) : null;
      const chevron = header.querySelector('.expand-indicator i');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      if (details) {
        // Check if this is a max-h style section or toggle class style (tech-stack)
        if (details.classList.contains('max-h-0') || details.classList.contains('max-h-[2000px]')) {
          if (!isExpanded) {
            details.classList.remove('max-h-0', 'opacity-0');
            details.classList.add('max-h-[2000px]', 'opacity-100');
          } else {
            details.classList.add('max-h-0', 'opacity-0');
            details.classList.remove('max-h-[2000px]', 'opacity-100');
          }
        } else {
          details.classList.toggle('expanded');
        }
      }

      header.setAttribute('aria-expanded', (!isExpanded).toString());
      if (chevron) {
        if (!isExpanded) {
          chevron.classList.add('rotate-180');
        } else {
          chevron.classList.remove('rotate-180');
        }
      }
    };

    header.addEventListener('click', toggleExpand);
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
  const publicationTypeChips = document.querySelectorAll('.publication-type-filter');
  const publicationItems = document.querySelectorAll('.publication-item');
  let activeYearFilter: HTMLButtonElement | null = null;
  let activePublicationType = 'all';
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
      const itemType = item.getAttribute('data-type') || '';
      const isWipfli = itemSource.includes('wipfli');

      let shouldShow = true;

      // Apply Wipfli filter
      if (wipfliHidden && isWipfli) {
        shouldShow = false;
      }

      // Apply type filter
      if (shouldShow && activePublicationType !== 'all') {
        shouldShow = itemType === activePublicationType;
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
    if (label) label.textContent = `Show Wipfli Media (${wipfliCount})`;

    wipfliFilter.addEventListener('click', (e: Event) => {
      wipfliHidden = !wipfliHidden;
      const button = e.currentTarget as HTMLButtonElement;
      const label = button.querySelector('.wipfli-toggle-label');

      if (wipfliHidden) {
        // Hidden state - show "Show Wipfli Publications"
        button.classList.remove('active');
        if (label) label.textContent = `Show Wipfli Media (${wipfliCount})`;
      } else {
        // Visible state - show "Hide Wipfli Publications"
        button.classList.add('active');
        if (label) label.textContent = `Hide Wipfli Media (${wipfliCount})`;
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

  // Activity type filter chips — mirror state across mobile + desktop chip groups
  const activityChips = document.querySelectorAll('.activity-chip[data-activity-type]');
  activityChips.forEach(chip => {
    chip.addEventListener('click', (e: Event) => {
      const clicked = e.currentTarget as HTMLButtonElement;
      const selectedType = clicked.getAttribute('data-activity-type') || 'all';

      document.querySelectorAll('.activity-chip[data-activity-type]').forEach(c => c.classList.remove('active-filter'));
      document.querySelectorAll(`.activity-chip[data-activity-type="${selectedType}"]`).forEach(c => c.classList.add('active-filter'));

      document.querySelectorAll('.activity-item').forEach(item => {
        const itemType = item.getAttribute('data-activity-type') || '';
        const shouldShow = selectedType === 'all' || itemType === selectedType;
        (item as HTMLElement).style.display = shouldShow ? 'flex' : 'none';
      });
    });
  });

  // Publication type filter chips — single-group filter inside the Media Appearances accordion
  publicationTypeChips.forEach(chip => {
    chip.addEventListener('click', (e: Event) => {
      const clicked = e.currentTarget as HTMLButtonElement;
      const selectedType = clicked.getAttribute('data-publication-type') || 'all';

      publicationTypeChips.forEach(c => c.classList.remove('active-filter'));
      clicked.classList.add('active-filter');

      activePublicationType = selectedType;
      applyFilters();
    });
  });
}

// Initialize the app
initializeApp();