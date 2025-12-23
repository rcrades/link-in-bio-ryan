/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./pages/**/*.{html,js,ts}",
    "./src/**/*.{js,ts,css}"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'desktop': '1000px', // Single breakpoint: mobile < 1000px, desktop >= 1000px
    },
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        primary: 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        accent: 'var(--accent)',
        'accent-light': 'var(--accent-light)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'card-border': 'var(--card-border)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
      },
      boxShadow: {
        'card': '0 2px 8px var(--shadow), 0 1px 2px var(--shadow)',
        'card-hover': '0 12px 32px var(--shadow-strong), 0 4px 8px var(--shadow)',
        'soft': '0 2px 8px var(--shadow)',
        'medium': '0 4px 12px var(--shadow)',
        'strong': '0 6px 16px var(--shadow-strong)',
        'elevated': '0 8px 24px var(--shadow-strong)',
        'modal': '0 24px 48px rgba(0, 0, 0, 0.4)',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-in-profile': 'slideInProfile 0.8s ease-out 0.2s backwards',
        'slide-in-toggle': 'slideInToggle 0.6s ease-out 0.3s backwards',
        'slide-in-tech': 'slideInTech 0.8s ease-out 1.3s backwards',
        'fade-in-divider': 'fadeInDivider 0.8s ease-out 1.2s backwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInProfile: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInToggle: {
          from: { opacity: '0', transform: 'translateY(-20px) rotate(-90deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(0)' },
        },
        slideInTech: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDivider: {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '0.4', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
