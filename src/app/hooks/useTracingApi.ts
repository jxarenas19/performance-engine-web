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
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_TRACING
        )
        return data.data
    } catch (e) {
        return [];
    }
}
export const createTeam = async (info: string) => {
    try {
        const {data}: AxiosResponse = await axiosRequest.post(
            PATH_ROUTES.CREATE_TEAM,
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
            PATH_ROUTES.CREATE_AFFECTATION,
            {"name":info}
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
        console.log(data);
        return data.data;

    } catch (e) {
        console.log('entro')
        return [];
    }
}
export const getUsers = async () => {
    try {
        const {data}: AxiosResponse = await axiosRequest.get(
            PATH_ROUTES.GET_USERS
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
        return data.data;
    } catch (e) {
        return [];
    }
}