<template>
    <el-row justify="center">
        <el-col :span="24" :lg="16" :offset="0">
            <div class="myFlex menu_box">
                <div class="myFlexSpace_between" style="width:90%;height:44px">
                    <div v-for="button in muneStore.buttons" :key="button.id" class="btn_icon_box myFlex"
                        @click="handleButtonClick(button.id)">
                        <img :src="button.icon" :id="button.id" alt="" class="btn_icon">
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    <!--   -->
    <div v-show="muneStore.showLoopSetBox" class="loop_set">
        <div v-for="loopSetIcon in muneStore.loopSetIcon" :key="loopSetIcon.id" :id="loopSetIcon.id"
            class="width_100 myFlex" @click="handleLoopSetClick(loopSetIcon.id)">
            <img :src="loopSetIcon.icon" alt="" class="loopSet_icon">
        </div>
        <div class="circle_with_x" id="circle-with-x">
            X
        </div>
    </div>

    <!-- 设置 -->
    <teleport to="body">
        <div v-show="muneStore.showMenuBox" class="overlay">
            <div class="positionCenter">

                <div class="set_box myFlex">
                    <div class="set_box_child myFlex">
                        <el-button color="#167df5" size="large" @click="toggleLanguage">{{ muneStore.btnText[0]
                            }}</el-button>
                    </div>

                    <div class="set_box_child myFlex">
                        <el-button color="#167df5" size="large" @click="toggleThemeColor">{{ muneStore.btnText[1]
                            }}</el-button>
                    </div>
                    <!--  -->
                    <div class="set_box_child myFlex">
                        <el-button color="#167df5" size="large" @click="toggleBackgroundImage">{{ muneStore.btnText[2]
                            }}</el-button>
                    </div>
                    <!--  -->
                    <div class="set_box_child myFlex">
                        <el-button type="info" size="large" @click="closeMenuBox">{{ muneStore.btnText[3] }}</el-button>
                    </div>
                    <!--  -->
                    <div style="height: 24;font-size: 14px;font-weight: 600;">
                        <p>Author : hsfanrice@outlook.com</p>
                    </div>
                </div>
            </div>
        </div>
    </teleport>


    <!-- Theme Color -->

    <teleport to="body">
        <div v-show="muneStore.showThemeColorBox" class="overlay">
            <div class="positionCenter">
                <div class="set_box myFlex">
                    <!--  -->
                    <div id="selectColorType" style="width: 100%;" class="myFlex">
                        <div class="myFlexSpace_between" style="width: 80%;">
                            <div class="myFlex">
                                <input class="custom-radio-input" type="radio" id="dark" />
                                <label for="dark">{{ muneStore.colorRadioText[0] }}</label>
                            </div>

                            <div class="myFlex">
                                <input class="custom-radio-input" type="radio" checked="true" id="light" />
                                <label for="light">{{ muneStore.colorRadioText[1] }}</label>
                            </div>
                        </div>
                    </div>

                    <!--  -->

                    <div class="myFlex width_100">
                        <div class="width_80">
                            <div class="slider_view">
                                <div class="hsl_bg"></div>
                                <div class="width_100">
                                    <input class="width_100" data-color type="range" value="360" min="0" max="360">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!--  -->
                    <div class="myFlex" style="margin-top: 120px;">
                        <el-button type="info" size="large" @click="closeThemeColorBox">{{ muneStore.colorRadioText[2]
                            }}</el-button>
                    </div>

                </div>
            </div>
        </div>

    </teleport>

    <!-- song-list  v-show="muneStore.showSongListBox"-->
    <teleport to="body">
        <div v-show="muneStore.showSongListBox" class="overlay">
            <div class="positionCenter">
                <div class="scroll_container myFlex">
                    <div class="scroll_list" style="margin-bottom: 20px;">

                        <div v-for="(musicData, index) in audioStore.musicData" :key="index" class="myFlexSpace_between"
                            style="height: 24px;" :class="marginTop(index)">

                            <!--  -->
                            <div style="width: 10%;" class="myFlex">
                                <input class="custom-radio-input" type="radio" :value="index"
                                    v-model="muneStore.selectedMusicIndex" @click="handleMusicSelect(index)" />
                            </div>
                            <!--  -->
                            <div style="width: 80%;" class="myFlex">
                                <span class="ellipsis" style="height: 24px;">{{ musicData.songName }}</span>
                            </div>
                        </div>

                    </div>
                </div>
                <!--  -->
                <div class="width_100 myFlex">
                    <div class="myFlexSpace_between width_80" style="margin-top: 30px;">
                        <el-button color="#167df5" size="large" @click="addSongList">{{ muneStore.songListText[0]
                            }}</el-button>

                        <div v-show="audioStore.userSongList_state">
                            <el-button type="danger" size="large" @click="deleteUserSongList">{{
                                muneStore.songListText[1]
                                }}</el-button>
                        </div>

                        <el-button type="info" size="large" @click="closeSongListBox">{{ muneStore.songListText[2]
                            }}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </teleport>

