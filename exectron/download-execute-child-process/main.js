// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const fs = require('fs');
const { session } = require('electron');
const fetch = require('node-fetch');

const basePath = '/Users/lilonghe/Downloads/';
const serverFilePath = path.join(basePath, 'server');
const downloadURL = 'http://localhost:9091/simple-blog';
const serverProcess = require('child_process');

let mainWindow;
let spawn;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  checkServerFile(mainWindow);
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  session.defaultSession.on('will-download', (event, item, webContents) => {
    event.preventDefault()
    const url = item.getURL();
  
    fetch(url).then((res) => res.buffer()).then(res => {
      fs.writeFile(serverFilePath, res, 'binary', err => {
        if (!err) {
          executeServer(mainWindow);
        }
      })
    });
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    spawn?.kill()
    app.quit()
  }
})

function checkServerFile(win) {
  const exist = fs.existsSync(serverFilePath);
  if (!exist) {
    const contents = win.webContents;
    contents.downloadURL(downloadURL);
  } else {
    executeServer(win);
  }
}

function executeServer(win) {
  serverProcess.exec(`chmod +x ${serverFilePath}`, (err) => {
    if (!err) {
      spawn = serverProcess.spawn(`${serverFilePath}`);
      spawn.stdout.on('error', (err) => {
        console.log('err', err);
      });
      spawn.stdout.on('data',  data => {
        console.log(data.toString())
        win.webContents.send('server:start');
      })
    }
  })
}