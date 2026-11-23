<script setup>
  import { computed, ref, watch } from 'vue'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import { compareAssessmentsDesc } from '@/services/assessments'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import TestHistoryList from '@/components/tests/TestHistoryList.vue'

  const PAGE_SIZE = 9
  const data = useDataStore()
  const session = useSessionStore()

  const profileId = computed(() => session.user?.profileId)
  const tests = computed(() => data.tests
    .filter(test => String(test.patientId) === String(profileId.value) && ['finished', 'validated'].includes(test.status))
    .sort(compareAssessmentsDesc))

  const currentPage = ref(1)
  const totalPages = computed(() => Math.max(1, Math.ceil(tests.value.length / PAGE_SIZE)))
  const pageTests = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return tests.value.slice(start, start + PAGE_SIZE)
  })
  watch(totalPages, total => {
    if (currentPage.value > total) currentPage.value = total
  })

  const loading = ref(false)
  const error = ref('')
  watch(profileId, async (id, _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    currentPage.value = 1
    loading.value = Boolean(id)
    error.value = id ? '' : 'Seu usuário não está vinculado a um cadastro de paciente. Entre em contato com o suporte.'
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
  <div class="page page--narrow">
    <PageHeader
      :subtitle="loading ? 'Carregando avaliações…' : `${tests.length} ${tests.length === 1 ? 'avaliação concluída' : 'avaliações concluídas'}`"
      title="Histórico de testes"
    />
    <v-card v-if="loading"><v-progress-linear aria-label="Carregando avaliações" indeterminate /><div class="pa-8" /></v-card>
    <v-alert v-else-if="error" role="alert" type="error">{{ error }}</v-alert>
    <v-card v-else-if="!pageTests.length" class="empty">
      <p class="font-weight-semibold mb-1">Nenhuma avaliação ainda</p>
      <p class="text-body-2 text-muted">Seus testes aparecerão aqui depois que o profissional finalizá-los.</p>
    </v-card>
    <template v-else>
      <v-card><TestHistoryList :tests="pageTests" /></v-card>
      <v-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        class="mt-4"
        :length="totalPages"
      />
    </template>
  </div>
</template>

<style scoped>
.empty { padding: 40px 24px; text-align: center; }
</style>
