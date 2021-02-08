import { DirectiveBinding } from "vue";

export const reachTheBottom = {
    mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
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
    updated(el: HTMLElement, binding: DirectiveBinding<any>) {
        el.scrollTop = binding.value.commandReachTheBottom.scrollTop;
    }
}