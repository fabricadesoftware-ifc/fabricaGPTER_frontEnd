import profilePhoto from '../assets/foto-profissional.png'

export const professionalProfile = {
  name: 'Daniel Santos',
  email: 'daniel@gmail.com',
  phone: '(47)998903948',
  birthDate: '25/08/1989',
  cpf: '01234567890',
  photo: profilePhoto,
}

export const testProfessional = {
  name: 'Daniela Silva',
}

export const professionalPersonalInfos = [
  {
    name: 'Nome',
    info: professionalProfile.name,
    icon: 'user',
  },
  {
    name: 'Email',
    info: professionalProfile.email,
    icon: 'mail',
  },
  {
    name: 'Telefone',
    info: professionalProfile.phone,
    icon: 'phone',
  },
  {
    name: 'Data de Nascimento',
    info: professionalProfile.birthDate,
    icon: 'calendar',
  },
  {
    name: 'CPF',
    info: professionalProfile.cpf,
    icon: 'fingerprint',
  },
]
