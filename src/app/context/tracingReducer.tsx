import {TracingAction, TracingState} from "@/app/utils/types";

export const initialState: TracingState = {
    selectedPerson: null,
    isModalOpen: false,
    groupBy: 'Diario',
    filteredData: [],
    selectedValues: [],
    personId: undefined
};
export const tracingReducer = (state: TracingState, action: TracingAction) => {
    switch (action.type) {
        case 'SET_SELECTED_PERSON':
            return {...state, selectedPerson: action.payload};
        case 'SET_MODAL_OPEN':
            return {...state, isModalOpen: action.payload};
        case 'SET_GROUP_BY':
            return {...state, groupBy: action.payload};
        case 'SET_FILTERED_DATA':
            return {...state, filteredData: action.payload};
        case 'SET_SELECTED_VALUES':
            return {...state, selectedValues: action.payload};
        case 'SET_PERSON_ID':
            return {...state, personId: action.payload};
        default:
            return state;
    }
};