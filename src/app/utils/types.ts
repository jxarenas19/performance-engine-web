import {CheckboxValueType} from "antd/lib/checkbox/Group";

export interface Requirement {
    id: string;
    t_spent: string;
    t_remaining: string;
    affectation: string;
    t_affectation: string;
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
    team: string;
    title?: string;
    sub: string;
    detail: string;
    t_spent: string;
    t_remaining: string;
    affectation: string;
    t_affectation: string;
    plus: string[];
}

export interface PageValues {
    page: number | 1
    limit: number | 10
    filters: Map<string, string> | null
}

export interface TracingState {
    selectedPerson: Person | null;
    isModalOpen: boolean;
    groupBy: string;
    filters: Map<string, string>;
    selectedValues: CheckboxValueType[];
    personId?: number;
    tracings: TeamGroup[];
    teams: Generic[];
    persons: Person[];
    affectations: Generic[];
    isLoading: boolean;
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
    | { type: 'SET_PERSONS'; payload: Person[] }
    | { type: 'SET_AFFECTATIONS'; payload: Generic[] }
    | { type: 'LOADING_TRACINGS'; isLoading: boolean };

export interface Generic {
    id: string;
    name: string;
}