import { defineStore } from 'pinia'

export const useTitleBarStore = defineStore('', {
  state: () => ({
    datatype: ''
  }),
  actions: {
    userActionWindow(actionType: string) {
      switch (actionType) {
        case 'min':
          ;(window.api as any).minimize()
          // console.log('执行最小化操作')
          break
        case 'max':
          ;(window.api as any).maximize()
          // console.log('执行最大化操作')
          break
        case 'clo':
          ;(window.api as any).close()
          // console.log('执行关闭操作')
          break
      }
    }
  },
  getters: {}
})
export default useTitleBarStore