import { endpoints } from './endpoints.js'
import { normalizeHand } from '../utils/patient.js'

// The USB dynamometer firmware only accepts START30 and START60.
export const TEST_DURATIONS = { '30s': 30, '60s': 60 }

export function createAssessment (request, patientId, form) {
  const seconds = TEST_DURATIONS[form.time]
  if (!patientId) throw new Error('Paciente não informado.')
  if (!Number.isInteger(seconds)) throw new Error('Selecione o tempo do teste.')
  if (!normalizeHand(form.arm)) throw new Error('Selecione a mão testada.')
  return request(endpoints.assessments, {
    method: 'POST',
    body: { patient: patientId, seconds, arm: form.arm, observations: (form.observations ?? '').trim() },
  })
}

export function updateAssessment (request, id, changes) {
  return request(endpoints.assessment(id), { method: 'PATCH', body: changes })
}

// Loads every page of a patient's assessments (the API paginates them).
export async function fetchAllAssessments (request, patientId) {
  const pageSize = 100
  const records = []
  for (let page = 1; ; page++) {
    const params = new URLSearchParams({ patient: String(patientId), page: String(page), page_size: String(pageSize) })
    const response = await request(`${endpoints.assessments}?${params.toString()}`)
    const results = Array.isArray(response) ? response : (response?.results ?? [])
    records.push(...results)
    const total = Number(response?.count)
    if (Array.isArray(response) || results.length < pageSize || (Number.isFinite(total) && records.length >= total)) break
  }
  return records
}

export function normalizeAssessment (raw) {
  if (!raw || typeof raw !== 'object') return null
  const patient = raw.patient && typeof raw.patient === 'object' ? raw.patient : null
  return {
    ...raw,
    arm: normalizeHand(raw.arm),
    patientId: raw.patientId ?? raw.patient_id ?? patient?.id ?? raw.patient,
    patientName: raw.patient_name ?? patient?.name ?? '',
    startedAt: raw.started_at ?? raw.startedAt ?? raw.start_time ?? raw.date ?? '',
    date: raw.date || raw.started_at || '',
    observations: raw.observations ?? '',
  }
}

export const ASSESSMENT_STATUS_LABELS = {
  running: 'Em andamento',
  finished: 'Finalizado',
  validated: 'Validado',
  cancelled: 'Cancelado',
}

// Most recent first; ids are compared numerically ("10" after "9").
export function compareAssessmentsDesc (a, b) {
  return String(b.startedAt || b.date || '').localeCompare(String(a.startedAt || a.date || ''))
    || (Number(b.id) || 0) - (Number(a.id) || 0)
}

export function measurementSummary (samples) {
  if (!Array.isArray(samples) || !samples.length) return null
  let peak = samples[0]
  for (const sample of samples) {
    if (sample.f > peak.f) peak = sample
  }
  return { peak: peak.f, peakTime: peak.t }
}
