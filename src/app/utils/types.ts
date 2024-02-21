import {CheckboxValueType} from "antd/lib/checkbox/Group";

export interface Requirement {
  id: string;
  t_spent: string;
  t_remaining: string;
  affectation: string;
  t_affectation: string;
  // Puedes agregar más campos según los requisitos
}

export interface Achievement {
  id: string;
  imageUrl: string;
}

export interface Person {
  id: string;
  name: string;
  hoursWorked?:number;
  requirements: Requirement[];
  plus?: Achievement[];
}

export interface DayGroup {
  date: string;
  hours?: number;
  people: Person[];
}

export interface TeamGroup {
  id: string;
  team: string;
  date: string;
  people: Person[];
}
export interface DataType {
  key?: React.Key;
  team: string;
  title?: string;
  user_id: string;
  detail: string;
  t_spent: string;
  t_remaining: string;
  affectation: string;
  t_affectation: string;
  plus: string[];
}

export interface TracingState {
  selectedPerson: Person | null;
  isModalOpen: boolean;
  groupBy: string;
  filteredData: Person[];
  selectedValues: CheckboxValueType[];
  personId?: string;
}

export type TracingAction =
    | { type: 'SET_SELECTED_PERSON'; payload: Person | null }
    | { type: 'SET_MODAL_OPEN'; payload: boolean }
    | { type: 'SET_GROUP_BY'; payload: string }
    | { type: 'SET_FILTERED_DATA'; payload: Person[] }
    | { type: 'SET_SELECTED_VALUES'; payload: CheckboxValueType[] }
    | { type: 'SET_PERSON_ID'; payload: number };