export const filters = {
    playCount(num: number) {
        if (num < 10000) {
            return num;
        } else if (num >= 10000 && num < 100000) {
            return Math.floor(num / 10000 * 10) / 10 + '万';
        } else {
            return Math.floor(num / 10000) + '万';
        }
    },
    duration(duration: number) {
        const minute = Math.floor(duration / 1000 / 60);
        const second = Math.floor((duration / 1000) % 60);
        return minute + ":" + (second < 10 ? "0" + second : second);
    }
}