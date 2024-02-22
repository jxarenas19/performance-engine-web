import {DataType, PageValues} from "@/app/utils/types";
import {AxiosResponse} from "axios";
import {PATH_ROUTES} from "@/app/utils/pathRoutes";
import axiosRequest from "@/app/utils/axiosConfiguration";

export const createTracing = async (info: DataType) => {
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

export const getTracings = async (info: PageValues) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES.GET_TRACING,
            {page: 1, limit: 10, filters: []}
        )
        return data
    } catch (e) {
        return [];
    }
}
export const getTeams = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_TEAMS
        )
        return data.data.rows;

    } catch (e) {
        return [];
    }
}
export const getPersons = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_PERSONS
        )
        return data.data;
    } catch (e) {
        return [];
    }
}

export const getAffectations = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_AFFECTATIONS
        )
        return data.data.rows;
    } catch (e) {
        return [];
    }
}