import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import {TracingAction, TracingState} from "@/app/utils/types";
import {tracingReducer,initialState} from "@/app/context/tracingReducer";


interface AppContextProps {
    state: TracingState;
    dispatch: Dispatch<TracingAction>;
}

export const TracingContext = createContext<AppContextProps | undefined>(undefined);

export const TracingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(tracingReducer, initialState);

    return <TracingContext.Provider value={{ state, dispatch }}>{children}</TracingContext.Provider>;
};