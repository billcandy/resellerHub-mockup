/**
 * Electron 主程序
 * 載入 Vite build 產生的靜態檔案，作為離線桌面應用
 */
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    title: 'Reseller Hub',
    icon: path.join(__dirname, '..', 'public', 'favicon.svg'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  // 載入 Vite build 產生的 index.html
  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'))

  // 隱藏預設選單列
  win.setMenuBarVisibility(false)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
