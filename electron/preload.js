const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createFloatingWindow: () => ipcRenderer.send('create-floating-window'),
  closeFloatingWindow: () => ipcRenderer.send('close-floating-window')
});