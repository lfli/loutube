function getTitle(vm: any) {
    return vm.$router.currentRoute.value.meta.title;
}
export const titleMixin = {
    mounted() {
        const title = getTitle(this);
        document.title = title ? title + ' - LouTube' : 'LouTube';
    },
    activated() {
        const title = getTitle(this);
        document.title = title ? title + ' - LouTube' : 'LouTube';
    }
}