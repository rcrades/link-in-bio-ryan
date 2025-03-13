# Personal Links Page

A modern, responsive links page built with:
- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling
- [TypeScript](https://www.typescriptlang.org) - JavaScript with syntax for types
- [Tailwind CSS v4](https://tailwindcss.com) - A utility-first CSS framework
- [Lucide Icons](https://lucide.dev) - Beautiful & consistent icons

## Directory Structure

```
├── src/                  # Source files
│   ├── main.ts          # Main page logic
│   ├── speaker.ts       # Speaker page logic
│   ├── admin.ts         # Admin page logic
│   ├── stealth.ts       # Stealth mode page logic
│   ├── style.css        # Global styles
│   └── data/            # Data files
│       ├── links.json   # Link configurations
│       └── ICONS.md     # Icon usage guide
│
├── public/              # Static assets
│   ├── profile.jpg      # Profile image
│   └── favicon.ico      # Site favicon
│
├── pages/               # Page directories
│   ├── admin/          
│   │   └── index.html   # Admin page
│   ├── speaker/        
│   │   └── index.html   # Speaker inquiry form
│   └── stealth/        
│       └── index.html   # Stealth mode page
│
├── index.html           # Main page
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Managing Links

The site's links are managed through a JSON configuration file at `src/data/links.json`. This file contains two types of links:

1. Social Links (half-width)
```json
{
  "type": "social",
  "icon": "linkedin",
  "link": "https://example.com"
}
```

2. Regular Links (full-width)
```json
{
  "type": "regular",
  "icon": "calendar",
  "header": "Schedule a Meeting",
  "description": "Book a meeting",
  "link": "https://example.com"
}
```

### Icons
All icons are from the [Lucide Icons](https://lucide.dev/icons) library. See `src/data/ICONS.md` for:
- Complete list of recommended icons by category
- Usage instructions
- Examples

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Page Routes

- `/` - Main links page
- `/speaker/` - Speaker inquiry form
- `/admin/` - Admin controls
- `/stealth/` - Stealth mode page

## Tech Stack Details

- **Vite**: Used for its fast HMR and optimized build process
- **TypeScript**: Enables type-safe JavaScript development
- **Tailwind CSS v4**: Latest version with improved performance and features
- **Lucide**: Lightweight icon library with consistent design