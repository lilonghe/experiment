const { ipcRenderer } = require("electron");

/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 * 
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  document.body.innerText = "启动中";
})


ipcRenderer.on('server:start', () => {
  document.body.innerText = "已启动";
})