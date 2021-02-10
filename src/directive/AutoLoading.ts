import { DirectiveBinding } from "vue";

export const autoLoading = {
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
        window.addEventListener(
            "scroll",
            function () {
                const a = el.offsetTop + el.offsetHeight; // 当前元素与父元素顶部距离 + 当前元素高度
                const b = document.documentElement.clientHeight +
                    (el.parentElement?.parentElement?.scrollTop || 0); // 可视区窗口高度 + 滚动距离

                if (binding.value.commandAutoLoading.isCommand && a <= b) {
                    binding.value.autoLoading();
                }
            },
            true
        );
    }
}