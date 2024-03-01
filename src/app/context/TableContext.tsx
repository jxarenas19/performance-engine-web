// TableContext.tsx
import React, {createContext, useReducer, useContext, ReactNode} from 'react';

// Definiendo el tipo para los elementos de la tabla
type ItemType = {
    key: string;
    selectValue: string;
    numericValue: number;
};

// Estado inicial
const initialState: ItemType[] = [];

// Acciones
type Action = | { type: 'ADD_ITEM'; payload: ItemType }
    | { type: 'REMOVE_ITEM'; payload: { key: string } };

// Contexto
const TableContext = createContext<{
    state: ItemType[];
    dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Reducer
const tableReducer = (state: ItemType[], action: Action): ItemType[] => {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter(item => item.key !== action.payload.key);
        default:
            return state;
    }
};
interface TableProviderProps {
    children: ReactNode;
}
export const TableProvider: React.FC<TableProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(tableReducer, initialState);

    return (
        <TableContext.Provider value={{ state, dispatch }}>
            {children}
        </TableContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useTable = () => useContext(TableContext);
