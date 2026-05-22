# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Study Timer - A desktop/web application for tracking study time with Pomodoro functionality and floating timer window.

## Commands

- **Run locally**: `npm start` (requires Electron installed via `npm install`)
- **Build portable exe**: `npx electron-builder --win portable`
- **Build installer**: `npm run dist`

## Architecture

Multi-window Electron application with localStorage-based data persistence.

Key files:
- `index.html` - Main UI (timer, pomodoro, floating window toggle)
- `stats.html` - Secondary page (today stats, weekly summary, 30-day history)
- `floating.html` - Always-on-top floating timer (frameless, draggable)
- `main.js` - Electron main process (window creation, IPC handlers)
- `preload.js` - Context bridge for IPC communication

## Data Storage

Uses localStorage with keys:
- `currentSessionSeconds` - Current timer value
- `isRunning` - Timer running state
- `studyHistory` - Array of daily records `{date, minutes, count}` (last 30 days)
- `floatingClosed` - Timestamp marker for sync between main and floating windows

## UI Features

- Main timer with start/pause controls
- Pomodoro timer (auto-starts main timer)
- Floating timer window (always-on-top, draggable, closable)
- Stats page with history and reset functionality