import React, {createContext, useReducer, Dispatch} from "react";

type AppState = {
    selectedPerson: string | null;
};

type AppAction =
    | { type: "SET_SELECTED_PERSON"; payload: string | null }

const initialState: AppState = {
    selectedPerson: null
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "SET_SELECTED_PERSON":
            return {...state, selectedPerson: action.payload};
        default:
            return state;
    }
};

interface AppContextType {
    state: AppState;
    dispatch: Dispatch<AppAction>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};