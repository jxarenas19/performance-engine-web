import {PageValues, TracingAction, TracingState} from "@/app/utils/types";

export const initialState: TracingState & PageValues= {
    selectedPerson: null,
    isModalOpen: false,
    groupBy: 'Diario',
    filters: {},
    selectedValues: [],
    personId: 0,
    tracings: [],
    teams: [],
    persons: [],
    affectations: [],
    users: [],
    isLoading: false,
    error: '',
    page: 1,
    limit: 1,
    total: 0
};
export const tracingReducer = (state: TracingState & PageValues, action: TracingAction) => {
    switch (action.type) {
        case 'SET_SELECTED_PERSON':
            return {...state, selectedPerson: action.payload};
        case 'SET_MODAL_OPEN':
            return {...state, isModalOpen: action.payload};
        case 'SET_GROUP_BY':
            return {...state, groupBy: action.payload};
        case 'SET_FILTER':
            return { ...state, filters:{[action.payload.key]: action.payload.value} };
        case 'REMOVE_FILTER':
            return { ...state, filters:{} };
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
        case 'SET_USERS':
            return {...state, persons: action.payload, isLoading: false};
        case 'SET_AFFECTATIONS':
            return {...state, affectations: action.payload, isLoading: false};
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
        default:
            throw new Error('Acción no soportada');
    }
};