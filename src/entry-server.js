import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import App from './App.vue'
import createRouter from './router-ssr'
import createStore from './store-ssr'
import { filters } from './share/filters';
import './assets/fonts/iconfont/iconfont.css';
// import './assets/fonts/iconfont/iconfont.js';

export default function () {
    const app = createSSRApp(App)

    const router = createRouter(createMemoryHistory('loutube'))
    const store = createStore()
  
    app.config.globalProperties.$filters = filters;
  
    app.use(router).use(store)
  
    return {
      app,
      router,
      store
    }
}