</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue';
import useMenuStore from '@renderer/stores/menu';
import useStorage from '@renderer/hooks/useStorage';
import useThemeColorStore from '@renderer/stores/themeColor';
import useBackgroundImageStore from '@renderer/stores/backgroundImage';
import useAudioStore from '@renderer/stores/audio';
import useSongNameStore from '@renderer/stores/songName';



const themeColorStore = useThemeColorStore();
const backgroundImageStore = useBackgroundImageStore();
const songNameStore = useSongNameStore();

const muneStore = useMenuStore();
const audioStore = useAudioStore();
// clearStorage,
const { setStorage, getStorage, removeStorage } = useStorage();


function closeMenuBox() {
    muneStore.showMenuBox = false;
}

function closeSongListBox() {
    muneStore.showSongListBox = false;
}

function closeThemeColorBox() {
    themeColorStore.setStorageThemeColor();
    muneStore.showThemeColorBox = false;
}

// 设置 -----------------------------------------------------

// EN | 中文 
function toggleLanguage() {
    let languageType = getStorage('languageType');
    if (languageType) {
        if (languageType === 'en') {
            muneStore.btnText = muneStore.btnText_zh;
            muneStore.colorRadioText = muneStore.colorRadioText_zh;
            muneStore.songListText = muneStore.songListText_zh;
            setStorage('languageType', 'zh');
        } else {
            muneStore.btnText = muneStore.btnText_en;
            muneStore.colorRadioText = muneStore.colorRadioText_en;
            muneStore.songListText = muneStore.songListText_en
            setStorage('languageType', 'en');
        }
    } else {
        muneStore.btnText = muneStore.btnText_en;
        muneStore.colorRadioText = muneStore.colorRadioText_en;
        muneStore.songListText = muneStore.songListText_en
        setStorage('languageType', 'en');
    }
}


//--------------------------------- toggleThemeColor

function toggleThemeColor() {
    closeMenuBox();
    muneStore.showThemeColorBox = true;

}

const addEventOnElements = (elements: HTMLElement[], eventType: string, callback: (elements: HTMLElement[], event: Event) => void): void => {
    elements.forEach(element => {
        // element.addEventListener(eventType, callback);
        element.addEventListener(eventType, event => {
            callback(elements, event);
        });
    });
};

// 定义事件处理函数
const handleRadioClickColorType = (elements: HTMLElement[], event: Event) => {
    const targetId = (event.target as HTMLElement).id;
    // 这里可以添加更多的逻辑处理
    const colorT1 = <HTMLInputElement>elements[0];
    const colorT2 = <HTMLInputElement>elements[1];
    if (targetId === 'dark') {
        colorT2.checked = false;
        themeColorStore.themeColorLightness = 0.5;
    } else {
        colorT1.checked = false;
        themeColorStore.themeColorLightness = 0.8;
    }
};

// hsla(hue, saturation, lightness)

const getThemeColorhue = (elements: HTMLElement[]) => {
    const hueVal = <HTMLInputElement>elements[0];
    let val = Number(hueVal.value);
    themeColorStore.setThemeColor(val);
}



//---------------------------------  toggleBackgroundImage
async function toggleBackgroundImage() {
    closeMenuBox();
    let file = await (window.api as any).selectImgFile();

    if (file) {
        const img = new Image();
        img.onload = function () {
            let imgRatio = ref(1);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = 375;
            tempCanvas.height = 375;
            const tempCtx = tempCanvas.getContext('2d');
            // 在图片加载完成后获取宽和高
            const originalWidth = img.naturalWidth;
            const originalHeight = img.naturalHeight;
            let local = calculate(originalWidth, originalHeight, 375, 677);

            while (local.pw < 375 || local.ph < 375) {
                imgRatio.value += 0.1;
                local.pw = Math.ceil(local.pw * imgRatio.value);
                local.ph = Math.ceil(local.ph * imgRatio.value);
            };
            if (tempCtx !== null) {

                if (local.pw == 375 && local.ph == 375) {
                    tempCtx.drawImage(img, 0, 0, 375, 375);
                } else {
                    let dy = Math.ceil((local.ph - 375) / 2) * -1
                    tempCtx.drawImage(img, 0, dy, Math.trunc(local.pw), Math.trunc(
                        local.ph));
                };
                // let imgSrc = tempCanvas.toDataURL();
                // console.log(imgSrc)
                backgroundImageStore.imageUrl = tempCanvas.toDataURL();

            };

        };
        img.src = file;
    }
}





