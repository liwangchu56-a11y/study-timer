# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Study Timer - A desktop/web Electron application for tracking study time with Pomodoro functionality and floating timer window.

## Commands

- **Run locally**: `npm start`
- **Build portable exe**: `npm run dist:portable`
- **Build installer**: `npm run dist`

## Project Structure

```
├── src/                    # 页面文件
│   ├── index.html          # 主窗口
│   ├── floating.html       # 悬浮计时器窗口
│   └── stats.html          # 统计页面
├── electron/               # Electron 主进程
│   ├── main.js             # 主进程入口
│   └── preload.js          # 预加载脚本
├── styles/                 # 共享样式
│   └── common.css          # 公共 CSS 样式
├── js/                     # 公共脚本
│   └── constants.js        # 常量定义 (localStorage keys)
├── package.json
└── CLAUDE.md
```

## Architecture

Multi-window Electron application with localStorage-based data persistence. All renderer processes share localStorage for state synchronization.

### Window Architecture
- **mainWindow** - Main application window (src/index.html)
- **floatWindow** - Always-on-top floating timer (src/floating.html)
- **stats.html** - Statistics page (src/stats.html, read-only, accessed via link from main)

### IPC Communication
Renderer-to-main communication via `ipcRenderer.send()` through preload context bridge (`window.electronAPI`):
- `createFloatingWindow()` / `closeFloatingWindow()`

## Pomodoro Settings

Settings are stored in localStorage under `pomodoroSettings` key:
- `cycleCount` - Number of pomodoro cycles (1-99, default 1)
- Note: Work/break duration is set directly on index.html inputs, not persisted

## Data Storage

localStorage keys (defined in `js/constants.js`):
- `currentSessionSeconds` - Current timer elapsed seconds
- `isRunning` - Timer running state ("true"/"false")
- `timerStartTime` - Timestamp when timer started (for recovery after app restart)
- `lastStudyDate` - Previous study date (for detecting day changes)
- `studyHistory` - Array of `{date, minutes, count}` records (max 30 days)
- `floatingClosed` - Timestamp when floating window was closed
- `mainReset` - Timestamp signal from stats page to reset main timer
- `pomodoroSettings` - JSON object with pomodoro cycle count

## Timer Architecture

The timer uses an offset-based approach: instead of incrementing a counter, it calculates `elapsedSeconds = Date.now() - timerStartTime`. This allows:
1. Accurate timing even if the display doesn't update every second
2. Timer recovery after app restart (timerStartTime is persisted)

### Initialization Flow (src/index.html)
1. Variables declared at top: `lastMainReset`, `lastFloatingClosed`
2. `init()` function called:
   - Checks if `lastStudyDate !== today` → resets timer state
   - Calls `checkDayChange()` to save previous day's data
   - Restores timer if `isRunning === 'true'` and `timerStartTime` exists
3. setInterval polls every 500ms for:
   - Floating window close signal
   - Stats page reset signal

### Day Change Detection
`checkDayChange()` compares `lastStudyDate` with today's date. When they differ:
1. Previous day's data is saved via `saveDailyData()`
2. `lastStudyDate` is updated to today
3. Timer is reset if it was running

## Key Files

- `src/index.html` - Main UI with timer, pomodoro, floating toggle
- `src/stats.html` - Statistics page with history and reset
- `src/floating.html` - Frameless draggable floating timer
- `electron/main.js` - Electron main process
- `electron/preload.js` - Context bridge exposing electronAPI
- `js/constants.js` - Shared constants and localStorage keys
- `styles/common.css` - Shared CSS styles
