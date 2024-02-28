import React, {createContext, Dispatch, ReactNode, useReducer} from 'react';
import {PageValues, TracingAction, TracingState} from "@/app/utils/types";
import {initialState, tracingReducer} from "@/app/context/tracingReducer";


interface AppContextProps {
    state: TracingState & PageValues;
    dispatch: Dispatch<TracingAction>;
}

export const TracingContext = createContext<AppContextProps | undefined>(undefined);

export const TracingProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [state, dispatch] = useReducer(tracingReducer, initialState);

    return <TracingContext.Provider value={{state, dispatch}}>{children}</TracingContext.Provider>;
};