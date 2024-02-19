import {EquipoGroup} from "@/app/utils/types";
import {
    AndroidOutlined,
    HeartOutlined,
    SmileOutlined,
    StarOutlined,
    ThunderboltOutlined,
} from "@ant-design/icons";
import React from "react";

export const equipoGroupData: EquipoGroup[] = [
  {
      id:'166764',
      equipo:'Desarrollo',
      date: '2024-02-15',
      people: [
          {
              id: '154367',
              name: 'Castillo Palo',
              hoursWorked:6,
              requirements: [
                  {
                      id: '18734',
                      t_empleado: '2d',
                      t_restante: '2d',
                      afectacion: '2d',
                      t_afectacion: '2d'
                  },
              ],
              achievements: [
                  {id: '11245', imageUrl: '/path/to/escudo.png'},
                  {id: '27654', imageUrl: '/path/to/rayo.png'},
              ],
          },
          {
              id: '2987',
              name: 'Rodo Tapa',
              hoursWorked:7,
              requirements: [
                  {
                      id: '1765',
                      t_empleado: '3d',
                      t_restante: '5d',
                      afectacion: '1d',
                      t_afectacion: '8d'
                  }
              ],
          },
          // Más personas...
      ],
  },
  {
      id:'26554',
      equipo:'Marketing',
      date: '2024-02-15',
      people: [
          {
              id: '3444',
              name: 'Julio Arenas',
              hoursWorked:8,
              requirements: [
                  {
                      id: '14432',
                      t_empleado: '2d',
                      t_restante: '2d',
                      afectacion: '2d',
                      t_afectacion: '2d'
                  },
              ],
              achievements: [
                  {id: '12', imageUrl: '/path/to/escudo.png'},
                  {id: '2222', imageUrl: '/path/to/rayo.png'},
              ],
          },
          {
              id: '422',
              name: 'Rita Torres',
              hoursWorked:9,
              requirements: [
                  {
                      id: '1333',
                      t_empleado: '3d',
                      t_restante: '5d',
                      afectacion: '1d',
                      t_afectacion: '8d'
                  }
              ],
          },
          // Más personas...
      ]
  }
]

export const onlyOneGroupData: EquipoGroup[] = [
    {
        id:'166764',
        equipo:'Desarrollo',
        date: '2024-02-15',
        people: [
            {
                id: '154367',
                name: 'Castillo Palo',
                hoursWorked:6,
                requirements: [
                    {
                        id: '18734',
                        t_empleado: '2d',
                        t_restante: '2d',
                        afectacion: '2d',
                        t_afectacion: '2d'
                    },
                ],
                achievements: [
                    {id: '11245', imageUrl: '/path/to/escudo.png'},
                    {id: '27654', imageUrl: '/path/to/rayo.png'},
                ],
            }
        ],
    }
]


export const equiposData = ["Desarrollo", "Marketing", "Testers"];
