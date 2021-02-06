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
                if (binding.value.commandReachTheBottom.isCommand && window.innerHeight + el.scrollTop >= el.scrollHeight - 10) {
                    binding.value.reachTheBottom();
                }
                binding.value.commandReachTheBottom.scrollTop = el.scrollTop;
            },
            true
        );
    },
    updated(el, binding) {
        el.scrollTop = binding.value.commandReachTheBottom.scrollTop;
    }
},
).use(store).use(router).mount('#app')
