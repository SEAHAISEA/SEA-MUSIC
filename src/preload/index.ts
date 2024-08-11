import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


// Custom APIs for renderer
// 渲染器的自定义 API
const api = {
  minimize: () => {
    ipcRenderer.invoke('minimize-window')
  },

  maximize: () => {
    ipcRenderer.invoke('maximize-window')
  },

  close: () => {
    ipcRenderer.invoke('close-window')
  },

  selectImgFile:  () => {
    let result = ipcRenderer.invoke('select-img-file').then((res)=>{return res}).catch((err)=>{return err});
    return result
  },
  selectAudioFile: ()=> {
    let result =   ipcRenderer.invoke('select-mp3-file').then((res)=>{return res}).catch((err)=>{return err});
    return result
  },
  checkUserPlayFileExists: (filePath:string)=> {
    let result =   ipcRenderer.invoke('check-file-exists',filePath).then((res)=>{return res}).catch((err)=>{return err});
    return result
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
//使用`contextBridge` API将Electron API暴露给
//仅当启用了上下文隔离时才渲染器，否则
//只需添加到DOM全局。

// 检查当前环境是否是Electron的contextIsolated模式。在这种模式下，渲染进程被沙箱化，不能直接访问Node.js的全部功能。
// 如果在contextIsolated模式下，使用contextBridge将electronAPI对象暴露给渲染进程的主世界。
// 这意味着在渲染进程中，开发者可以通过全局变量electron访问这些API。
//  同样地，将自定义的api对象暴露给渲染进程的主世界。
// 如果不是在contextIsolated模式下，直接将electronAPI和api作为全局变量赋值给window对象。

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
