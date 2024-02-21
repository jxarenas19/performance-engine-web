import {TeamGroup} from "@/app/utils/types";


export const teamGroupData: TeamGroup[] = [
  {
      id:'166764',
      team:'Development',
      date: '2024-02-15',
      people: [
          {
              id: '1',
              name: 'Castillo Palo',
              hoursWorked:6,
              requirements: [
                  {
                      id: '18734',
                      t_spent: '2d',
                      t_remaining: '2d',
                      affectation: '2d',
                      t_affectation: '2d'
                  },
              ],
              plus: [
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
                      t_spent: '3d',
                      t_remaining: '5d',
                      affectation: '1d',
                      t_affectation: '8d'
                  }
              ],
          },
          // Más personas...
      ],
  },
  {
      id:'26554',
      team:'Marketing',
      date: '2024-02-16',
      people: [
          {
              id: '3444',
              name: 'Julio Arenas',
              hoursWorked:8,
              requirements: [
                  {
                      id: '14432',
                      t_spent: '2d',
                      t_remaining: '2d',
                      affectation: '2d',
                      t_affectation: '2d'
                  },
              ],
              plus: [
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
                      t_spent: '3d',
                      t_remaining: '5d',
                      affectation: '1d',
                      t_affectation: '8d'
                  }
              ],
          },
          // Más personas...
      ]
  }
]



export const teamsData = ["Development", "Marketing", "Testers"];
