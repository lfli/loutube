import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { BASE_URL, TIME_OUT, errorHandle } from './config';

interface ResponseData {
    code: number;
    count?: number;
    data: any;
    [key: string]: any;
}

/**
 * 创建axios实例
 */
const axiosInstance: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT
});

/**
 * 响应拦截处理
 */
axiosInstance.interceptors.response.use(
    (res: AxiosResponse) => {
        if (res.status === 200) {
            const code = res.data.code;
            if (code === 200) {
                return Promise.resolve(res.data);
            }
        }
        return Promise.reject(res.data);
    },
    (error: AxiosError) => {
        if (error && error.response) {
            errorHandle(error.response.status, error.message);
            return Promise.reject(error.response);
        }
        console.log("网络请求失败", error.message);
        return Promise.reject(error);
    }
);

const ajaxGet = (url: string, params?: any): Promise<ResponseData> => axiosInstance.get(url, { params });
const ajaxPost = (url: string, params: any): Promise<ResponseData> => axiosInstance.post(url, params);

export {
    ajaxGet,
    ajaxPost
};

export default axiosInstance;