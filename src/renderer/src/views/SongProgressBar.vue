<template>
    <el-row justify="center">
        <el-col :span="20" :lg="12" :offset="0">
            <!-- background-color: aqua; -->
            <div class="myFlexSpace_between" style="width: 100%;height: 44px;margin-top: 40px;">
                <div style="width: 90%;height: 44px;">
                    <!-- Progress -->
                    <div class="myFlex" style="width: 100%;">
                        <div class="range-wrapper" style="width: 98%;height:24px;">
                            <input type="range" step="1" max="60" value="0" class="range" data-range data-seek>
                            <div class="range-fill" data-range-fill></div>
                        </div>
                    </div>
                    <!-- running-time -->
                    <div id="duration-label" class="duration_label myFlexSpace_between" style="color: #000;">
                        <span class="label-md" data-running-time>0:00</span>
                        <span class="label-md" data-duration>1:00</span>
                    </div>
                </div>
                <!-- microphone -->
                <div class="myFlex" id="hover-microphone" style="width: 10%;height: 44px;font-size: 24px;color: #000;">
                    <el-icon>
                        <Microphone />
                    </el-icon>
                    <!-- volume -->
                    <div class="slider-volume-block" id="volume">
                        <el-slider v-model="songProgressBarStore.sliderVolumeValue" vertical height="100px"
                            @input="inputVolume" />
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import useThemeColorStore from '@renderer/stores/themeColor';
import { onMounted, onBeforeUnmount, watch } from 'vue';
import useSongProgressBarStore from '@renderer/stores/songProgressBar';
import useAudioStore from '@renderer/stores/audio';
const themeColorStore = useThemeColorStore();
const songProgressBarStore = useSongProgressBarStore();
const audioStore = useAudioStore();

// 音量
function inputVolume(e) {
    audioStore.audioContext.volume = e / 100;
    audioStore.audioContext.muted = false;
}


// 组件已挂载
onMounted(() => {

    const duration_label = <HTMLElement>document.getElementById('duration-label');

    audioStore.ranges = <HTMLInputElement>document.querySelector("[data-range]");
    const rangeFill = <HTMLInputElement>document.querySelector("[data-range-fill]");
    audioStore.ranges.style.backgroundColor = "#fff"; //滑块背景色
    rangeFill.style.backgroundColor = themeColorStore.themeColorReverse; //滑块色


    audioStore.ranges.addEventListener("input", audioStore.updateRangeFill);



    // 音量
    const microphone = <HTMLInputElement>document.getElementById('hover-microphone')
    const volume = <HTMLInputElement>document.getElementById('volume');

    microphone.addEventListener('mouseover', function () {
        volume.style.display = 'block';
    });

    microphone.addEventListener('mouseout', function () {
        volume.style.display = 'none';
    });

    microphone.style.color = themeColorStore.themeColorReverse;

    /** 播放音乐时更新运行时间 */
    audioStore.playerRunningTime = <HTMLSpanElement>document.querySelector("[data-running-time");
    /** 更新播放器持续时间 */
    audioStore.playerDuration = <HTMLInputElement>document.querySelector("[data-duration]");
    audioStore.playerSeekRange = <HTMLInputElement>document.querySelector("[data-seek]");

    audioStore.playerRunningTime.style.color = themeColorStore.themeColorReverse;
    audioStore.playerDuration.style.color = themeColorStore.themeColorReverse;


    audioStore.audioContext.addEventListener("loadeddata", audioStore.updateDuration);
    audioStore.playerSeekRange.addEventListener("input", audioStore.seek);
    

    watch(() => themeColorStore.themeColorReverse,
        (newColor) => {
            // 在这里可以根据新的 themeColor 的值执行相应的逻辑
            microphone.style.color = newColor;
            duration_label.style.color = newColor;
            rangeFill.style.backgroundColor = newColor;
            if (audioStore.playerRunningTime && audioStore.playerDuration) {
                audioStore.playerRunningTime.style.color = newColor;
                audioStore.playerDuration.style.color = newColor;
            }
            microphone.style.color = newColor;
        }
    )



});

onBeforeUnmount(() => {
    console.log('组件即将被卸载');
});


</script>

<style scoped>
input {
    width: 100%;
    background: none;
    border: none;
    font: inherit;
}


.range-wrapper {
    position: relative;
}


.range {
    appearance: none;
    cursor: pointer;
    border-radius: 50px;
}

.range::-webkit-slider-runnable-track {
    appearance: none;
    height: 6px;
    width: 100%;
    border-radius: 50px;
}


.range-fill {
    content: "";
    position: absolute;
    top: 11px;
    left: 0;
    width: 0;
    height: 6px;
    border-radius: 50px;
    pointer-events: none;
}

.range::-webkit-slider-thumb {
    appearance: none;
    background-color: #fff;
    width: 16px;
    height: 16px;
    margin-block-start: -5px;
    border-radius: 50px;
    transition: 200ms cubic-bezier(0.2, 0, 0, 1);
}

.range::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 12px hsla(200, 100%, 73%, 0.08);
}

.range::-webkit-slider-thumb:is(:focus, :focus-visible) {
    box-shadow: 0 0 0 12px hsla(200, 100%, 73%, 0.12);
}


.duration_label {
    justify-content: space-between;
    margin-block-start: 12px;

}

.label-md {
    font-size: 0.8rem;
    letter-spacing: 0.5px;
}

/* microphone */

#hover-microphone {
    cursor: pointer;
}

.slider-volume-block {
    position: absolute;
    top: -70%;
    display: none;
}
</style>