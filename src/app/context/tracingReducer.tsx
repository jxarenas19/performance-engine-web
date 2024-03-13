import {Filters, PageValues, TracingAction, TracingState} from "@/app/utils/types";

export const initialState: TracingState & PageValues= {
    selectedPerson: null,
    authenticatedUser: null,
    isModalOpen: false,
    isModalDashboardOpen: false,
    groupBy: 'Diario',
    filters: {'group':'Daily'},
    selectedValues: [],
    personId: 0,
    tracings: [],
    teams: [],
    activities: [],
    persons: [],
    affectations: [],
    score: null,
    chartByTime: [],
    users: [],
    isLoading: false,
    error: '',
    page: 1,
    limit: 10,
    total: 0,
    is_admin: true,
    selectedTeam: null,
    selectedTask: null,
    lastUpdated: new Date(),
    lastUpdatedStatistic: new Date()
};
export const tracingReducer = (state: TracingState & PageValues, action: TracingAction) => {
    switch (action.type) {
        case 'SET_USER_AUTHENTICATED':
            return {...state, authenticatedUser: action.payload};
        case 'SET_SELECTED_PERSON':
            return {...state, selectedPerson: action.payload};
        case 'SET_SELECTED_TASK':
            return {...state, selectedTask: action.payload};
        case 'SET_MODAL_OPEN':
            return {...state, isModalOpen: action.payload};
        case 'SET_MODAL_DASHBOARD_OPEN':
            return {...state, isModalDashboardOpen: action.payload};
        case 'SET_GROUP_BY':
            return {...state, groupBy: action.payload};
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.key]: action.value
                }
            };
        case 'REMOVE_FILTER':
            const newFilters:Filters = { ...state.filters };
            action.keys.forEach(key => {
                delete newFilters[key];
            });
            return {
                ...state,
                filters: newFilters
            };
        case 'CLEAR_FILTERS':
            return {...state, filters: {}}
        case 'SET_SELECTED_VALUES':
            return {...state, selectedValues: action.payload};
        case 'SET_PERSON_ID':
            return {...state, personId: action.payload};
        case 'SET_TRACINGS':
            return {...state, tracings: action.payload, isLoading: false};
        case 'SET_TEAMS':
            return {...state, teams: action.payload, isLoading: false};
        case 'SET_ACTIVITIES':
            return {...state, activities: action.payload, isLoading: false};
        case 'SET_USERS':
            return {...state, persons: action.payload, isLoading: false};
        case 'SET_AFFECTATIONS':
            return {...state, affectations: action.payload, isLoading: false};
        case 'SET_SCORE':
            return {...state, score: action.payload, isLoading: false};
        case 'SET_CHART_BY_TIME':
            return {...state, chartByTime: action.payload, isLoading: false};
        case 'LOADING_TRACINGS':
            return {...state, isLoading: action.isLoading};
        case 'SET_ERROR':
            return {...state, error: action.payload};
        case 'SET_PAGE':
            return { ...state, page: action.payload };
        case 'SET_PAGE_SIZE':
            return { ...state, limit: action.payload };
        case 'SET_TOTAL':
            return { ...state, total: action.payload };
        case 'SET_SELECTED_TEAM':
            return { ...state, selectedTeam: action.payload };
        case 'SET_ADMIN':
            return { ...state, is_admin: action.is_admin };
        case 'RELOAD_DATA':
            return { ...state, lastUpdated: new Date() };
        case 'RELOAD_DATA_STATISTIC_CARD':
            return { ...state, lastUpdatedStatistic: new Date() };
        default:
            throw new Error('Acción no soportada');
    }
};