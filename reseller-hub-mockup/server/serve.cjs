/**
 * ResellerHub 靜態檔案伺服器
 * 純 Node.js 內建模組，不依賴任何 npm 套件
 * 雙擊 .exe 即可啟動 web server + 自動打開瀏覽器
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const PORT = 3456

// MIME type 對應表
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
}

// pkg 打包後靜態檔案的根目錄
// pkg 會把 snapshot 路徑映射到虛擬檔案系統
const DIST_DIR = path.join(__dirname, '..', 'dist')

/**
 * 讀取檔案並回傳
 */
function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  try {
    const data = fs.readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': contentType })
    res.end(data)
  } catch {
    return false
  }
  return true
}

/**
 * HTTP 請求處理
 * SPA routing：找不到檔案時 fallback 到 index.html
 */
function handleRequest(req, res) {
  let urlPath = req.url.split('?')[0] // 移除 query string

  // 根路徑導向 index.html
  if (urlPath === '/') {
    urlPath = '/index.html'
  }

  const filePath = path.join(DIST_DIR, urlPath)

  // 嘗試直接讀取檔案
  if (serveFile(res, filePath)) return

  // 找不到 → SPA fallback 到 index.html
  const indexPath = path.join(DIST_DIR, 'index.html')
  if (serveFile(res, indexPath)) return

  // 連 index.html 都沒有
  res.writeHead(404, { 'Content-Type': 'text/plain' })
  res.end('404 Not Found')
}

/**
 * 自動打開瀏覽器（跨平台）
 */
function openBrowser(url) {
  const platform = process.platform
  const cmd =
    platform === 'win32' ? `start ${url}` :
    platform === 'darwin' ? `open ${url}` :
    `xdg-open ${url}`
  exec(cmd)
}

// 啟動伺服器
const server = http.createServer(handleRequest)

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`

  console.log('')
  console.log('  ╔════════════════════════════════════════╗')
  console.log('  ║                                        ║')
  console.log('  ║   ResellerHub Server is running!       ║')
  console.log(`  ║   Open: ${url}            ║`)
  console.log('  ║   Press Ctrl+C to stop                 ║')
  console.log('  ║                                        ║')
  console.log('  ╚════════════════════════════════════════╝')
  console.log('')

  openBrowser(url)
})

// 優雅關閉
process.on('SIGINT', () => {
  console.log('\n  Server stopped.')
  server.close()
  process.exit(0)
})
