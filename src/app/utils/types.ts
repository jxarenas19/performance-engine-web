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
  employee: string;
  description: string;
  t_spent: string;
  t_remaining: string;
  affectation: string;
  t_affectation: string;
  plus: string[];
}