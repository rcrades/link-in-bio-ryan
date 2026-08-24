# Personal Links Page

A modern bio page that centralizes all your important links in one place. Perfect for sharing in social media bios, email signatures, or anywhere you need a single link that leads to everything else.

**Built with:** [Vite](https://vitejs.dev) • [TypeScript](https://www.typescriptlang.org) • [Tailwind CSS](https://tailwindcss.com) • [Lucide Icons](https://lucide.dev)

## Related Documentation
- [CLAUDE.md](CLAUDE.md) - Development commands, feature flags, and layout strategy
- [AGENTS.md](AGENTS.md) - AI agent guidelines and conventions

## Features

- **Multiple page types**: Main bio, speaker inquiries, admin controls
- **Desktop/Mobile layouts**: Two-column desktop (≥1000px) with Recent Activity; compact mobile layout with photo/text side-by-side, social row, CTA, and Recent Activity
- **Easy content management**: JSON-based configuration
- **Feature flagging**: Control experimental features
- **Publications section**: Showcase articles, videos, and media appearances
- **Dark/light theming**: Automatic theme switching

## Page Routes

- `/` - Main links page
- `/speaking` - Talks, topics, and selected appearances
- `/pages/speaker/` - Speaker inquiry form
- `/pages/admin/` - Admin controls
- `/pages/start-with-v0/` - v0 templates
- `/pages/groundbreak/` - Groundbreak 2026 speaker proposal (plus `thesis/`, `dossier/`, `preview/` alts)

## Directory Structure

```
├── src/                    # Source files
│   ├── main.ts            # Main page logic
│   ├── speaker.ts         # Speaker page logic
│   ├── admin.ts           # Admin page logic
│   ├── style.css          # Global styles
│   ├── data/              # Data files
│   │   ├── links.json     # Link configurations
│   │   └── publications.json # Publications data
│   └── utils/             # Utility functions
│       └── profileImage.ts # Profile image handling
│
├── public/                # Static assets
│   ├── profile.jpg        # Profile image
│   ├── profile-backup.jpg # Backup profile image
│   ├── favicon.ico        # Site favicon
│   ├── favicon-32x32.png  # 32x32 favicon
│   ├── favicon-16x16.png  # 16x16 favicon
│   ├── apple-touch-icon.png    # iOS home screen icon
│   ├── android-chrome-192x192.png  # Android icon
│   └── android-chrome-512x512.png  # Android icon (large)
│
├── pages/                 # Page directories
│   ├── admin/
│   │   └── index.html     # Admin page
│   └── speaker/
│       └── index.html     # Speaker inquiry form
│
├── index.html             # Main page
├── vite.config.ts         # Vite configuration
├── tailwind.config.cjs    # Tailwind CSS configuration
├── postcss.config.cjs     # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── CLAUDE.md              # Development notes
└── package.json           # Project dependencies
```

## Managing Links

The site's links are managed through JSON configuration files:

### Links Configuration (`src/data/links.json`)
Two types of links are supported:

**Social Links** (half-width)
```json
{
  "type": "social",
  "icon": "linkedin",
  "link": "https://example.com"
}
```

**Regular Links** (full-width)
```json
{
  "type": "regular",
  "icon": "calendar",
  "header": "Schedule a Meeting",
  "description": "Book a meeting",
  "link": "https://example.com"
}
```

### Publications (`src/data/publications.json`)
Publications and media appearances with metadata:
```json
{
  "title": "Article Title",
  "source": "Publication Name",
  "url": "https://example.com",
  "date": "2025-01-01",
  "type": "article"
}
```

### Icons
All icons use the [Lucide Icons](https://lucide.dev/icons) library. Browse their catalog for available icons and use the icon name in your configuration.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

### Feature Flags

Lightweight feature flagging system for experimental features:

```typescript
// src/main.ts
const FEATURE_FLAGS = {
  publications: {
    enabled: true,
    developmentOnly: false,
  },
};
```

**Behavior:**
- `enabled: false` hides a feature everywhere
- `developmentOnly: true` limits a feature to development-like environments (Vite dev mode, localhost, or URLs with ports)
- `developmentOnly: false` allows an enabled feature to render in production
- Easy toggle: change flag values and refresh page

**Current Flags:**
- `publications`: Publications and Media section (enabled in production and development)

## License

This project is licensed under the **MIT License** - you're free to use, modify, and distribute this code for any purpose, including commercial projects. No permission needed!

See the full license terms below or in the [LICENSE](LICENSE) file.

## Referral Links

This site includes referral links for services and tools Ryan recommends:

### Active Referral Links
- **v0.app**: `https://v0.app/ref/AH0995` - AI Code Gen (featured in Tech Stack and Favorite Apps sections)
- **Gamma**: `https://gamma.app/signup?r=3kue3y24828ihup` - AI Slide Deck Creator
- **Google Gemini Pro**: `https://g.co/g1referral/K57Z7QMV` - 4-months free
- **Claude Max**: `https://claude.ai/referral/AmO81PvUJQ` - Win four months of Claude Max
- **QuickBooks Online**: `https://quickbooks.partnerlinks.io/ryanrademann` - QBO Signup

**Note**: These referral links are documented here to ensure they are preserved during updates and edits.

## Want to Build Your Own?

Like this bio links page? Feel free to fork this repository and customize it for your own use!

If you'd like help setting up your own version or have questions about the code, reach out to Ryan:
- **LinkedIn**: [Connect with Ryan](https://linkedin.com/in/ryanrademann)
- **Twitter/X**: [@ryanrademann](https://twitter.com/ryanrademann)

This project is open source and built to be easily customizable. Happy building! 🚀
