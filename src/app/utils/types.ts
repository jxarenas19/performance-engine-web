import {CheckboxValueType} from "antd/lib/checkbox/Group";

export interface Requirement {
    id: string;
    t_spent: string;
    t_remaining: string;
    affectation: string;
    t_affectation: string;
    detail: string;
    title: string;
    // Puedes agregar más campos según los requisitos
}

export interface Achievement {
    id: string;
    imageUrl: string;
}

export interface Person {
    id: string;
    name: string;
    email?: string;
    sub?: string;
    hoursWorked?: number;
    requirements?: Requirement[];
    plus?: Achievement[];
}
export interface User {
    email?: string;
    sub?: string;
}

export interface DayGroup {
    date: string;
    hours?: number;
    people: Person[];
}

export interface TeamGroup {
    id: string;
    team: string;
    date: string;
    people: Person[];
}

export interface DataType {
    key?: React.Key;
    team?: string;
    title?: string;
    sub?: string;
    detail?: string;
    t_spent?: string;
    t_remaining?: string;
    affectation?: string;
    t_affectation?: string;
    plus?: string[];
}
export interface DataTask {
    team?: string;
    title?: string;
    detail?: string;
    t_spent?: string;
    t_remaining?: string;
    affectation?: string;
    t_affectation?: string;
    user_id?: string;
}
export interface FiltersValues {
    team?: string;
}
export interface PageValues {
    page: number | 1
    limit: number | 10
    filters?: FiltersValues[]
}

export interface TracingState {
    selectedPerson: Person | null;
    isModalOpen: boolean;
    groupBy: string;
    filters: FiltersValues;
    selectedValues: CheckboxValueType[];
    personId?: number;
    tracings: TeamGroup[];
    teams: Generic[];
    persons: Person[];
    affectations: Generic[];
    users: User[];
    isLoading: boolean;
    error?: string;
}

export type TracingAction =
    | { type: 'SET_SELECTED_PERSON'; payload: Person | null }
    | { type: 'SET_MODAL_OPEN'; payload: boolean }
    | { type: 'SET_GROUP_BY'; payload: string }
    | { type: 'SET_FILTER'; payload: { key: string, value: string } }
    | { type: 'REMOVE_FILTER'; payload: { key: string } }
    | { type: 'CLEAR_FILTERS' }
    | { type: 'SET_SELECTED_VALUES'; payload: CheckboxValueType[] }
    | { type: 'SET_PERSON_ID'; payload: number }
    | { type: 'SET_TRACINGS'; payload: TeamGroup[] }
    | { type: 'SET_TEAMS'; payload: Generic[] }
    | { type: 'SET_USERS'; payload: Person[] }
    | { type: 'SET_AFFECTATIONS'; payload: Generic[] }
    | { type: 'SET_ERROR'; payload: string}
    | { type: 'LOADING_TRACINGS'; isLoading: boolean };

export interface Generic {
    id: string;
    name: string;
}

export interface ResponseCod {
    id: string;
    name: string;
    updatedAt: string;
    createdAt: string;

}