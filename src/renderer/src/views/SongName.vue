<template>
    <el-row justify="center">
        <el-col :span="12" :gl="12" :offset="0">
            <div id="song-name" class="myFlex song_name_box" style="width: 100%;height: 44px;color: #000;font-weight: 900;">
                <span class="myFlex ellipsis">{{ songNameStore.songName }}</span>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import  useThemeColorStore  from '@renderer/stores/themeColor';
import useSongNameStore from '@renderer/stores/songName';
import useAudioStore from '@renderer/stores/audio';
const themeColorStore = useThemeColorStore();
const songNameStore = useSongNameStore();
const audioStore = useAudioStore();



onMounted(() => {


    let songName = <HTMLElement>document.getElementById('song-name');
        songName.style.color = themeColorStore.themeColorReverse;

    watch(() => themeColorStore.themeColorReverse,
        (newColor) => {
            // 在这里可以根据新的 themeColor 的值执行相应的逻辑
            songName.style.color = newColor;
        }
    )

    // 修改歌名
    watch(() => audioStore.currentMusic,
        (currentMusic) => {
            songNameStore.songName = audioStore.musicData[currentMusic].songName;
        }
    )
})


</script>

<style scoped>
.song_name_box {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 16px;
    height: 44px;
    z-index: 9;
}

@media (min-width:1200px) {
    .song_name_box {
        top: 60px;
        font-size: 22px;
    }

}
</style>