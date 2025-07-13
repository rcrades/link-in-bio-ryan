# Project Commands

## Build and Development
- Build: `vercel build`
- Development: `vercel dev`

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