function calculate(pw: number, ph: number, w: number, h: number) {
    let uu = 0;
    if (ph / pw > h / w) {
        uu = ph;
        ph = h;
        pw = (pw * h / uu);
    } else {
        uu = pw;
        pw = w;
        ph = (ph * pw / uu);
    }
    return {
        pw,
        ph
    }
}

// song-list


function marginTop(index: number) {
    return index > 0 ? 'marginTop_10' : 'marginTop_60';
}






// 组件已挂载
onMounted(() => {
    // clearStorage()
    // 1.设置语言
    muneStore.initSetLanguage();

    // 2.设置颜色
    muneStore.setButtonsIconColor(themeColorStore.themeColorReverse);

    const colorTypeRadioButtons: HTMLInputElement[] = [
        <HTMLInputElement>document.getElementById('dark'),
        <HTMLInputElement>document.getElementById('light')
    ];
    addEventOnElements(colorTypeRadioButtons, 'click', handleRadioClickColorType);

    const rangesColorHue: HTMLInputElement[] = [
        <HTMLInputElement>document.querySelector("[data-color]")
    ];
    addEventOnElements(rangesColorHue, 'input', getThemeColorhue);


    // 设置按钮颜色
    watch(() => themeColorStore.themeColorReverse,
        (newColor) => {
            muneStore.setButtonsIconColor(newColor);
        }
    )


    // 3.音乐播放
    let userSongList = getStorage('userSongList');
    if (userSongList) {
        audioStore.musicData = audioStore.musicData.concat(userSongList)
        audioStore.userSongList_state = true
    }

    audioStore.playSongElement = <HTMLImageElement>document.getElementById('play-song');
    audioStore.loopSetElement = <HTMLImageElement>document.getElementById('loop-set');
    audioStore.audioContext.src = audioStore.musicData[audioStore.currentMusic].songPath;
    songNameStore.songName = audioStore.musicData[audioStore.currentMusic].songName;


    const circlesWithX = <HTMLImageElement>document.getElementById('circle-with-x');

    circlesWithX.addEventListener('click', () => {
        muneStore.showLoopSetBox = false;
    });

    audioStore.audioContext.addEventListener('canplaythrough', function () {
        // audioStore.audioContext.play()
        // 音频加载完成后可以调用play方法播放
        // 下一首
        if (audioStore.updateSong_state) {
            audioStore.startMusicPlay(muneStore.stop_icon);
            audioStore.resumePlay_state = false;
        }
    });
    // 监听错误事件
    audioStore.audioContext.addEventListener('error', function () {
        // console.log('音频文件加载失败' + e);
        if (audioStore.musicData.length > 7) {
            deleteUserSongList()
            audioStore.currentMusic = 0;
            audioStore.audioContext.src = audioStore.musicData[0].songPath
            audioStore.updateSong()
        } else {
            audioStore.currentMusic = 0;
            audioStore.musicData = [];
            alert('添加音乐(Add Song)')
        }

    });

})


// 底部点击按钮的方法
const handleButtonClick = (id: string) => {
    switch (id) {
        case 'set':
            if (audioStore.stop_icon_show) {
                audioStore.pauseMusicPlay(muneStore.buttons[2].icon); //暂停播放
                audioStore.resumePlay_state = true
            }
            muneStore.showMenuBox = true;
            break;
        case 'previous-song':
            audioStore.toggleSong(2)
            break;
        case 'play-song':
            if (!audioStore.play_state) {
                audioStore.startMusicPlay(muneStore.stop_icon)
            } else {
                if (audioStore.resumePlay_state) {
                    audioStore.resumePlay_state = false
                    audioStore.resumeMusicPlay(muneStore.stop_icon)
                } else {
                    audioStore.resumePlay_state = true
                    audioStore.pauseMusicPlay(muneStore.buttons[2].icon)
                }
            }
            break;
        case 'next-song':
            audioStore.toggleSong(1)
            break;
        case 'list-song':
            muneStore.showSongListBox = true;
            break;
        case 'loop-set':
            if (muneStore.showLoopSetBox) {
                muneStore.showLoopSetBox = false;
            } else {
                muneStore.showLoopSetBox = true;
            }
            break;

    }
};



// 歌曲循环设置
const handleLoopSetClick = (id: string) => {
    switch (id) {
        case 'single-loop':
            audioStore.loopSet(muneStore.loopSetIcon[0].icon, 1)
            break;
        case 'list-loops':
            audioStore.loopSet(muneStore.loopSetIcon[1].icon, 2)
            break;
        case 'shuffle':
            audioStore.loopSet(muneStore.loopSetIcon[2].icon, 3)
            break;
    }
}

