import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'



const app = createApp(App)
const pinia = createPinia()

// 从 @element-plus/icons-vue 中导入所有图标并进行全局注册。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(pinia)
app.mount('#app')
