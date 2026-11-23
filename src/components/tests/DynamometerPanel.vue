<script setup>
  import { computed, onBeforeUnmount, ref, shallowReactive } from 'vue'
  import { Play, Plug, Square, Unplug } from 'lucide-vue-next'
  import { createDynamometer, takeTestPort } from '@/services/dynamometer'
  import ForceTimeChart from '@/components/tests/ForceTimeChart.vue'

  const emit = defineEmits(['complete'])
  const props = defineProps({ locked: Boolean, seconds: { type: Number, required: true }, testId: { type: [Number, String], required: true } })
  const state = ref('disconnected')
  const labels = { disconnected: 'Desconectado', connecting: 'Conectando…', connected: 'Conectado', disconnecting: 'Desconectando…' }
  const error = ref('')
  const active = ref(false)
  const stopping = ref(false)
  const zero = ref(true)
  const supported = computed(() => [30, 60].includes(props.seconds))
  const samples = shallowReactive([])
  const device = createDynamometer({
    onState (value) {
      state.value = value
      if (value === 'disconnecting') { active.value = false; stopping.value = false }
    },
    onError (message) { error.value = message },
    onEnd () {
      active.value = false
      stopping.value = false
      if (samples.length) emit('complete', samples)
      else error.value = 'Coleta encerrada sem medições.'
    },
    onSample (sample) {
      samples.push(sample)
    },
  })
  onBeforeUnmount(device.dispose)
  defineExpose({ disconnect: device.disconnect })
  const selectedPort = takeTestPort(props.testId)
  if (selectedPort) device.connect(selectedPort)

  const last = computed(() => samples.length ? samples.at(-1) : null)
  const elapsed = computed(() => Math.min(props.seconds, last.value?.t ?? 0))
  const progress = computed(() => props.seconds ? (elapsed.value / props.seconds) * 100 : 0)
  const statusTone = computed(() => ({ connected: 'ok', connecting: 'busy', disconnecting: 'busy' })[state.value] || 'off')

  function connect () { error.value = ''; device.connect() }
  function start () {
    if (props.locked || active.value) return
    samples.length = 0
    error.value = ''
    if (device.start(props.seconds, zero.value) === false) {
      error.value = 'Não foi possível iniciar a coleta. Verifique a conexão com o dinamômetro.'
      return
    }
    active.value = true
  }
  function stop () {
    stopping.value = true
    device.stop()
  }
</script>

<template>
  <v-card>
    <div class="card-header">
      <h2>Dinamômetro USB</h2>
      <span class="device-status" :class="`device-status--${statusTone}`" role="status">
        <span class="device-status__dot" />{{ labels[state] }}
      </span>
    </div>

    <div class="card-section stack">
      <div class="live">
        <div>
          <p class="eyebrow">Força atual</p>
          <p class="live__value" :class="{ 'text-subtle': !last }">{{ last ? last.f.toFixed(1) : '0.0' }}<span class="live__unit">N</span></p>
        </div>
        <div class="text-right">
          <p class="eyebrow">Tempo</p>
          <p class="live__time">{{ elapsed.toFixed(1) }} / {{ seconds }} s</p>
        </div>
      </div>
      <v-progress-linear
        :aria-label="`Progresso da coleta: ${Math.round(progress)}%`"
        :color="active ? 'primary' : 'surface-variant'"
        height="8"
        :model-value="progress"
      />

      <div class="actions">
        <v-btn
          v-if="state === 'disconnected'"
          size="large"
          variant="outlined"
          @click="connect"
        ><Plug class="mr-2" :size="18" />Conectar USB</v-btn>
        <v-btn
          v-else
          :disabled="state !== 'connected' || active"
          size="large"
          variant="outlined"
          @click="device.disconnect()"
        ><Unplug class="mr-2" :size="18" />Desconectar</v-btn>

        <v-btn
          v-if="!active"
          color="primary"
          :disabled="locked || state !== 'connected' || !supported"
          size="large"
          @click="start"
        ><Play class="mr-2" :size="18" />Iniciar coleta</v-btn>
        <v-btn
          v-else
          color="error"
          :disabled="stopping || state !== 'connected'"
          :loading="stopping"
          size="large"
          variant="tonal"
          @click="stop"
        ><Square class="mr-2" :size="16" />Parar coleta</v-btn>
      </div>

      <v-checkbox
        v-model="zero"
        density="compact"
        :disabled="active"
        hide-details
        label="Zerar no início (tara) — mantenha o equipamento sem carga"
      />
      <v-alert v-if="!supported" density="compact" type="info">O dinamômetro suporta coletas de 30 ou 60 segundos.</v-alert>
      <v-alert v-if="error" density="compact" role="alert" type="error">{{ error }}</v-alert>
    </div>
  </v-card>

  <ForceTimeChart
    :samples="samples"
    :seconds="seconds"
    :show-peak="false"
    :show-table="false"
    title="Leitura em tempo real"
  />
</template>

<style scoped>
.device-status { display: inline-flex; align-items: center; gap: 8px; font-size: 0.8125rem; font-weight: 600; color: var(--app-ink-muted); }
.device-status__dot { width: 8px; height: 8px; border-radius: 50%; background: #94A3B8; }
.device-status--ok .device-status__dot { background: #13795B; box-shadow: 0 0 0 3px rgba(19, 121, 91, 0.16); }
.device-status--busy .device-status__dot { background: #B45309; }
.live { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
.live p { margin: 0; }
.live__value { font-size: 2.5rem; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; font-variant-numeric: tabular-nums; }
.live__unit { font-size: 1rem; font-weight: 500; color: var(--app-ink-muted); margin-left: 6px; }
.live__time { font-size: 1.125rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
@media (max-width: 599px) { .actions { grid-template-columns: minmax(0, 1fr); } }
</style>
