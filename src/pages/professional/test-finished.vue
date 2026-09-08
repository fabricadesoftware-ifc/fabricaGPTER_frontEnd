<script setup>
  import { CircleCheck } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';
  const { smAndDown } = useDisplay();

</script>

<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center ga-6">
    <v-text v-if="smAndDown" class="text-h4 font-weight-bold text-center">
      Teste finalizado
      <CircleCheck color="#005BBB" />
    </v-text>
    <v-text v-else class="text-h3 font-weight-bold text-center">
      Teste finalizado
      <CircleCheck color="#005BBB" />
    </v-text>
    <v-btn
      append-icon="mdi-arrow-right-thin"
      class="rounded-lg "
      color="primary"
      height="50"
      :width="smAndDown ? '250' : '280'"
    >Visualizar resultado</v-btn>
    <v-btn class="text-p" variant="text">Voltar para pagina inicial</v-btn>
  </v-container>
</template>
