<script setup>
  import { computed, onBeforeUnmount, ref, shallowReactive } from 'vue'
  import { createDynamometer, takeTestPort } from '@/services/dynamometer'

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
  function connect () { error.value = ''; device.connect() }
  function start () {
    if (props.locked || active.value) return
    samples.length = 0
    active.value = true
    error.value = ''
    device.start(props.seconds, zero.value)
  }
  function stop () {
    stopping.value = true
    device.stop()
  }
</script>

<template>
  <v-card class="rounded-lg elevation-2">
    <ForceTimeChart :samples="samples" :seconds="seconds" />
    <p v-if="samples.length" class="px-5 pb-4">Última leitura: {{ samples.at(-1).f.toFixed(2) }} N em {{ samples.at(-1).t.toFixed(2) }} s</p>
  </v-card>
  <v-card class="rounded-lg elevation-2 pa-5">
    <h2 class="text-h6 font-weight-bold">Dinamômetro USB</h2>
    <v-divider class="my-3" />
    <p role="status">{{ labels[state] }}{{ active ? ' · Coleta em andamento' : '' }}</p>
    <div class="d-flex flex-wrap ga-2 my-3">
      <v-btn v-if="state === 'disconnected'" @click="connect">Conectar USB</v-btn>
      <v-btn v-else :disabled="state !== 'connected'" @click="device.disconnect()">Desconectar</v-btn>
      <v-btn v-if="!active" color="primary" :disabled="locked || state !== 'connected' || !supported" @click="start">Iniciar coleta</v-btn>
      <v-btn v-else :disabled="stopping || state !== 'connected'" @click="stop">Parar coleta</v-btn>
    </div>
    <v-checkbox v-model="zero" density="compact" :disabled="active" hide-details label="Zerar no início (tara)" />
    <v-alert v-if="!supported" type="info">O dinamômetro suporta coletas de 30 ou 60 segundos.</v-alert>
    <v-alert v-if="error" role="alert" type="error">{{ error }}</v-alert>
  </v-card>
</template>
