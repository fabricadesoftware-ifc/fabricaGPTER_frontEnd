import { endpoints } from './endpoints.js'

function first (...values) {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value
  }
  return ''
}

export function normalizeSupport (data) {
  const source = data?.support ?? data ?? {}
  const email = first(source.email, source.mail)
  const phone = first(source.phone, source.telefone, source.telephone)
  return {
    email: typeof email === 'string' ? email.trim() : '',
    phone: typeof phone === 'string' ? phone.trim() : '',
  }
}

function sectionList (data) {
  if (Array.isArray(data)) return data
  if (!data || typeof data !== 'object') return []
  for (const key of ['sections', 'terms', 'items', 'results', 'data']) {
    if (Array.isArray(data[key])) return data[key]
  }
  return []
}

function updatedAtFrom (data) {
  if (!data || typeof data !== 'object') return ''
  return first(
    data.updated_at,
    data.updatedAt,
    data.last_updated,
    data.lastUpdated,
    data.date,
  )
}

export function normalizeTerms (data) {
  const sections = sectionList(data)
    .map((section, index) => {
      const order = Number(section?.order ?? section?.position ?? section?.sort)
      return {
        id: first(section?.id, section?.slug, section?.key, index),
        title: first(section?.title, section?.heading),
        content: first(section?.content, section?.body, section?.text),
        order: Number.isFinite(order) ? order : null,
        originalIndex: index,
      }
    })
    .sort((a, b) => {
      if (a.order !== null && b.order !== null) return a.order - b.order
      if (a.order !== null) return -1
      if (b.order !== null) return 1
      return a.originalIndex - b.originalIndex
    })
    .map(section => ({ id: section.id, title: section.title, content: section.content }))

  return {
    sections,
    updatedAt: updatedAtFrom(data),
  }
}

export async function fetchSupport (request) {
  const data = await request(endpoints.support)
  return normalizeSupport(data)
}

export async function fetchTerms (request) {
  const data = await request(endpoints.terms)
  return normalizeTerms(data)
}
