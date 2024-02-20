import axios from "axios"


const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL
const baseURL = NEXT_PUBLIC_API_URL

const axiosRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
    },
})





export default axiosRequest
