import { defineStore } from 'pinia'

export const useSongProgressBarStore = defineStore('songProgressBar', {
    state: () => ({
        sliderVolumeValue:50,
    })
})
export default useSongProgressBarStore