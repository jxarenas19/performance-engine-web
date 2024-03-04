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

export interface DataForm {
    id?: React.Key;
    team?: string;
    title?: string;
    sub?: string;
    detail?: string;
    t_spent?: string;
    t_remaining?: string;
    affectation?: string[];
    t_affectation?: string;
    plus?: string[];
    amount?: number;
    amount_error?: number;
    people_attended?: number;
    people_entered_to_system?: number;
    incoming_calls?: number;
    calls_made?: number;
    activities?: string[];
}
export interface DataTask {
    team?: string;
    title?: string;
    detail?: string;
    t_spent?: string;
    t_remaining?: string;
    affectation?: string[];
    t_affectation?: string;
    user_id?: string;
    amount?: number;
    amount_error?: number;
    people_attended?: number;
    people_entered_to_system?: number;
    incoming_calls?: number;
    calls_made?: number;
    activities?: string[];
}
export interface FiltersValues {
    team?: string;
    startDate?: string;
    dateEnd?: string;
}
export interface PageValues {
    page: number | 1
    limit: number | 1
    filters?: FiltersValues,

}

export interface TracingState {
    selectedPerson: Person | null;
    isModalOpen: boolean;
    groupBy: string;
    filters: Filters;
    selectedValues: CheckboxValueType[];
    personId?: number;
    tracings: TeamGroup[];
    teams: Generic[];
    activities: Generic[];
    persons: Person[];
    affectations: Generic[];
    users: User[];
    isLoading: boolean;
    error?: string;
    total:number;
    selectedTeam: string | null;
    selectedTask: DataForm | null;
}

export interface Filters {
    team?: string;
    dateStart?: string;
    dateEnd?: string;
    group?: string;
}

export type TracingAction =
    | { type: 'SET_SELECTED_PERSON'; payload: Person | null }
    | { type: 'SET_SELECTED_TASK'; payload: DataForm | null }
    | { type: 'SET_MODAL_OPEN'; payload: boolean }
    | { type: 'SET_GROUP_BY'; payload: string }
    | { type: 'SET_FILTER'; key: keyof Filters; value: string  }
    | { type: 'REMOVE_FILTER'; keys: (keyof Filters)[]  }
    | { type: 'CLEAR_FILTERS' }
    | { type: 'SET_SELECTED_VALUES'; payload: CheckboxValueType[] }
    | { type: 'SET_PERSON_ID'; payload: number }
    | { type: 'SET_TRACINGS'; payload: TeamGroup[] }
    | { type: 'SET_TEAMS'; payload: Generic[] }
    | { type: 'SET_ACTIVITIES'; payload: Generic[] }
    | { type: 'SET_USERS'; payload: Person[] }
    | { type: 'SET_AFFECTATIONS'; payload: Generic[] }
    | { type: 'SET_ERROR'; payload: string}
    | { type: 'SET_PAGE'; payload: number}
    | { type: 'SET_PAGE_SIZE'; payload: number}
    | { type: 'SET_TOTAL'; payload: number}
    | { type: 'SET_SELECTED_TEAM'; payload: string}
    | { type: 'LOADING_TRACINGS'; isLoading: boolean };

export interface Generic {
    id: string;
    name: string;
}