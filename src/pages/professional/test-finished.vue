<script setup>
  import { useTest } from '@/composables/useTest'
  import { ArrowRight, CircleCheck } from 'lucide-vue-next'
  const { loading, error, test } = useTest(['finished', 'validated'])
</script>

<template>
  <v-container v-if="loading"><v-progress-linear aria-label="Carregando avaliação" indeterminate /></v-container>
  <v-container v-else-if="error"><v-alert role="alert" type="error">{{ error }}</v-alert></v-container>
  <section v-else-if="test" aria-labelledby="finished-title" class="finished">
    <h1 id="finished-title">
      Teste finalizado <CircleCheck aria-hidden="true" color="#005bbb" :size="28" :stroke-width="1.6" />
    </h1>
    <v-btn
      class="result-link text-none"
      flat
      height="48"
      :to="{ path: '/professional/test-result', query: { id: test.id } }"
    >
      Visualizar resultado <ArrowRight aria-hidden="true" class="ml-1" :size="16" />
    </v-btn>
    <v-btn class="home-link text-none" to="/professional/patients" variant="text">Voltar para a página inicial</v-btn>
  </section>
  <v-container v-else>
    <SubpageTitle title="Teste finalizado" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>

<style scoped>
.finished {
  min-height: calc(100dvh - var(--v-layout-top, 0px) - var(--v-layout-bottom, 0px));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px clamp(24px, 12vh, 112px);
}
.finished h1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: clamp(1.75rem, 3.4vw, 2.5rem);
  line-height: 1.2;
  margin-bottom: 28px;
}
.result-link {
  width: min(250px, 100%);
  background: linear-gradient(105deg, #2879da, #0d50a0);
  border-radius: 8px;
  color: white;
  letter-spacing: normal;
}
.home-link { margin-top: 10px; letter-spacing: normal; }
</style>
