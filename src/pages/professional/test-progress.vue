<script setup>
  import { useTest } from '@/composables/useTest'
  import { computed, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useMeasurementSave } from '@/composables/useMeasurementSave'
  import DynamometerPanel from '@/components/tests/DynamometerPanel.vue'
  const { loading, error, test, details: testDetails, data, router } = useTest(['running'])
  const route = useRoute()
  const panel = ref(null)
  const cancelling = ref(false)
  const submission = computed(() => reactive(useMeasurementSave(route.query.id, data.updateTest, id => {
    if (route.path === '/professional/test-progress' && String(route.query.id) === String(id)) {
      router.replace({ path: '/professional/test-finished', query: { id } })
    }
  })))
  function complete (samples) {
    if (!cancelling.value && test.value) submission.value.finish(samples)
  }
  async function cancel () {
    if (!test.value || cancelling.value || submission.value.saving) return
    const id = test.value.id
    cancelling.value = true
    try {
      await panel.value?.disconnect()
      await data.updateTest(id, 'cancelled')
    } catch (error) { alert(error.message) }
    finally { cancelling.value = false }
  }

  import SubpageTitle from '@/components/ui/SubpageTitle.vue';
  import PatientDetails from '@/components/tests/PatientDetails.vue';

</script>

<template>
  <v-container v-if="loading"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></v-container>
  <v-container v-else-if="error"><v-alert role="alert" type="error">{{ error }}</v-alert></v-container>
  <v-container v-else-if="testDetails">
    <SubpageTitle class="mb-2" title="Teste em progresso" />
    <p v-if="testDetails.name" class="text-subtitle-1 font-weight-bold text-grey-darken-1">{{ testDetails.name }}</p>

    <main class="result-layout">
      <div>
        <PatientDetails editable :patient="testDetails" />
        <CancelButton class="mt-3" :disabled="cancelling || submission.saving" text="Cancelar teste" @click="cancel" />
      </div>
      <div class="result-panels">
        <DynamometerPanel :key="testDetails.id" ref="panel" :locked="cancelling || submission.saving || Boolean(submission.error)" :seconds="Number(testDetails.seconds)" :test-id="testDetails.id" @complete="complete" />
        <p v-if="submission.saving" role="status">Salvando medições…</p>
        <v-alert v-else-if="submission.error" role="alert" type="error">
          {{ submission.error }}
          <v-btn :disabled="cancelling" @click="submission.retry()">Tentar salvar novamente</v-btn>
        </v-alert>
      </div>
    </main>
  </v-container>
  <v-container v-else>
    <SubpageTitle title="Teste em progresso" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>

<style scoped src="@/styles/test-result.css"></style>
