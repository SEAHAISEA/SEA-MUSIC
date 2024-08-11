import { defineStore } from 'pinia'
import useColor from '@renderer/hooks/useColor'
import useStorage from '@renderer/hooks/useStorage'

const { hsl2rgbORhex, colorReverse } = useColor()
const { getStorage, setStorage } = useStorage()

export const useThemeColorStore = defineStore('themeColor', {
  state: () => ({
    themeColor: '', // 默认主题颜色
    themeColorReverse: '',
    themeColorLightness: 0.8
  }),
  actions: {
    initThemeColor() {
      let themeColor = getStorage('themeColor')
      if (themeColor) {
        this.themeColor = themeColor[0]
        this.themeColorReverse = themeColor[1]
      } else {
        this.themeColor = '#000000'
        this.themeColorReverse = '#ffffff'
      }
    },
    setThemeColor(hue: number) {
      if (hue >= 360) {
        this.themeColor = '#000000' // 默认主题颜色
        this.themeColorReverse = '#ffffff'
      } else {
        let hslVal = <string>hsl2rgbORhex(hue, 1, this.themeColorLightness, 'h')
        this.themeColor = hslVal
        this.themeColorReverse = colorReverse(hslVal)
      }
    },
    setStorageThemeColor(){
      let themeColor = [this.themeColor, this.themeColorReverse];
      setStorage('themeColor', themeColor);
    }
  }
})
export default useThemeColorStore