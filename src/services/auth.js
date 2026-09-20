import { accounts } from '@/mocks';

export async function authenticate (user, password) {
  const formatedUser = user.toLowerCase().trim()
  const account = accounts.find(account => {
    return account.user.toLowerCase().trim() === formatedUser && account.password === password
  })

  if(!account) {
    throw new Error('user ou senha invalida')
  }

  return {
    id: account.id,
    user: account.user,
    role: account.role,
    profileId: account.profileId,
  }
}
