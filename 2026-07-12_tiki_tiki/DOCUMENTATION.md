# TIKI TIKI - TikTok Clone Documentation

**Last Updated:** 2026-07-12
**Tech Stack:** React 19 + TypeScript + Vite 8 + lucide-react

---

## Current Status

Phase 1 in progress. Types defined, mock data created, 2 of 4 components built.

**Project Structure:**
```
src/
├── types.ts                    (Video interface - 16 fields)
├── App.tsx                     (empty shell - not wired yet)
├── App.css                     (base reset styles)
├── main.tsx                    (React root mount)
├── main.css                    (empty)
├── components/
│   ├── VideoInfo.tsx           displays username, caption, music
│   └── ActionBar.tsx           basic structure, needs icons + handlers
├── assets/
│   ├── data/
│   │   └── mockVideos.ts      3 mock videos
│   └── videos/
│       ├── video1.mp4
│       ├── video2.mp4
│       └── video3.mp4
```

---

## Project Vision

Tiki Tiki is a TikTok-style short-form video feed. Users scroll vertically through a feed of short videos with likes, comments, shares, and a discover/search page. Mobile-first, full-screen vertical video experience.

---

## Planned Architecture

### Component Tree
```
App (state: Video[], handlers: handleLike, handleBookmark)
├── Feed (touch gesture handling, vertical snap)
│   └── VideoPlayer (full-screen card)
│       ├── <video> element (plays inline, muted, loop)
│       ├── VideoInfo (bottom-left overlay)
│       │   ├── @username
│       │   ├── caption text
│       │   └── music ticker (animated)
│       └── ActionBar (right-side vertical strip)
│           ├── Heart (like/unlike + count)
│           ├── MessageCircle (comment count)
│           ├── Share2 (share count)
│           └── Bookmark (save/unsaved)
├── DiscoverPage
│   ├── SearchBar
│   └── TrendingGrid (video thumbnails)
├── UploadPage
│   └── UploadForm (video picker, caption, post)
├── ProfilePage
│   ├── ProfileHeader (avatar, stats, follow btn)
│   └── UserVideoGrid (tab: videos, liked, saved)
├── CommentsModal
│   └── CommentList + CommentInput
└── AuthModal
    └── Login / Register forms
```

### State Management
- **useState** in App.tsx for video array (single source of truth)
- **State lifting** — all data flows down via props
- **localStorage** for persistence (favorites, theme)
- **React.memo** for performance optimization on VideoPlayer

### Routing
- React Router v7 with lazy-loaded pages
- Routes: `/` (feed), `/discover`, `/upload`, `/profile/:id`, `/login`

---

## Feature Plan (Phases)

### Phase 1 - Core Feed (MVP)
| # | Feature | Status |
|---|---------|--------|
| 1 | Full-screen vertical video player with swipe navigation | Pending |
| 2 | Video metadata display (username, caption, music) | In Progress |
| 3 | Action bar (like, comment, share, bookmark) | In Progress |
| 4 | Mock data store with sample videos | Done |
| 5 | CSS: dark theme, TikTok-style layout | Pending |

### Phase 2 - Social Features
| # | Feature | Complexity |
|---|---------|-----------|
| 6 | Like/unlike with animated heart | Medium |
| 7 | Comments modal with comment list | Medium |
| 8 | Follow/unfollow users | Medium |
| 9 | Share sheet (copy link, social share) | Low |
| 10 | Bookmarked/saved videos | Medium |

### Phase 3 - Discovery & Profile
| # | Feature | Complexity |
|---|---------|-----------|
| 11 | Discover/explore page with trending grid | Medium |
| 12 | Search functionality | Medium |
| 13 | User profile page with video grid | Medium |
| 14 | Upload page (UI only, mock upload) | Medium |

### Phase 4 - Polish & Extras
| # | Feature | Complexity |
|---|---------|-----------|
| 15 | Music/audio ticker animation | Low |
| 16 | Progress bar on videos | Low |
| 17 | Smooth transitions & micro-animations | Medium |
| 18 | Responsive design (mobile + desktop) | Medium |
| 19 | Dark/light theme toggle | Medium |

---

## Phase 1 Progress

| Step | Task | Status |
|------|------|--------|
| 1 | Install lucide-react | Pending |
| 2 | Create types.ts | Done |
| 3 | Create mockVideos.ts | Done |
| 4a | Build VideoInfo.tsx | Done |
| 4b | Build ActionBar.tsx | Partially done (needs icons, handlers, props) |
| 4c | Build VideoPlayer.tsx | Pending |
| 4d | Build Feed.tsx | Pending |
| 5 | Wire up App.tsx (state + handlers) | Pending |
| 6 | CSS: dark theme, layout, animations | Pending |
| 7 | Update index.html title | Pending |
| 8 | Lint + test | Pending |

---

## Concepts Learned So Far

- TypeScript interfaces and type exports
- import type vs import
- Props interfaces with Props suffix convention
- Data flow: parent to child via props (single source of truth)
- Why NOT to duplicate state with useState in child components
- React.memo for performance with large lists
- useCallback for memoizing handler functions

---

## Libraries Used

| Library | Purpose | Status |
|---------|---------|--------|
| `lucide-react` | Icons (heart, comment, share, bookmark) | Pending install |
| `react-router-dom` | Client-side routing | Phase 3 |
| `framer-motion` | Animations | Phase 4 |

---

## Next Steps

1. Install lucide-react
2. Finish ActionBar.tsx (add icons, handler props, conditional fill/color)
3. Build VideoPlayer.tsx (full-screen card with video + info + actions)
4. Build Feed.tsx (scrollable container with touch swipe)
5. Wire up App.tsx (state management, like/bookmark handlers)
6. Add CSS (dark theme, TikTok layout, scroll snap, marquee)

---

**Project finished in percentage: ~15%**
