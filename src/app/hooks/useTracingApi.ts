import {DataForm, PageValues} from "@/app/utils/types";
import {AxiosResponse} from "axios";

import {PATH_ROUTES_PROD} from "@/app/utils/pathRoutes";
import {axiosRequest} from "@/app/utils/axiosConfiguration";

export const createTracing = async (info: DataForm) => {
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

export const updateTracing = async (info: DataForm) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.put(
            PATH_ROUTES_PROD.CREATE_TRACING,
            info
        )
        return data
    } catch (error) {
        throw error
    }
}

export const getTracings = async (info: any) => {
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

export const getDashboard = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_DASHBOARD
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
export const getTeams = async (info: any) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES_PROD.GET_TEAMS,
            info
        )
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