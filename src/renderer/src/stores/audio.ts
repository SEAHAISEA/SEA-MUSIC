import { defineStore } from 'pinia'
import audio1 from '../../pubilc/mp3/0001.mp3'
import audio2 from '../../pubilc/mp3/0002.mp3'
import audio3 from '../../pubilc/mp3/0003.mp3'
import audio4 from '../../pubilc/mp3/0004.mp3'
import audio5 from '../../pubilc/mp3/0005.mp3'
import audio6 from '../../pubilc/mp3/0006.mp3'
import audio7 from '../../pubilc/mp3/0007.mp3'

export const useAudioStore = defineStore('audio', {
  state: () => ({
    musicData: [
      {
        songName: 'Be What You Wanna Be',
        songPath: audio1
      },
      {
        songName: 'HowYouMakeMeFeel',
        songPath: audio2
      },
      {
        songName: 'Mission Impossible',
        songPath: audio3
      },
      {
        songName: 'Natural',
        songPath: audio4
      },
      {
        songName: 'That girl',
        songPath: audio5
      },
      {
        songName: 'The Nights',
        songPath: audio6
      },
      {
        songName: 'unstoppable',
        songPath: audio7
      }
    ],

    userSongList_state: false,

    audioContext: new Audio(),
    currentMusic: 0,
    play_state: false,
    resumePlay_state: false,
    stop_icon_show: false,
    songLoop: false,
    isShuffled: false, //随机播放
    updateSong_state: false,

    // HTMLElement
    playSongElement: <HTMLImageElement | null>null,
    playerSeekRange: <HTMLInputElement | null>null,
    playerRunningTime: <HTMLSpanElement | null>null,
    playInterval: <unknown>null,
    ranges: <HTMLInputElement | null>null,
    nextSibling: <HTMLElement | null>null,
    rangeValue: 0,
    playerDuration: <HTMLElement | null>null,
    loopSetElement: <HTMLImageElement | null>null
  }),
  actions: {
    /**/
    startMusicPlay(stop_icon: string) {
      this.audioContext.play()
      this.updateSong_state = false
      this.play_state = true
      this.stop_icon_show = true
      if (this.playSongElement) {
        this.playSongElement.src = stop_icon
      }
      this.playInterval = setInterval(() => this.updateRunningTime(), 500)
    },
    pauseMusicPlay(play_icon: string) {
      this.audioContext.pause() //暂停播放
      this.stop_icon_show = false

      if (this.playSongElement) {
        this.playSongElement.src = play_icon
      }
      clearInterval(this.playInterval as unknown as number)
    },
    resumeMusicPlay(stop_icon: string) {
      this.audioContext.play() //恢复播放
      this.stop_icon_show = true
      if (this.playSongElement) {
        this.playSongElement.src = stop_icon
      }
      this.playInterval = setInterval(() => this.updateRunningTime(), 500)
    },
    updateRunningTime() {
      if (this.playerSeekRange && this.playerRunningTime) {
        this.playerSeekRange.value = this.audioContext.currentTime.toString()
        this.playerRunningTime.textContent = this.getTimecode(this.audioContext.currentTime)
        this.updateRangeFill()
        this.isMusicEnd()
      }
    },
    getTimecode(duration: number) {
      const minutes = Math.floor(duration / 60)
      const seconds = Math.ceil(duration - minutes * 60)
      const timecode = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      return timecode
    },
    updateRangeFill() {
      if (this.ranges)
        this.rangeValue = (parseInt(this.ranges.value) / parseInt(this.ranges.max)) * 100

      if (this.ranges) this.nextSibling = <HTMLElement>this.ranges.nextElementSibling

      if (this.nextSibling instanceof HTMLElement)
        this.nextSibling.style.width = `${this.rangeValue}%`
    },
    updateDuration() {
      if (this.playerSeekRange) {
        this.playerSeekRange.max = Math.ceil(this.audioContext.duration).toString()
      }
      if (this.playerSeekRange && this.playerDuration) {
        this.playerDuration.textContent = this.getTimecode(Number(this.playerSeekRange.max))
      }
    },
    isMusicEnd() {
      if (this.audioContext.ended) {
        this.audioContext.currentTime = 0
        if (this.playerSeekRange && this.playerRunningTime) {
          this.playerSeekRange.value = this.audioContext.currentTime.toString()
          this.playerRunningTime.textContent = this.getTimecode(this.audioContext.currentTime)
        }

        this.updateRangeFill()
        clearInterval(this.playInterval as unknown as number)

        if (this.songLoop) {
          this.singleLoop()
        } else {
          this.toggleSong(1)
        }
      }
    },

    // 单曲循环
    singleLoop() {
      this.audioContext.src = this.musicData[this.currentMusic].songPath
      this.updateSong_state = true
    },
    // 随机播放
    shuffleMusic() {
      const getRandomMusic = () => Math.floor(Math.random() * this.musicData.length)
      this.currentMusic = getRandomMusic()
    },
    // 下一首
    toggleSong(key: number) {
      if (this.isShuffled) {
        this.shuffleMusic()
      } else {
        if (key < 2) {
          // 播放下一首
          this.currentMusic >= this.musicData.length - 1
            ? (this.currentMusic = 0)
            : this.currentMusic++
        } else {
          // 播放上一首
          this.currentMusic <= 0
            ? (this.currentMusic = this.musicData.length - 1)
            : this.currentMusic--
        }
      }

      this.audioContext.addEventListener('loadeddata', this.updateDuration)
      this.updateSong()
    },
    updateSong() {
      this.audioContext.pause()
      if (this.playerSeekRange && this.playerRunningTime) {
        this.playerSeekRange.value = '0'
        this.playerRunningTime.textContent = this.getTimecode(0)
      }
      this.updateRangeFill()
      clearInterval(this.playInterval as unknown as number)
      setTimeout(() => {
        this.updateSong_state = true
        this.audioContext.src = this.musicData[this.currentMusic].songPath
      }, 300)
    },
    // 滑动播放位置
    seek() {
      if (this.playerSeekRange && this.playerRunningTime && this.playerSeekRange) {
        this.audioContext.currentTime = Number(this.playerSeekRange.value)
        this.playerRunningTime.textContent = this.getTimecode(Number(this.playerSeekRange.value))
      }
    },
    loopSet(icon: string, key: number) {
      if (this.loopSetElement) {
        this.loopSetElement.src = icon
      }

      switch (key) {
        // 单曲循环
        case 1:
          this.songLoop = true
          break
        // 循环
        case 2:
          this.songLoop = false
          this.isShuffled = false
          break
        // 随机
        case 3:
          this.songLoop = false
          this.isShuffled = true
          break
      }
    }
    // -------end
  }
})
export default useAudioStore
