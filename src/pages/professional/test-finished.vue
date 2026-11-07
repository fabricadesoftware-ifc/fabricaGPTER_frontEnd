<script setup>
  import { useTest } from '@/composables/useTest'
  const { test } = useTest(['finished', 'validated'])
  import { CircleCheck } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';
  const { smAndDown } = useDisplay();

</script>

<template>
  <v-container v-if="test" class="fill-height d-flex flex-column align-center justify-center ga-6">
    <span v-if="smAndDown" class="text-h4 font-weight-bold text-center">
      Teste finalizado
      <CircleCheck color="#005BBB" />
    </span>
    <span v-else class="text-h3 font-weight-bold text-center">
      Teste finalizado
      <CircleCheck color="#005BBB" />
    </span>
    <v-btn
      append-icon="mdi-arrow-right-thin"
      class="rounded-lg "
      color="primary"
      height="50"
      :to="{ path: '/professional/test-result', query: { id: test.id } }"
      :width="smAndDown ? '250' : '280'"
    >Visualizar resultado</v-btn>
    <v-btn class="text-p" to="/professional/patients" variant="text">Voltar para pagina inicial</v-btn>
  </v-container>
  <v-container v-else>
    <SubpageTitle title="Teste finalizado" />
    <p class="text-subtitle-1 text-grey-darken-1 mt-4">Nenhum registro disponível.</p>
  </v-container>
</template>
