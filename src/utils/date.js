export function formatDateBR (value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value || '')
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value || 'Não informado'
}
