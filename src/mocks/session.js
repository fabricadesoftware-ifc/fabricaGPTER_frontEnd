import { professionalProfile } from './professionals'
import { patientProfile } from './patients'

export const accounts = [
  {
    id: 1,
    email: 'pacienteexemplo@gmail.com',
    password: '123456',
    role: 'patient',
    profileId: patientProfile.id,
  },
  {
    id: 2,
    email: 'profissional@example.com',
    password: '123456',
    role: 'professional',
    profileId: professionalProfile.id,
  },
]
