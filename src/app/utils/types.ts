export interface Requirement {
  id: string;
  t_empleado: string;
  t_restante: string;
  afectacion: string;
  t_afectacion: string;
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
  achievements?: Achievement[];
}

export interface DayGroup {
  date: string;
  hours?: number;
  people: Person[];
}

export interface EquipoGroup {
  id: string;
  equipo: string;
  date: string;
  people: Person[];
}
export interface DataType {
  key?: React.Key;
  equipo: string;
  trabajador: string;
  descripcion: string;
  t_empleado: string;
  t_restante: string;
  afectacion: string;
  t_afectacion: string;
  bonos: string[];
}