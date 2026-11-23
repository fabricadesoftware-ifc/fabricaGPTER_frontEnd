<script setup>
  import { computed } from 'vue'
  import { ASSESSMENT_STATUS_LABELS } from '@/services/assessments'
  import { patientStatusLabel } from '@/utils/patient'

  // Status always carries a text label; color is a secondary cue.
  const props = defineProps({
    status: { type: String, default: '' },
    kind: { type: String, default: 'assessment' },
  })

  const STYLES = {
    running: { color: 'warning', icon: 'mdi-progress-clock' },
    finished: { color: 'primary', icon: 'mdi-check' },
    validated: { color: 'success', icon: 'mdi-check-decagram' },
    cancelled: { color: 'error', icon: 'mdi-close' },
    ativo: { color: 'success', icon: 'mdi-circle-medium' },
    inativo: { color: 'default', icon: 'mdi-circle-off-outline' },
  }

  const key = computed(() => String(props.status || '').toLowerCase())
  const label = computed(() => props.kind === 'patient'
    ? patientStatusLabel(props.status)
    : ASSESSMENT_STATUS_LABELS[key.value] || props.status)
  const style = computed(() => STYLES[key.value] || { color: 'default', icon: '' })
</script>

<template>
  <v-chip
    v-if="label"
    class="font-weight-medium"
    :color="style.color"
    density="comfortable"
    :prepend-icon="style.icon || undefined"
    size="small"
    variant="tonal"
  >{{ label }}</v-chip>
</template>
