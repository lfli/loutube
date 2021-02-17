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
        return minute + ':' + (second < 10 ? '0' + second : second);
    },
    dateFormat(date: string) {
        if (date) {
            const temp = date.split('-');
            return `${temp[0]}年${temp[1]}月${temp[2]}日`;
        }
    },
    internationalNumber(num: number) {
        if (num) {
            let result = '';
            const temp = num + '';
            for (let i = temp.length; i > 0; i -= 3) {
                result = temp.substring(i - 3, i) + ',' + result;
            }
            result = result.substring(0, result.length - 1);
            return (result === '0') ? '' : result;
        }
    }
}