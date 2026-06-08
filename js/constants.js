/**
 * 共享常量定义
 */
const STORAGE_KEYS = {
  // 计时器状态
  CURRENT_SESSION_SECONDS: 'currentSessionSeconds',
  IS_RUNNING: 'isRunning',
  TIMER_START_TIME: 'timerStartTime',

  // 日期相关
  LAST_STUDY_DATE: 'lastStudyDate',

  // 学习历史
  STUDY_HISTORY: 'studyHistory',

  // 番茄钟设置
  POMODORO_SETTINGS: 'pomodoroSettings',

  // 窗口状态
  FLOATING_CLOSED: 'floatingClosed',
  MAIN_RESET: 'mainReset'
};

// 默认设置
const DEFAULT_SETTINGS = {
  POMODORO_CYCLE_COUNT: 1,
  WORK_TIME: 25,
  BREAK_TIME: 5
};
