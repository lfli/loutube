import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont/iconfont.css';
import './assets/fonts/iconfont/iconfont.js';
import { reachTheBottom } from './directive/ReachTheBottom';
import { autoLoading } from './directive/AutoLoading';
import { filters } from './share/filters';

const app = createApp(App);
app.config.globalProperties.$filters = filters;
app.directive('reachTheBottom', reachTheBottom).directive('autoLoading', autoLoading).use(store).use(router).mount('#app');