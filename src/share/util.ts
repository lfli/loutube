/**
 * 加载滑动事件（原本封装在 autoLoading 指令里，但 ssr 不支持，故封装在此）
 */
const loadScrollEvent = function (el: HTMLElement, binding: any) {
    window.addEventListener(
        "scroll",
        function () {
            const temp: any = el.lastElementChild?.previousElementSibling;
            if (temp) {
                const a = temp.offsetTop + temp.offsetHeight; // 当前元素倒第二个子元素（倒第一个为 RotateLoading）与父元素顶部距离 + 元素高度

                const b =
                    document.documentElement.clientHeight +
                    (el.parentElement?.parentElement?.scrollTop || 0); // 可视区窗口高度 + 滚动距离

                if (binding.value.commandAutoLoading.isCommand && a - 100 <= b) {
                    binding.value.autoLoading();
                }
            }
        },
        true
    );
}

const vReachTheBottom = function (el: HTMLElement, binding: any) {
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
}

export {
    loadScrollEvent,
    vReachTheBottom
}