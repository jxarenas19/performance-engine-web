import {TracingAction, TracingState} from "@/app/utils/types";

export const initialState: TracingState = {
    selectedPerson: null,
    isModalOpen: false,
    groupBy: 'Diario',
    filters: new Map(),
    selectedValues: [],
    personId: 0,
    tracings: [],
    teams: [],
    persons: [],
    affectations: [],
    users: [],
    isLoading: false
};
export const tracingReducer = (state: TracingState, action: TracingAction) => {
    switch (action.type) {
        case 'SET_SELECTED_PERSON':
            return {...state, selectedPerson: action.payload};
        case 'SET_MODAL_OPEN':
            return {...state, isModalOpen: action.payload};
        case 'SET_GROUP_BY':
            return {...state, groupBy: action.payload};
        case 'SET_FILTER':
            const updatedFilters = new Map(state.filters);
            updatedFilters.set(action.payload.key, action.payload.value);
            return {...state, filters: updatedFilters};
        case 'REMOVE_FILTER':
            const reducedFilters = new Map(state.filters);
            reducedFilters.delete(action.payload.key);
            return {...state, filters: reducedFilters};
        case 'CLEAR_FILTERS':
            return {...state, filters: new Map()}
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
        default:
            throw new Error('Acción no soportada');
    }
};