<script setup>
  import { computed, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()
  const form = reactive({ time: '', observations: '', arm: '' })
  const recommendedHand = ref('')
  const handOptions = computed(() => dominantHands.map(value => ({
    value,
    title: value === recommendedHand.value ? `${value} (recomendada)` : value,
  })))
  watch([() => route.query.patientId, () => route.query.source], async ([patientId, sourceId], _, onCleanup) => {
    let active = true
    onCleanup(() => { active = false })
    const source = data.tests.find(test => String(test.id) === sourceId && String(test.patientId) === patientId)
    recommendedHand.value = ''
    Object.assign(form, {
      time: source ? `${source.seconds}s` : '',
      observations: source?.observations || '',
      arm: source?.arm || '',
    })
    if (!patientId) return
    const patient = await data.loadPatient(patientId)
    if (!active || !patient) return
    recommendedHand.value = patient.dominant_hand
    if (!form.arm) form.arm = recommendedHand.value
  }, { immediate: true })
  const saving = ref(false)
  const errorMessage = ref('')
  async function start () {
    if (saving.value) return
    saving.value = true
    errorMessage.value = ''
    try {
      const test = await data.startTest(route.query.patientId, form)
      router.push({ path: '/professional/test-progress', query: { id: test.id } })
    } catch (error) {
      errorMessage.value = Object.values(error.fields || {}).flat().join(' ') || error.message
    } finally {
      saving.value = false
    }
  }

  import { Play } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';

  import PageTitle from '@/components/ui/PageTitle.vue';
  import ConfirmButton from '@/components/ui/ConfirmButton.vue';

  import { dominantHands } from '@/utils/patient'
  const tempos = ref(['30s', '60s', '120s']);

  const { mdAndUp, smAndDown } = useDisplay()
</script>

<template>
  <v-container class="fill-height d-flex flex-column align-center">
    <PageTitle v-if="smAndDown" title="Novo teste" />


    <div
      class="d-flex flex-grow-1 flex-column align-center justify-center w-100"
    >
      <PageTitle v-if="mdAndUp" class="d-flex justify-center" title="Novo teste" />

      <span class="text-subtitle-1 text-grey-darken-1">Configure os parâmetros para iniciar o teste</span>
      <v-form
        :disabled="saving"
        style="max-width: 600px"
        class="w-100 pa-4 p elevation-3 rounded-xl mt-4"
        @submit.prevent="start"
      >
        <span class="text-subtitle-2">Tempo</span>
        <v-select
          v-model="form.time"
          class="mt-2"
          :items="tempos"
          label="Tempo"
          required
          rounded="lg"
          variant="outlined"
        />

        <v-textarea v-model="form.observations" auto-grow label="Observações (opcional)" rounded="lg" variant="outlined" />
        <v-alert v-if="errorMessage" class="mb-3" role="alert" type="error">{{ errorMessage }}</v-alert>
        <span class="text-subtitle-2">Mão</span>
        <v-select
          v-model="form.arm"
          class="mt-2"
          :items="handOptions"
          label="Mão"
          required
          rounded="lg"
          variant="outlined"
        />


        <ConfirmButton
          class="rounded-lg font-weight-bold"
          height="50"
          :loading="saving"
          :disabled="saving"
          text="Iniciar teste"
          type="submit"
        ><Play :size="16" />
        </ConfirmButton>
      </v-form>

    </div>
  </v-container>
</template>

<style scoped>
.blue-gradient {
  background-image: linear-gradient(
    180deg,
    #4a8dde 0%,
    #0c4f9d 50%,
    #ffffff 50%
  );
}
</style>
