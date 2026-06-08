const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let floatWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 450,
    height: 760,
    resizable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

   mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
}

function createFloatingWindow() {
  if (floatWindow && !floatWindow.isDestroyed()) {
    return;
  }

  floatWindow = new BrowserWindow({
    width: 160,
    height: 50,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    movable: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

   floatWindow.loadFile(path.join(__dirname, '../src/floating.html'));
  floatWindow.setPosition(100, 100);

  floatWindow.on('closed', () => {
    floatWindow = null;
  });
}

function closeFloatingWindow() {
  if (floatWindow && !floatWindow.isDestroyed()) {
    floatWindow.close();
    floatWindow = null;
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// 处理渲染进程请求
ipcMain.on('create-floating-window', () => {
  createFloatingWindow();
});

ipcMain.on('close-floating-window', () => {
  closeFloatingWindow();
});