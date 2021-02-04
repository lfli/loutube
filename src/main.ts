import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/iconfont/iconfont.css';
import './assets/fonts/iconfont/iconfont.js';

createApp(App).directive(
    'reachTheBottom', {
    mounted(el, binding) {
        window.addEventListener(
            "scroll",
            function () {
                if (window.innerHeight + el.scrollTop >= el.scrollHeight - 10) {
                    binding.value();
                }
            },
            true
        );
    },
},
).use(store).use(router).mount('#app')
