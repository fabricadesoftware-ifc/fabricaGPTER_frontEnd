export function formatDateBR (value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/.exec(value || '')
  return match ? `${match[3]}/${match[2]}/${match[1]}` : value || 'Não informado'
}

// Only timestamps with an explicit offset identify an unambiguous instant.
export function formatLocalDateTime (value) {
  if (typeof value !== 'string' || !/T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(value)) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date)
}
