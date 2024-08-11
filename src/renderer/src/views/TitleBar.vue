<template>

    <div class="fixed-top">
        <div id="title-bar">
            <div id="left-icons">
                <img :src="logo" alt="Logo" id="logo">
                <div id="app-name" style="font-weight: 900;">SEA-MUSIC</div>
            </div>
            <!--  -->
            <div id="right-buttons">
                <div id="minimize-button" class="minimize_button myFlex" datatype="min" @click="windowSet">
                    <el-icon>
                        <Minus />
                    </el-icon>
                </div>
                <!--  -->
                <div id="maximize-button" class="maximize_button myFlex" datatype="max" @click="windowSet">
                    <el-icon>
                        <FullScreen />
                    </el-icon>
                </div>
                <!--  -->
                <div id="close-button" class="close_button myFlex" datatype="clo" @click="windowSet">
                    <el-icon>
                        <CloseBold />
                    </el-icon>
                </div>
            </div>
            <!--  -->
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from '../../pubilc/logo.png'

import useTitleBarStore from '@renderer/stores/titleBar';
import useThemeColorStore from '@renderer/stores/themeColor';
import { onMounted, watch } from 'vue';
const titleBarStore = useTitleBarStore();
const themeColorStore = useThemeColorStore();

function windowSet(e) {
    titleBarStore.datatype = e.currentTarget.getAttribute('datatype');
    titleBarStore.userActionWindow(titleBarStore.datatype);
}





// 组件已挂载
onMounted(() => {

    const colorTypeRadioButtons: HTMLElement[] = [
        <HTMLElement>document.getElementById('title-bar'),
        <HTMLElement>document.getElementById('app-name'),
        <HTMLElement>document.getElementById('minimize-button'),
        <HTMLElement>document.getElementById('maximize-button'),
        <HTMLElement>document.getElementById('close-button')
    ];


    function setThemeColor() {
        colorTypeRadioButtons.forEach((element, index) => {
            if (index >= 1) {
                element.style.color = themeColorStore.themeColorReverse;
            } else {
                //title-bar
                element.style.backgroundColor = themeColorStore.themeColor;
            }
        })
    };

    setThemeColor();

    watch(() => themeColorStore.themeColor,
        () => {
            // 在这里可以根据新的 themeColor 的值执行相应的逻辑
            setThemeColor();
        }
    )




})





</script>

<style scoped>
.fixed-top {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030
}

#title-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    height: 40px;
    /* 老版本的Chrome和Safari */
    -webkit-user-select: none;
    /* 老版本的Firefox */
    -moz-user-select: none;
    /* 老版本的Edge和Internet Explorer */
    -ms-user-select: none;
    /* 标准语法，现代浏览器 */
    user-select: none;
    -webkit-app-region: drag;
    padding: 0 10px;
    border-bottom: solid 1px #fff;
}

#left-icons {
    display: flex;
    align-items: center;
}

#logo {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

#app-name {
    margin-left: 5px;
    font-size: 14px;
    color: #fff;
}

#right-buttons {
    display: flex;
}

#right-buttons>div {
    width: 20px;
    height: 20px;
    padding: 5px 10px;
    -webkit-app-region: no-drag;
}


.minimize_button:hover {
    background-color: var(--transparent-white);
}


.maximize_button:hover {
    background-color: var(--transparent-white);
}

.close_button:hover {
    background-color: #ff0000 !important;
}
</style>