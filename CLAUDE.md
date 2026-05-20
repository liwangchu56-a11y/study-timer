# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Study Timer - A desktop/web application for tracking study time with Pomodoro functionality.

## Commands

- **Run locally**: `npm start` (requires Electron installed via `npm install`)
- **Build portable exe**: `npx electron-builder --win portable`
- **Build installer**: `npm run dist`

## Architecture

Single-page application with two runtime modes:
1. **Browser mode**: Direct `index.html` - full functionality without installation
2. **Electron mode**: `npm start` - desktop window wrapper

Key files:
- `index.html` - UI and all business logic (self-contained, no build step needed)
- `main.js` - Electron main process (window creation, app lifecycle)
- `preload.js` - Electron context bridge (minimal, for localStorage access)

## Data Storage

Uses localStorage with keys:
- `studyData` - Today's statistics (minutes, count)
- `studyHistory` - Array of daily records (last 30 days)
- `lastStudyDate` - For detecting day changes

## Proxy Configuration (Windows)

If npm install fails due to network issues:
```bash
git config --global http.proxy http://127.0.0.1:6208
git config --global https.proxy http://127.0.0.1:6208
```

## UI Features

- Main timer (starts on button click, pauses on button click, saves on page unload)
- Pomodoro timer (independent, auto-starts main timer when started)
- Study statistics and history
- Circular reset button with hover animation