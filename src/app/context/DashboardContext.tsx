// DashboardContext.tsx
import React, {createContext, ReactNode, useContext, useReducer} from 'react';
import {Filters} from "@/app/utils/types";

// Definiendo el tipo para los elementos de la tabla
type ItemType = {
    filters: Filters;
};

// Estado inicial
const initialState: ItemType = {
    filters: {'group':'Daily'}
};

// Acciones
type Action =
    | { type: 'SET_FILTER'; key: keyof Filters; value: string  }
    | { type: 'REMOVE_FILTER'; keys: (keyof Filters)[]  }
    | { type: 'CLEAR_FILTERS' }

// Contexto
const DashboardContext = createContext<{
    stateDashboard: ItemType;
    dispatchDashboard: React.Dispatch<Action>;
}>({ stateDashboard: initialState, dispatchDashboard: () => null });

// Reducer
const dashboardReducer = (state: ItemType, action: Action): ItemType => {
    switch (action.type) {
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
    }
};
interface DashboardProviderProps {
    children: ReactNode;
}
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const [stateDashboard, dispatchDashboard] = useReducer(dashboardReducer, initialState);

    return (
        <DashboardContext.Provider value={{ stateDashboard, dispatchDashboard }}>
            {children}
        </DashboardContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useDasboard = () => useContext(DashboardContext);
