import axios from "axios"
import eventEmitter from "@/app/utils/eventEmitter";


const API_URL_MOCK = process.env.NEXT_PUBLIC_API_URL_MOCK
const API_URL = process.env.NEXT_PUBLIC_API_URL

const baseURL = process.env.NEXT_PUBLIC_STAGE === 'DEV' ? API_URL_MOCK : API_URL;

export const axiosRequest = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
})

export const axiosRequestMock = axios.create({
    baseURL: API_URL_MOCK,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
})
axiosRequest.interceptors.response.use(
    response => response,
    error => {
        eventEmitter.emit<string>('apiError', error.message || 'An error occurred');
        return Promise.reject(error);
    }
);
