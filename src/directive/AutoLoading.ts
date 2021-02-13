import { DirectiveBinding } from "vue";

export const autoLoading = {
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
        window.addEventListener(
            "scroll",
            function () {
                const temp: any = el.lastElementChild?.previousElementSibling;
                if (temp) {
                    const a = temp.offsetTop + temp.offsetHeight; // 当前元素倒第二个子元素（倒第一个为 RotateLoading）与父元素顶部距离 + 元素高度

                    const b = document.documentElement.clientHeight +
                        (el.parentElement?.parentElement?.scrollTop || 0); // 可视区窗口高度 + 滚动距离

                    if (binding.value.commandAutoLoading.isCommand && a <= b) {
                        binding.value.autoLoading();
                    }
                }
            },
            true
        );
    }
}