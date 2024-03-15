import {CheckboxValueType} from "antd/lib/checkbox/Group";

export interface Requirement {
    id: string;
    t_spent: string;
    t_remaining: string;
    affectation: string;
    t_affectation: string;
    detail: string;
    title: string;
}

export interface Achievement {
    name: string;
}

export interface Person {
    id: string;
    name: string;
    email?: string;
    sub?: string;
    hoursWorked?: number;
    team?: string;
    requirements?: Requirement[];
    plus?: string[];
}
export interface User {
    email?: string;
    sub?: string;
}

export interface DayGroup {
    key: React.Key,
    date: string;
    hours?: number;
    people: Person[];
}

export interface DataForm {
    id?: string;
    team?: string;
    title?: string | " ";
    sub?: string;
    user_id?: string;
    detail?: string;
    t_spent?: string;
    t_remaining?: string;
    affectation?: string[] | [];
    t_affectation?: string;
    plus?: string[];
    amount?: number | 1;
    amount_error?: number | 0;
    people_attended?: number | 0;
    people_entered_to_system?: number | 0;
    incoming_calls?: number | 0;
    calls_made?: number | 0;
    activities?: string[] | [];
    status?: number | 1;
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
    limit: number | 10
    filters?: FiltersValues,

}

export interface TracingState {
    selectedPerson: Person | null;
    authenticatedUser: UserData | null;
    isModalOpen: boolean;
    isModalDashboardOpen: boolean;
    groupBy: string;
    filters: Filters;
    selectedValues: CheckboxValueType[];
    personId?: number;
    tracings: DayGroup[];
    teams: Generic[];
    activities: Generic[];
    persons: Person[];
    affectations: Generic[];
    score: GlobalScore;
    chartByTime: ChartByTime[] | [];
    users: User[];
    isLoading: boolean;
    isLoading2: boolean;
    error?: string;
    total:number;
    is_admin:boolean;
    selectedTeam: string | null;
    selectedTask: DataForm | null;
    lastUpdated: Date | null;
    lastUpdatedStatistic: Date | null;
}

export interface Filters {
    team?: string;
    dateStart?: string;
    dateEnd?: string;
    group?: string;
    groupScore?: string;
    user_id?: string;
    userIdScore?: string;
    type?: string;
}
export interface UserData {
    user_id: string;
    name?: string;
    is_admin: boolean | true
}

export type TracingAction =
    | { type: 'SET_SELECTED_PERSON'; payload: Person | null }
    | { type: 'SET_USER_AUTHENTICATED'; payload: UserData | null }
    | { type: 'SET_SELECTED_TASK'; payload: DataForm | null }
    | { type: 'SET_MODAL_OPEN'; payload: boolean }
    | { type: 'SET_MODAL_DASHBOARD_OPEN'; payload: boolean }
    | { type: 'SET_GROUP_BY'; payload: string }
    | { type: 'SET_FILTER'; key: keyof Filters; value: string  }
    | { type: 'REMOVE_FILTER'; keys: (keyof Filters)[]  }
    | { type: 'CLEAR_FILTERS' }
    | { type: 'SET_SELECTED_VALUES'; payload: CheckboxValueType[] }
    | { type: 'SET_PERSON_ID'; payload: number }
    | { type: 'SET_TRACINGS'; payload: DayGroup[] }
    | { type: 'SET_TEAMS'; payload: Generic[] }
    | { type: 'SET_ACTIVITIES'; payload: Generic[] }
    | { type: 'SET_USERS'; payload: Person[] }
    | { type: 'SET_AFFECTATIONS'; payload: Generic[] }
    | { type: 'SET_SCORE'; payload: GlobalScore }
    | { type: 'SET_CHART_BY_TIME'; payload: ChartByTime[] }
    | { type: 'SET_ERROR'; payload: string}
    | { type: 'SET_PAGE'; payload: number}
    | { type: 'SET_PAGE_SIZE'; payload: number}
    | { type: 'SET_TOTAL'; payload: number}
    | { type: 'SET_SELECTED_TEAM'; payload: string}
    | { type: 'SET_ADMIN'; is_admin: boolean}
    | { type: 'RELOAD_DATA'}
    | { type: 'RELOAD_DATA_STATISTIC_CARD'}
    | { type: 'LOADING_TRACINGS'; isLoading: boolean }
    | { type: 'LOADING_STATISTIC'; isLoading2: boolean };

export interface Generic {
    id: string;
    id_two?: number;
    name: string;
}

export interface GlobalScore {
    result_current: Score,
    result_previous: Score
}
export interface Score {
    t_spent: string,
    t_remaining: string,
    t_affectation: string,
    t_restant: string,
    score: number
}
export interface ChartByTime {
    t_spent: number,
    t_remaining: number,
    t_affectation: number,
    name: string
}
export interface DashboardData {
    dataAmount?:any,
    dataTimeSpentRemaining?:any,
    dataTimeSpentRemainingByTeam?:any,
    dataUserActivity?:any

}