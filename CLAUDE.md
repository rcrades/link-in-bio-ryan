# Project Commands

## Build and Development
- Build: `vercel build`
- Development: `vercel dev`

## Related Documentation
- [README.md](README.md) - Project overview, features, and setup
- [AGENTS.md](AGENTS.md) - AI agent guidelines and conventions

## Responsive Layout Strategy

### Breakpoints
- **Mobile/Tablet**: Under 1000px width - single column, stacked layout
- **Desktop**: 1000px and above - two-column layout with Recent Activity prominent

### Design Philosophy
No "fully responsive" gymnastics. Two clear layouts:
1. **Mobile** (< 1000px): Current vertical stack. Tablet users get this too (they're ~1% of traffic)
2. **Desktop** (≥ 1000px): Two-column grid with Recent Activity in the left column (above the fold)

### Desktop Layout Structure
```
┌─────────────────────────────────────────────────┐
│  [Profile Header - centered, spans both cols]   │
├─────────────────────┬───────────────────────────┤
│  Recent Activity    │  Links & Social           │
│  (prominent, video  │  (regular links,          │
│   thumbnails)       │   social cards)           │
├─────────────────────┴───────────────────────────┤
│  [Publications, Causes, Tech Stack - full width]│
└─────────────────────────────────────────────────┘
```

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
