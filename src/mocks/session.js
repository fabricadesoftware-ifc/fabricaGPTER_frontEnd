import { professionalProfile } from './professionals'
import { patientProfile } from './patients'

export const accounts = [
  {
    id: 1,
    user: 'pacienteexemplo',
    password: '123456',
    role: 'patient',
    profileId: patientProfile.id,
  },
  {
    id: 2,
    user: 'profissional',
    password: '123456',
    role: 'professional',
    profileId: professionalProfile.id,
  },
]
