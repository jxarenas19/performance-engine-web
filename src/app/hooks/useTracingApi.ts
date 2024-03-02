import {DataTask, DataType, FiltersValues, PageValues} from "@/app/utils/types";
import {AxiosResponse} from "axios";

import {PATH_ROUTES_DEV, PATH_ROUTES_PROD} from "@/app/utils/pathRoutes";
import {axiosRequest, axiosRequestMock} from "@/app/utils/axiosConfiguration";

export const createTracing = async (info: DataTask) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.CREATE_TRACING,
            info
        )
        return data
    } catch (error) {
        throw error
    }
}

export const getTracings = async (info: any) => {
    console.log(info)
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_TRACING,
            info
        )

        return data;
    } catch (e) {
        return [];
    }
}
export const createTeam = async (info: string) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.CREATE_TEAM,
            {"name":info}
        )
        return data
    } catch (e) {
        return [];
    }
}
export const createAffectation = async (info: string) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.CREATE_AFFECTATION,
            {"name":info}
        )
        return data
    } catch (e) {
        return null;
    }
}
export const getTeams = async (info: PageValues) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_TEAMS,
            info
        )
        console.log(data);
        return data.data;

    } catch (e) {
        console.log('entro error teams')
        return [];
    }
}
export const getActivities = async (info: PageValues) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_ACTIVITIES,
            info
        )
        console.log(data);
        return data.data;

    } catch (e) {
        console.log('entro error activities')
        return [];
    }
}
export const getUsers = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES_PROD.GET_USERS
        )
        return data.data;
    } catch (e) {
        return [];
    }
}

export const getAffectations = async (info: PageValues) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_AFFECTATIONS,
            info
        )
        return data.data;
    } catch (e) {
        return [];
    }
}