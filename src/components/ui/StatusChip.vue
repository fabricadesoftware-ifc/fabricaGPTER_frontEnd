<script setup>
  import { computed } from 'vue'
  import { ASSESSMENT_STATUS_LABELS } from '@/services/assessments'
  import { patientStatusLabel } from '@/utils/patient'

  // Status always carries a text label; the dot color is a secondary cue.
  const props = defineProps({
    status: { type: String, default: '' },
    kind: { type: String, default: 'assessment' },
  })

  const TONES = {
    running: 'warning',
    finished: 'primary',
    validated: 'success',
    cancelled: 'error',
    ativo: 'success',
    inativo: 'idle',
  }

  const key = computed(() => String(props.status || '').toLowerCase())
  const label = computed(() => props.kind === 'patient'
    ? patientStatusLabel(props.status)
    : ASSESSMENT_STATUS_LABELS[key.value] || props.status)
  const tone = computed(() => TONES[key.value] || 'idle')
</script>

<template>
  <span v-if="label" class="status" :class="`status--${tone}`">
    <span aria-hidden="true" class="status__dot" />{{ label }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--app-border);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--app-ink-muted);
  white-space: nowrap;
}
.status__dot { width: 6px; height: 6px; border-radius: 50%; background: var(--app-idle); }
.status--primary .status__dot { background: var(--app-primary); }
.status--success .status__dot { background: var(--app-success); }
.status--warning .status__dot { background: var(--app-warning); }
.status--error .status__dot { background: rgb(var(--v-theme-error)); }
</style>