// 歌曲列表
const handleMusicSelect = (index: number) => {
    audioStore.currentMusic = index;
    audioStore.audioContext.src = audioStore.musicData[index].songPath
    audioStore.updateSong()
}

// 添加歌曲
function addSongList() {
    type Song = {
        songName: string;
        songPath: string;
    };
    let userSongList: Song[] | null = getStorage('userSongList');
    // setStorage, getStorage 
    (window.api as any).selectAudioFile().then(files => {
        if (files) {
            if (Array.isArray(userSongList)) {
                files.forEach((file) => {
                    userSongList?.push({
                        songName: file.fileName,
                        songPath: file.filePath,
                    })
                })
                audioStore.musicData = audioStore.musicData.concat(userSongList)
                setStorage('userSongList', userSongList)
            } else {
                userSongList = [];
                files.forEach((file, index) => {
                    if (userSongList)
                        userSongList[index] = {
                            songName: file.fileName,
                            songPath: file.filePath,
                        }

                })
                audioStore.userSongList_state = true
                audioStore.musicData = audioStore.musicData.concat(userSongList)
                setStorage('userSongList', userSongList)
            }
        }
    }).catch(error => {
        // 处理error'
        alert(error)
    });
}


// 删除添加歌曲
function deleteUserSongList() {
    removeStorage('userSongList')
    audioStore.userSongList_state = false
    audioStore.musicData = audioStore.musicData.slice(0, 7)
}



</script>

<style scoped>
.menu_box {
    width: 100%;
    height: 44px;
    margin-top: 60px;
}

.btn_icon_box {
    width: 44px;
    height: 44px;
}

.btn_icon {
    border-radius: 50%;
    width: 36px;
    height: 36px;
    transition: transform 0.5s ease;
    /* 动画效果 */
}

.btn_icon:hover {
    background-color: var(--transparent-white);
    transform: scale(1.2);
    /* 放大到原来的120% */
}

.loop_set {
    position: absolute;
    width: 100px;
    height: 160px;
    background-color: rgba(255, 255, 255, 0.4);
    /* position: absolute;*/
    right: 30px;
    top: 380px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

}

.circle_with_x {
    position: absolute;
    right: -5px;
    top: -8px;
    width: 24px;
    height: 24px;
    background-color: red;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
}

.loopSet_icon {
    width: 100%;
    height: 36px;
    margin: 10px 0;
}

.loopSet_icon:hover {
    background-color: #aaaaaa;
}

/*  */

.overlay {
    background-color: rgba(0, 0, 0, 0.3);
    height: 100%;
    left: 0;
    position: fixed;
    top: 44px;
    width: 100%;
    z-index: 9999;
    user-select: none;
    -webkit-user-select: none;
}

.positionCenter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.set_box {
    width: 250px;
    height: 350px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
}

.set_box_child {
    flex: 1;
    height: 44px;
    width: 100%;
}

/*  */

.custom-radio-input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 24px;
    height: 24px;
    border: 2px solid #ddd;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    position: relative;
    vertical-align: middle;
    margin-right: 10px;
    transition: 0.2s all linear;
}

.custom-radio-input:checked {
    background-color: #167df5;
    border-color: #167df5;
    border: 3px solid #fff;
}


/*  */
.slider_view {
    position: relative;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;

}

.hsl_bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -9;
    height: 20px;
    background: linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #000000 100%);
    border-radius: 10%;
}

/* songlist */

.scroll_container {
    width: 450px;
    height: 400px;
    overflow-y: scroll;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
}

.scroll_container::-webkit-scrollbar {
    width: 10px;
}

.scroll_container::-webkit-scrollbar-thumb {
    background-color: #167df5;
    border-radius: 2px;
}


.scroll_list {
    list-style: none;
    width: 90%;
    height: 100%;
    /* background-color: #0000ff; */
}

.marginTop_60 {
    margin-top: 30px;
}

.marginTop_10 {
    margin-top: 20px;
    margin-bottom: 20px;
}


.delete_icon {
    width: 10%;
    height: 24px;
    font-size: 18px;
    color: #ff0000;
    border-radius: 10px;
}

.delete_icon:hover {
    background-color: #aaaaaa;
}


@media (min-width:1200px) {
    .menu_box {
        margin-top: 100px;
    }

    .btn_icon_box {
        width: 64px;
        height: 64px;
    }

    .btn_icon {
        width: 54px;
        height: 54px;
    }

    .set_box {
        width: 350px;
        height: 450px;
    }

    .loop_set {
        right: 370px;
        top: 680px;
    }
}
</style>