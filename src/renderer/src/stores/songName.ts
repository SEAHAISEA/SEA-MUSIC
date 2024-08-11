import { defineStore } from 'pinia'

export const useSongNameStore = defineStore('songName', {
    state: () => ({
        songName:'',
    })
})
export default useSongNameStore