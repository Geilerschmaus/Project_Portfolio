# TIKI TIKI — Project Documentation

**Date Created:** 2026-07-12
**Tech Stack:** React 19 + TypeScript 6.0 + Vite 8 + lucide-react

---

## Project Description

Tiki Tiki is a TikTok-style short-form video feed web application. It presents users with a mobile-first, full-screen vertical video experience where they can scroll through a feed of short videos. The app features like, comment, share, and bookmark interactions on each video, along with user profiles and a discover/search page. Built as a learning project to deepen understanding of React, TypeScript, and modern frontend architecture.

---

## Goal

Build a fully functional TikTok clone that replicates the core user experience of scrolling through a vertical video feed with social interactions. The end result is a mobile-responsive web app with a working video player, like/bookmark system, user profiles, a discover page, and smooth animations. The project serves as a practical exercise in React component architecture, TypeScript type safety, state management, and CSS styling.

---

## Tech Stack & Software

| Category | Technology | Purpose |
|----------|-----------|---------|
| Language | TypeScript 6.0 | Type-safe JavaScript with interfaces and strict mode |
| UI Framework | React 19 | Component-based UI with hooks (useState, useCallback, React.memo) |
| Build Tool | Vite 8 | Dev server, HMR, and production bundling |
| Icons | lucide-react | Heart, Bookmark, Share2, MessageCircle, PlusCircle icons |
| Linting | ESLint 10 + typescript-eslint | Code quality and TypeScript rule enforcement |
| Routing | React Router v7 (planned) | Client-side page routing (feed, discover, upload, profile) |
| Animations | Framer Motion (planned) | Micro-animations and smooth transitions |

---

## Estimated Time to Completion

| Phase | Time Estimate |
|-------|--------------|
| Phase 1 — Core Feed (MVP) | 1-2 weeks |
| Phase 2 — Social Features (likes, comments, follow) | 1-2 weeks |
| Phase 3 — Discovery & Profile Pages | 1-2 weeks |
| Phase 4 — Polish, Animations & Responsive Design | 1 week |
| Testing & Bug Fixes | 3-5 days |
| **Total** | **5-8 weeks** |

*Estimate assumes learning alongside development. Built incrementally with generous buffer for debugging and experimentation.*

---

## What You Will Learn

By completing this project, you will gain hands-on experience with:

- **React Component Architecture** — composing a UI from small, single-responsibility components (VideoPlayer, VideoInfo, ActionBar, Feed)
- **TypeScript Interfaces** — defining typed data models (Video interface with 16 fields) and typed Props for components
- **State Management** — lifting state up to a single source of truth (App.tsx), passing data and handlers via props
- **React Hooks** — useState for state, useCallback for memoizing handler functions, React.memo for render optimization
- **Props Drilling vs Context** — understanding when props drilling is fine and when to reach for Context API
- **CSS Layouts** — full-screen vertical video layout, TikTok-style dark theme, scroll snap behavior
- **Asset Management** — organizing static assets (videos, mock data, avatars) within a Vite project
- **ESLint & Code Quality** — writing lint-clean TypeScript with strict rules
- **Vite Workflow** — fast development with HMR, TypeScript compilation, and production builds

---

## Project Structure

```
2026-07-12_tiki_tiki/
├── src/
│   ├── components/
│   │   ├── ActionBar.tsx            — like, bookmark, share, follow buttons with icons
│   │   └── VideoInfo.tsx            — username, caption, music name display
│   ├── assets/
│   │   ├── data/
│   │   │   └── mockVideos.ts        — array of 3 mock Video objects
│   │   └── videos/
│   │       ├── video1.mp4           — sample video file
│   │       ├── video2.mp4           — sample video file
│   │       ├── video3.mp4           — sample video file
│   │       ├── 002831_HD_COUNTDOWN_03.mp4 — additional video asset
│   │       └── DSC_0774_2.mp4       — additional video asset
│   ├── types.ts                     — Video interface (16 typed fields)
│   ├── App.tsx                      — root component (empty shell, not wired yet)
│   ├── App.css                      — base reset styles + button styles
│   ├── main.tsx                     — React root mount point
│   └── main.css                     — empty (unused)
├── .opencode/
│   └── commands/
│       ├── document-init.md         — slash command: generate init docs
│       ├── document.md              — slash command: daily progress docs
│       ├── fix-senior.md            — slash command: senior code review
│       └── help-teacher.md          — slash command: guided teaching
├── index.html                       — Vite HTML entry point
├── package.json                     — dependencies and scripts
├── package-lock.json                — locked dependency versions
├── eslint.config.js                 — ESLint configuration
├── tsconfig.json                    — TypeScript project references
├── tsconfig.app.json                — TypeScript config for app source
├── tsconfig.node.json               — TypeScript config for Node/Vite
├── vite.config.ts                   — Vite build configuration
├── DOCUMENTATION.md                 — this file
├── README.md                        — project readme
└── .gitignore                       — git ignore rules
```

---

## Development Timeline

| Date | Commit | What Was Done |
|------|--------|---------------|
| 2026-07-12 | `dfbcc47` | Project initialized — Vite scaffold, React 19 + TypeScript setup, config files, base App.tsx shell, DOCUMENTATION.md created |
| 2026-07-12 | `10d610a` | Types and components — Video interface defined, mock video data (3 videos) created, VideoInfo.tsx and ActionBar.tsx built with lucide-react icons |
| 2026-07-15 | `e46ec0f` | ActionBar refinements — updated icon usage, added base CSS styles for action bar buttons and follow button |

---

**Project finished in percentage: ~15%**
