import profilePhoto from '../assets/foto-profissional.png'

export const patientProfile = {
  id: 2,
  name: 'Daniel Santos',
  email: 'daniel@gmail.com',
  phone: '(47)998903948',
  birthDate: '25/08/1989',
  cpf: '01234567890',
  photo: profilePhoto,
}

export const patients = [
  {
    id: 1,
    name: 'Roberto Santos',
    address: 'Avenida Nereu Ramos, 154, Centro, Balneário Piçarras',
    email: 'roberto@gmail.com',
    status: 'Ativo',
  },
  {
    id: 2,
    name: 'Fábio Longo de Moura',
  },
  {
    id: 3,
    name: 'João Vitor Guiotti',
  },
  {
    id: 4,
    name: 'Tiago Veigh',
  },
  {
    id: 5,
    name: 'Adamo Dalberto',
  },
  {
    id: 6,
    name: 'Larissa dos Santos',
  },
  {
    id: 7,
    name: 'João Tarzan',
  },
  {
    id: 8,
    name: 'Marr Candré',
  },
]


export const patientPersonalInfos = [
  {
    name: 'Nome',
    info: patientProfile.name,
    icon: 'user',
  },
  {
    name: 'Email',
    info: patientProfile.email,
    icon: 'mail',
  },
  {
    name: 'Telefone',
    info: patientProfile.phone,
    icon: 'phone',
  },
  {
    name: 'Data de Nascimento',
    info: patientProfile.birthDate,
    icon: 'calendar',
  },
  {
    name: 'CPF',
    info: patientProfile.cpf,
    icon: 'fingerprint',
  },
]
