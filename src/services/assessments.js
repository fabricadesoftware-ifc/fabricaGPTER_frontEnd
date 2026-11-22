import { endpoints } from './endpoints.js'
import { normalizeHand } from '../utils/patient.js'

export function createAssessment (request, patientId, form) {
  const seconds = { '30s': 30, '60s': 60, '120s': 120 }[form.time]
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

export function normalizeAssessment (raw) {
  if (!raw || typeof raw !== 'object') return null
  const patient = raw.patient && typeof raw.patient === 'object' ? raw.patient : null
  return { ...raw, arm: normalizeHand(raw.arm), patientId: raw.patientId ?? raw.patient_id ?? patient?.id ?? raw.patient, patientName: raw.patient_name ?? patient?.name ?? '', startedAt: raw.started_at ?? raw.startedAt ?? raw.start_time ?? raw.date ?? '', date: raw.date || raw.started_at || '', observations: raw.observations ?? '' }
}
