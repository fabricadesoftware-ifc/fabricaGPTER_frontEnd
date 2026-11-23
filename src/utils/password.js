export const PASSWORD_MIN_LENGTH = 8

export function validatePasswordChange (current, password, confirmation) {
  const errors = {}
  if (!current) errors.current = 'Informe a senha atual.'
  if (!password) errors.password = 'Informe a nova senha.'
  else if (password.length < PASSWORD_MIN_LENGTH) errors.password = `A nova senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres.`
  if (!confirmation) errors.confirmation = 'Confirme a nova senha.'
  else if (confirmation !== password) errors.confirmation = 'As senhas não coincidem.'
  if (password && current && password === current) errors.password = 'A nova senha deve ser diferente da senha atual.'
  return errors
}

export function hasErrors (errors) {
  return Object.keys(errors).length > 0
}
