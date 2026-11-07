<script setup>
  import { reactive, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  const route = useRoute()
  const router = useRouter()
  const data = useDataStore()
  const form = reactive({ time: '', reps: '', arm: '' })
  const source = data.tests.find(test => test.id === Number(route.query.source) && test.patientId === Number(route.query.patientId))
  if (source) Object.assign(form, { time: `${source.seconds}s`, reps: source.reps, arm: source.arm })
  function start () {
    try {
      const test = data.startTest(Number(route.query.patientId), form)
      router.push({ path: '/professional/test-progress', query: { id: test.id } })
    } catch (error) { alert(error.message) }
  }

  import { Play } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';

  import PageTitle from '@/components/ui/PageTitle.vue';
  import ConfirmButton from '@/components/ui/ConfirmButton.vue';

  const hands = ref(['Esquerda', 'Direita', 'Ambidestro']);
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
        v-if="smAndDown"
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

        <span class="text-subtitle-2">Número de repetições</span>
        <v-text-field
          v-model="form.reps"
          class="mt-2"
          label="Selecione o número de repetições"
          max="100"
          min="1"
          name="repeticoes"
          required
          rounded="lg"
          step="1"
          type="number"
          variant="outlined"
        />

        <span class="text-subtitle-2">Mão</span>
        <v-select
          v-model="form.arm"
          class="mt-2"
          :items="hands"
          label="Mão"
          required
          rounded="lg"
          variant="outlined"
        />


        <ConfirmButton
          class="rounded-lg font-weight-bold"
          height="50"
          text="Iniciar teste"
          type="submit"
        ><Play :size="16" />
        </ConfirmButton>
      </v-form>
      <v-form
        v-if="mdAndUp"
        class="w-50 pa-4 p elevation-3 rounded-xl mt-4"
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

        <span class="text-subtitle-2">Número de repetições</span>
        <v-text-field
          v-model="form.reps"
          class="mt-2"
          label="Selecione o número de repetições"
          max="100"
          min="1"
          name="repeticoes"
          required
          rounded="lg"
          step="1"
          type="number"
          variant="outlined"
        />

        <span class="text-subtitle-2">Mão</span>
        <v-select
          v-model="form.arm"
          class="mt-2"
          :items="hands"
          label="Mão"
          required
          rounded="lg"
          variant="outlined"
        />


        <ConfirmButton
          class="rounded-lg font-weight-bold"
          height="50"
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
