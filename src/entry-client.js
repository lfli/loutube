import { createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import createRouter from './router-ssr'
import createStore from './store-ssr'
import { filters } from './share/filters';
import './assets/fonts/iconfont/iconfont.css';
import './assets/fonts/iconfont/iconfont.js';

// 针对客户端的启动逻辑......

const app = createSSRApp(App)

const router = createRouter(createWebHistory('loutube'))
const store = createStore()

app.config.globalProperties.$filters = filters;

app.use(router).use(store)

router.isReady().then(() => {
    app.mount('#app')
})