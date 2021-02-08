import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont/iconfont.css';
import './assets/fonts/iconfont/iconfont.js';
import { reachTheBottom } from './directive/ReachTheBottom';

createApp(App).directive('reachTheBottom', reachTheBottom).use(store).use(router).mount('#app')
