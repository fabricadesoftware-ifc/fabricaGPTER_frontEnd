import { patients } from './patients'
import { testProfessional } from './professionals'

export const recentTests = [
  { id: 1, name: 'Isometria 60s', date: '2024-06-01' },
  { id: 2, name: 'Isometria 120s', date: '2024-05-20' },
  { id: 3, name: 'Isometria 60s', date: '2024-04-15' },
]

export const testHistory = [
  {
    id: 1,
    tempo: 'Isometria 60s',
    data: '01/06/2019',
  },
  {
    id: 2,
    tempo: 'Isometria 120s',
    data: '02/06/2019',
  },
  {
    id: 3,
    tempo: 'Isometria 60s',
    data: '01/06/2019',
  },
  {
    id: 4,
    tempo: 'Isometria 120s',
    data: '02/06/2019',
  },
  {
    id: 5,
    tempo: 'Isometria 60s',
    data: '01/06/2019',
  },
  {
    id: 6,
    tempo: 'Isometria 120s',
    data: '02/06/2019',
  },
  {
    id: 7,
    tempo: 'Isometria 60s',
    data: '01/06/2019',
  },
  {
    id: 8,
    tempo: 'Isometria 120s',
    data: '02/06/2019',
  },
  {
    id: 9,
    tempo: 'Isometria 120s',
    data: '02/06/2020',
  },
  {
    id: 10,
    tempo: 'Isometria 120s',
    data: '02/06/2026',
  },
]

export const testDetails = {
  id: 1,
  name: patients[0].name,
  time: patients[0].name,
  type: '60s',
  reps: 6,
  arm: 'Direito',
  date: '04/07/2025',
  profissional: testProfessional.name,
}
