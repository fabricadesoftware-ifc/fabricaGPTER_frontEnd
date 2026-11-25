<script setup>
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { Play, Usb } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { rememberTestPort, requestDynamometerPort } from '@/services/dynamometer'
  import { TEST_DURATIONS } from '@/services/assessments'
  import { dominantHands } from '@/utils/patient'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'

  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()

  const durations = Object.keys(TEST_DURATIONS)
  const form = reactive({ time: '', observations: '', arm: '' })
  const recommendedHand = ref('')
  const patient = ref(null)
  const patientId = computed(() => route.query.patientId || '')
  const serialSupported = typeof navigator !== 'undefined' && Boolean(navigator.serial)
  const back = computed(() => patientId.value
    ? { path: '/professional/patient-details', query: { id: patientId.value } }
    : '/professional/patients')
  const canStart = computed(() => Boolean(patientId.value && form.time && form.arm))

  watch([patientId, () => route.query.source], async ([id, sourceId], _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    const source = data.tests.find(test => String(test.id) === String(sourceId) && String(test.patientId) === String(id))
    recommendedHand.value = ''
    patient.value = null
    Object.assign(form, {
      time: source && durations.includes(`${source.seconds}s`) ? `${source.seconds}s` : '30s',
      observations: source?.observations || '',
      arm: source?.arm || '',
    })
    if (!id) return
    const loaded = await data.loadPatient(id)
    if (!active || !loaded) return
    patient.value = loaded
    recommendedHand.value = loaded.dominant_hand
    if (!form.arm) form.arm = recommendedHand.value
  }, { immediate: true })

  const saving = ref(false)
  const errorMessage = ref('')
  async function start () {
    if (saving.value || !patientId.value) return
    saving.value = true
    errorMessage.value = ''
    try {
      let port
      if (serialSupported && form.arm && durations.includes(form.time)) {
        try {
          port = await requestDynamometerPort()
        } catch (error) {
          if (error.name !== 'NotFoundError') throw error
        }
      }
      const test = await data.startTest(patientId.value, form)
      if (port) rememberTestPort(test.id, port)
      await router.push({ path: '/professional/test-progress', query: { id: test.id } })
    } catch (error) {
      errorMessage.value = Object.values(error.fields || {}).flat().join(' ') || error.message
    } finally {
      saving.value = false
    }
  }
</script>

<template>
  <div class="page page--narrow">
    <PageHeader
      :back="back"
      :back-label="patientId ? 'Paciente' : 'Pacientes'"
      subtitle="Configure a coleta antes de conectar o dinamômetro"
      title="Novo teste"
    />

    <v-alert
      v-if="!patientId"
      role="alert"
      type="warning"
    >
      Selecione um paciente antes de iniciar o teste.
      <template #append>
        <v-btn size="small" to="/professional/patients" variant="outlined">Ir para pacientes</v-btn>
      </template>
    </v-alert>

    <v-form v-else :disabled="saving" @submit.prevent="start">
      <v-card>
        <div v-if="patient" class="patient-strip">
          <ProfileAvatar :name="patient.name" :photo="patient.photo" :size="40" />
          <div>
            <p class="eyebrow">Paciente</p>
            <p class="font-weight-medium">{{ patient.name }}</p>
          </div>
        </div>
        <v-divider v-if="patient" />

        <div class="card-section stack">
          <div>
            <p class="field-label">Tempo de coleta</p>
            <v-btn-toggle
              v-model="form.time"
              class="toggle"
              divided
              variant="outlined"
            >
              <v-btn v-for="duration in durations" :key="duration" :value="duration">{{ duration.replace('s', ' segundos') }}</v-btn>
            </v-btn-toggle>
          </div>

          <div>
            <p class="field-label">Mão testada</p>
            <v-btn-toggle
              v-model="form.arm"
              class="toggle"
              divided
              variant="outlined"
            >
              <v-btn v-for="hand in dominantHands" :key="hand" :value="hand">
                {{ hand }}
                <span v-if="hand === recommendedHand" class="toggle__note">· dominante</span>
              </v-btn>
            </v-btn-toggle>
          </div>

          <v-textarea
            v-model="form.observations"
            auto-grow
            hide-details="auto"
            label="Observações (opcional)"
            rows="3"
          />

          <v-alert
            v-if="!serialSupported"
            density="compact"
            type="warning"
          >Este navegador não acessa o dinamômetro USB. Use o Chrome ou o Edge em um computador.</v-alert>
          <div v-else class="hint">
            <Usb class="flex-shrink-0" :size="16" />
            <span>Ao iniciar, o navegador pedirá para escolher a porta do dinamômetro.</span>
          </div>

          <v-alert v-if="errorMessage" role="alert" type="error">{{ errorMessage }}</v-alert>
        </div>

        <v-divider />
        <div class="form-actions">
          <v-btn :to="back" variant="text">Cancelar</v-btn>
          <v-btn
            color="primary"
            :disabled="!canStart || saving"
            :loading="saving"
            size="large"
            type="submit"
          ><Play class="mr-2" :size="16" />Iniciar teste</v-btn>
        </div>
      </v-card>
    </v-form>
  </div>
</template>

<style scoped>
.patient-strip { display: flex; align-items: center; gap: 12px; padding: 16px 24px; }
.patient-strip p { margin: 0; }
.field-label { font-size: 0.875rem; font-weight: 500; color: var(--app-ink-muted); margin: 0 0 8px; }
.toggle { width: 100%; height: 48px !important; }
.toggle :deep(.v-btn) { flex: 1 1 0; }
.toggle__note { margin-left: 4px; font-weight: 400; color: var(--app-ink-subtle); }
.hint { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--app-ink-muted); }
.form-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 24px; }
@media (max-width: 599px) {
  .patient-strip, .form-actions { padding: 16px; }
  .form-actions .v-btn { flex: 1 1 0; }
}
</style>
