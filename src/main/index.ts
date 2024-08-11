import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.ico?asset'
import fs from 'fs'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  //创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      // devTools:false,//打包设置
    },
    icon: icon,
    titleBarStyle: 'hidden',
    resizable: false //禁止缩放
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // mainWindow.webContents.openDevTools()
  
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  //基于electronic-vite-cli的渲染器HMR。
  //加载用于开发的远程URL或用于生产的本地html文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

//当Electron完成时，将调用此方法
//初始化并准备创建浏览器窗口。
//某些API只能在此事件发生后使用。

app.whenReady().then(() => {
  // Set app user model id for windows
  // 为 Windows 设置应用用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // 默认情况下，在开发中按 F12 打开或关闭 DevTools
  // 并忽略生产中的 CommandOrControl + R。
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()
  handleIPC()
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // 在macOS上，当出现以下情况时，通常会在应用程序中重新创建窗口
    // 单击dock图标后，没有其他打开的窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
//关闭所有窗口后退出，macOS除外。在那里，这很常见
//让应用程序及其菜单栏保持活动状态，直到用户退出
//显式使用Cmd+Q。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function handleIPC() {
  ipcMain.handle('minimize-window', () => {
    mainWindow.minimize()
  })

  ipcMain.handle('maximize-window', () => {
    if (!mainWindow.isMaximized()) {
      mainWindow.maximize()
    } else {
      mainWindow.unmaximize()
    }
  })

  ipcMain.handle('close-window', () => {
    mainWindow.close()
  })

  ipcMain.handle('select-img-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select image file',
      // 'multiSelections': 这个选项允许用户选择多个文件。
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg'] }]
    })
    if (result.filePaths.length > 0) {
      return new Promise((resolve, reject) => {
        fs.readFile(result.filePaths[0], (err, data) => {
          if (err) {
            reject('')
          } else {
            resolve('data:image/png;base64,' + data.toString('base64'))
          }
        })
      })
    } else {
      return ''
    }
  })

  //
  ipcMain.handle('select-mp3-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
      title: 'Select mp3 file',
      // 'multiSelections': 这个选项允许用户选择多个文件。
      properties: ['openFile', 'multiSelections'],
      filters: [{ name: 'MP3 Files', extensions: ['mp3'] }]
    })

    if (result.filePaths.length > 0) {
      let filesInfo: { filePath: string; fileName: string }[] = []
      // 遍历所有选中的文件路径
      for (let filePath of result.filePaths) {
        // 使用 path 模块提取文件名
        let fileName = require('path')
          .basename(filePath)
          .replace(/\.[^/.]+$/, '') as string
        // 将文件路径和文件名作为一个对象推入数组
        filesInfo.push({
          // filePath: require('path').dirname(filePath),
          // filePath: filePath.replace(/\\/g, '/'),
          filePath: filePath,
          fileName
        })
      }
      return filesInfo
    }
    return null
  })
// ---end
}
