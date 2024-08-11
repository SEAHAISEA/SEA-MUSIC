import { defineStore } from 'pinia'
import useStorage from '@renderer/hooks/useStorage'

import bgImg from '../../pubilc/image_5.png'


const { getStorage, setStorage } = useStorage()

export const useBackgroundImageStore = defineStore('backgroundImage', {
  state: () => ({
    imageUrl: ''
  }),
  actions: {
    initBackgroundImage() {
      let bgImgData = getStorage('bgImgData')
      if (bgImgData) {
        this.imageUrl = bgImgData
      } else {
        this.imageUrl = bgImg
      }
    },
    setStorageBgImgData(bgImgData: string) {
      setStorage('bgImgData', bgImgData)
    }
  }
})
export default useBackgroundImageStore