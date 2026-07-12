# TIKI TIKI - TikTok Clone Documentation

**Date:** 2026-07-12
**Tech Stack:** React 19 + TypeScript + Vite 8

---

## Current Status

Fresh React 19 + TypeScript + Vite project scaffold. Empty App component, no features implemented yet.

**Project Structure:**
```
src/
├── App.tsx          (empty shell)
├── App.css          (base reset styles)
├── main.tsx         (React root mount)
├── main.css         (empty)
├── components/      (empty - to be built)
└── assets/          (empty - for media)
```

---

## Project Vision

Tiki Tiki is a TikTok-style short-form video feed. Users scroll vertically through a feed of short videos with likes, comments, shares, and a discover/search page. Mobile-first, full-screen vertical video experience.

---

## Planned Architecture

### Component Tree
```
App
├── Layout
│   ├── Sidebar (desktop nav)
│   └── BottomNav (mobile nav)
├── FeedPage
│   └── VideoPlayer (full-screen swipeable video)
│       ├── VideoInfo (username, caption, music ticker)
│       ├── ActionBar (like, comment, share, bookmark buttons)
│       └── ProgressBar
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
- **React Context** for global state (auth, theme, current user)
- **useState/useReducer** for local component state
- **localStorage** for persistence (favorites, theme)

### Routing
- React Router v7 with lazy-loaded pages
- Routes: `/` (feed), `/discover`, `/upload`, `/profile/:id`, `/login`

---

## Feature Plan (Phases)

### Phase 1 - Core Feed (MVP)
| # | Feature | Complexity |
|---|---------|-----------|
| 1 | Full-screen vertical video player with swipe navigation | High |
| 2 | Video metadata display (username, caption, music) | Low |
| 3 | Action bar (like, comment, share, bookmark) | Medium |
| 4 | Mock data store with sample videos | Low |
| 5 | CSS: dark theme, TikTok-style layout | Medium |

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

## Estimated Timeline

| Phase | Est. Time | Status |
|-------|-----------|--------|
| Phase 1 - Core Feed | 2-3 hours | Pending |
| Phase 2 - Social | 2-3 hours | Pending |
| Phase 3 - Discovery | 2-3 hours | Pending |
| Phase 4 - Polish | 1-2 hours | Pending |
| **Total** | **7-11 hours** | |

---

## Libraries To Consider Adding

| Library | Purpose |
|---------|---------|
| `react-router-dom` | Client-side routing |
| `framer-motion` | Animations (like heart, page transitions) |
| `lucide-react` | Icons (like, comment, share, etc.) |
| `zustand` or React Context | State management |

---

**Project finished in percentage: 0%**
