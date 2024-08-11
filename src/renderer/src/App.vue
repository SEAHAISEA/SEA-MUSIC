<!-- <script setup lang="ts">
import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
    and
    <span class="ts">TypeScript</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions />
</template> -->



<template>
  <div class="pages">
    <!-- 标题栏-->
    <TitleBar />
    <!-- 歌名 -->
    <SongName />
    <!-- 背景图 -->
    <BackgroundImage />
    <!-- 进度条&音量 -->
    <SongProgressBar />
    <!-- 菜单按钮 -->
    <Menu />

  </div>


</template>

<script setup lang="ts">
// import { ElIcon } from 'element-plus';

import TitleBar from './views/TitleBar.vue';
import BackgroundImage from './views/BackgroundImage.vue';
import SongProgressBar from './views/SongProgressBar.vue';
import Menu from './views/Menu.vue';
import SongName from './views/SongName.vue';

import { onMounted, onBeforeMount,watch } from 'vue';
import { useThemeColorStore } from './stores/themeColor';
const themeColorStore = useThemeColorStore();

onBeforeMount(() => {
  // themeColor
  themeColorStore.initThemeColor();
})

// 组件已挂载
onMounted(() => {


  // 定义一个函数来更改背景色
  function changeBackgroundColor(color: string): void {
    document.body.style.backgroundColor = color;
  }

  // 使用函数更改背景色
  changeBackgroundColor(themeColorStore.themeColor);

  watch(() => themeColorStore.themeColor,
    (newColor) => {
      // 在这里可以根据新的 themeColor 的值执行相应的逻辑
      document.body.style.backgroundColor = newColor;
    }
  )

})




</script>

<style scoped>
.pages {
  user-select: none;
  -webkit-user-select: none;
}
</style>
