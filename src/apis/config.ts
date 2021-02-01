const BASE_URL = 'http://www.lilinfeng.net:3000';

const TIME_OUT: number = 10 * 1000;

/**
 * http请求失败后的错误统一处理
 * @param {Number} status 状态码
 */
const errorHandle = (status: number): void => {
    // HTTP状态码判断
    if (status >= 500) {
        console.log("系统服务错误")
    } else {
        console.log("网络请求失败")
    }
}

export {
    BASE_URL,
    TIME_OUT,
    errorHandle
}