<script setup>
  import { computed, ref, watch } from 'vue'
  import { useDataStore } from '@/stores/data'
  import { formatDateBR } from '@/utils/date'
  const props = defineProps({ patientId: { type: [Number, String], required: true } })
  const data = useDataStore()
  const tests = computed(() => data.tests.filter(test => String(test.patientId) === String(props.patientId) && ['running', 'finished', 'validated'].includes(test.status)).sort((a, b) => Number(b.status === 'running') - Number(a.status === 'running') || b.date.localeCompare(a.date) || String(b.id).localeCompare(String(a.id))).slice(0, 3))
  import { useDisplay } from 'vuetify';

  const { mdAndUp, smAndDown } = useDisplay();


  const loading = ref(false)
  const error = ref('')
  watch(() => props.patientId, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    error.value = ''
    loading.value = Boolean(id)
    if (!id) return
    try {
      await data.loadTests(id)
    } catch (failure) {
      if (active) error.value = failure.message
    } finally {
      if (active) loading.value = false
    }
  }, { immediate: true })
</script>

<template>
  <v-card
    :class="['mx-auto', { 'pa-4': smAndDown, 'pa-6': mdAndUp }]"
    elevation="2"
    :min-height="mdAndUp ? '349' : '300'"
    :min-width="mdAndUp ? '590' : '90vw'"
    rounded="xl"
  >
    <v-card-title
      class="font-weight-medium pa-0"
      :class="{ 'text-h6 mb-3': smAndDown, 'text-h5 mb-6': mdAndUp }"
    >
      Testes recentes
    </v-card-title>

    <v-divider color="grey-darken-4" />

    <v-card-text :class="['pa-0', { 'mt-6': mdAndUp, 'mt-4': smAndDown }]">
      <v-progress-linear v-if="loading" aria-label="Carregando avaliações" indeterminate />
      <v-alert v-else-if="error" role="alert" type="error">{{ error }}</v-alert>
      <p v-else-if="!tests.length">Nenhuma avaliação encontrada.</p>
      <v-list v-else class="d-flex flex-column rounded-xl pa-0">
        <v-list-item
          v-for="test in tests"
          :key="test.id"
          :aria-label="test.name + ' em ' + formatDateBR(test.date)"
          class="pa-0"
          :to="{ path: '/professional/assessment-details', query: { id: test.id, patientId } }"
        >
          <div class="d-flex flex-row justify-space-between align-center w-100">
            <v-list-item-title class="text-body-1">{{ test.name }}</v-list-item-title>
            <div class="text-right">
              <v-list-item-title class="text-grey-darken-2">
                {{ formatDateBR(test.date) }}
              </v-list-item-title>
            </div>
          </div>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
