import {DataType, PageValues} from "@/app/utils/types";
import {AxiosResponse} from "axios";
import {PATH_ROUTES} from "@/app/utils/pathRoutes";
import axiosRequest from "@/app/utils/axiosConfiguration";

export const createTracing = async (info:DataType) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES.CREATE_TRACING,
            info
        )
        return data
    } catch (error) {
        throw error
    }
}

export const getTracings = async (info: PageValues)=> {
    try {
        const {data}:AxiosResponse = await axiosRequest.post(
            PATH_ROUTES.GET_TRACING,
            info
        )
        return data
    }
    catch (e) {

    }
}
export const getTeams = async ()=> {
    try {
        const {data}:AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_TEAMS
        )
        return data
    }
    catch (e) {

    }
}