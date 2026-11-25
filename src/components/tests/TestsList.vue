<script setup>
  import { computed, ref, watch } from 'vue'
  import { Activity, ChevronRight } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { formatDateBR } from '@/utils/date'
  import { compareAssessmentsDesc } from '@/services/assessments'
  import StatusChip from '@/components/ui/StatusChip.vue'

  const RECENT_LIMIT = 5
  const props = defineProps({ patientId: { type: [Number, String], required: true } })
  const data = useDataStore()

  const showAll = ref(false)
  const allTests = computed(() => data.tests
    .filter(test => String(test.patientId) === String(props.patientId) && ['running', 'finished', 'validated'].includes(test.status))
    .sort((a, b) => Number(b.status === 'running') - Number(a.status === 'running') || compareAssessmentsDesc(a, b)))
  const tests = computed(() => showAll.value ? allTests.value : allTests.value.slice(0, RECENT_LIMIT))

  const loading = ref(false)
  const error = ref('')
  watch(() => props.patientId, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    showAll.value = false
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
  <v-card>
    <div class="card-header">
      <h2>Avaliações</h2>
      <span v-if="allTests.length" class="text-body-2 text-subtle">{{ allTests.length }} no total</span>
    </div>
    <v-progress-linear v-if="loading" aria-label="Carregando avaliações" indeterminate />
    <v-alert
      v-else-if="error"
      class="ma-4"
      role="alert"
      type="error"
    >{{ error }}</v-alert>
    <div v-else-if="!tests.length" class="empty">
      <Activity class="mb-2 text-subtle" :size="28" />
      <p class="font-weight-medium mb-1">Nenhuma avaliação ainda</p>
      <p class="text-body-2 text-muted">Use “Iniciar teste” para registrar a primeira</p>
    </div>
    <template v-else>
      <ul class="tests">
        <li v-for="test in tests" :key="test.id">
          <router-link class="list-row" :to="{ path: '/professional/assessment-details', query: { id: test.id, patientId } }">
            <span class="test-row__main">
              <span class="test-row__title">Teste de {{ test.seconds }} s</span>
              <span class="test-row__meta">{{ formatDateBR(test.date) }} · mão {{ (test.arm || 'não informada').toLowerCase() }}</span>
            </span>
            <StatusChip :status="test.status" />
            <ChevronRight class="text-subtle" :size="18" />
          </router-link>
        </li>
      </ul>
      <div v-if="allTests.length > RECENT_LIMIT" class="pa-2 text-center">
        <v-btn variant="text" @click="showAll = !showAll">
          {{ showAll ? 'Mostrar menos' : `Ver todas (${allTests.length})` }}
        </v-btn>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
.empty { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 40px 24px; }
.tests { list-style: none; margin: 0; padding: 0; }
.tests li + li { border-top: 1px solid var(--app-border); }
.test-row__main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.test-row__title { font-weight: 500; }
.test-row__meta { font-size: 0.8125rem; color: var(--app-ink-subtle); }
</style>
