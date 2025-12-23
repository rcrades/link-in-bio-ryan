# Project Commands

## Build and Development
- Build: `vercel build`
- Development: `vercel dev`

## Related Documentation
- [README.md](README.md) - Project overview, features, and setup
- [AGENTS.md](AGENTS.md) - AI agent guidelines and conventions

## Responsive Layout Strategy

### Breakpoints
- **Mobile/Tablet**: Under 1000px width - compact layout with Recent Activity
- **Desktop**: 1000px and above - two-column layout with Recent Activity prominent

### Design Philosophy
No "fully responsive" gymnastics. Two clear layouts:
1. **Mobile** (< 1000px): Compact header (photo+text side-by-side), horizontal social row, CTA button, Recent Activity, then remaining links. Theme toggle at bottom.
2. **Desktop** (≥ 1000px): Two-column grid with Recent Activity in the right column (above the fold). Theme toggle top-right.

### Mobile Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Photo] [Name, Role, Location]                 │
├─────────────────────────────────────────────────┤
│  [LinkedIn] [X] [v0] (compact social row)       │
├─────────────────────────────────────────────────┤
│  [Schedule a Meeting - prominent CTA button]    │
├─────────────────────────────────────────────────┤
│  Recent Activity (video thumbnails, articles)   │
├─────────────────────────────────────────────────┤
│  [Remaining Links: Wipfli Bio, Stealth Mode]    │
├─────────────────────────────────────────────────┤
│  [Publications, Causes, Tech Stack sections]    │
├─────────────────────────────────────────────────┤
│  [Switch Theme button at bottom]                │
└─────────────────────────────────────────────────┘
```

### Desktop Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Profile Header - horizontal, left-aligned]    │
├─────────────────────┬───────────────────────────┤
│  Social Links       │  Recent Activity Header   │
├─────────────────────┼───────────────────────────┤
│  Links & Cards      │  Recent Activity Items    │
│  (all regular links)│  (video thumbnails)       │
├─────────────────────┴───────────────────────────┤
│  [Publications, Causes, Tech Stack - full width]│
└─────────────────────────────────────────────────┘
```

### Desktop Grid Alignment
The desktop layout uses a 2-column CSS grid. To ensure the left and right columns align at the top:
- Grid content cells use `self-start` to align to top of their grid area
- Cards use `mb-*` (bottom margin only), NOT `my-*` (top + bottom margin)
- The first card in each column must have no top margin to align properly

**Critical**: Using `my-5` on cards will misalign columns because the first card gets pushed down. Always use `mb-5` instead.

## Feature Flags
Simple lightweight feature flagging system in `src/main.ts`:

### Configuration
```typescript
const FEATURE_FLAGS = {
  publications: true  // Set to false to disable publications section
};
```

### Behavior
- Features only show in **development** (localhost, port-based URLs)
- Features are **hidden in production** regardless of flag state
- Easy toggle: change flag value and refresh page

### Environment Detection
Auto-detects development via:
- `import.meta.env.DEV` (Vite)
- `localhost` or `127.0.0.1` hostname
- Any URL with port number

### Current Flags
- `publications`: Publications and Media section (currently enabled for dev)

## Content Management

### Recent Activity
The Recent Activity section showcases recent appearances, talks, or content. Located in `src/data/activity.json`:

```json
{
  "activities": [
    {
      "title": "Office Hours Global",
      "description": "Brief description",
      "date": "2024-12-19",
      "type": "video",
      "url": "https://youtube.com/...",
      "thumbnailId": "youtube-video-id"
    }
  ]
}
```

### Tone
The site aims for subtlety - no aggressive CTAs or intensity. Let the content speak for itself with small thumbnails and understated presentation that reflects an informal, approachable personality.
