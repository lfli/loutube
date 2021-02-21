import { DirectiveBinding } from "vue";

export const reachTheBottom = {
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
        window.addEventListener(
            "scroll",
            function () {
                if (binding.value.commandReachTheBottom.isCommand && window.innerHeight + el.scrollTop >= el.scrollHeight - 100) {
                    binding.value.reachTheBottom();
                }
                // 进入 Watch 页面时，Watch 页面的页面滑动对此有影响，一直触发 scroll 事件且 el.scrollTop 为 0
                if (el.scrollTop !== 0) {
                    binding.value.commandReachTheBottom.scrollTop = el.scrollTop;
                }
            },
            true
        );
    },
    updated(el: HTMLElement, binding: DirectiveBinding<any>) {
        el.scrollTop = binding.value.commandReachTheBottom.scrollTop;
    }
}