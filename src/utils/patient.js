export function validatePatient (values, editing = false) {
  const required = ['name', 'email', 'cpf', 'street', 'city', 'state', 'neighborhood', 'number']
  if (required.some(key => !String(values[key] || '').trim())) return 'Preencha todos os campos obrigatórios.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) return 'Informe um email válido.'
  if (!/^\d{11}$/.test(values.cpf)) return 'O CPF deve conter 11 dígitos.'
  if ((!editing || values.password) && values.password.length < 6) return 'A senha deve ter pelo menos 6 caracteres.'
  if (values.password !== values.confirmation) return 'As senhas não coincidem.'
  return ''
}
