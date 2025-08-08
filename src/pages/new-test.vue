<template>
  <v-container class="fill-height d-flex flex-column align-center">
    <PageTitle title="Novo teste" />

    <div
      class="d-flex flex-grow-1 flex-column align-center justify-center w-100"
    >
      <v-text class="text-subtitle-1 text-grey-darken-1"
        >Configure os parâmetros para iniciar o teste</v-text
      >
      <v-form class="w-100 pa-4 p elevation-3 rounded-xl mt-4">
        <v-text class="text-subtitle-2">Paciente</v-text>
        <v-select
          :items="pacientes"
          label="Selecione um paciente"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <v-text class="text-subtitle-2">Tempo</v-text>
        <v-select
          :items="tempos"
          label="Selecione o tempo"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <v-text class="text-subtitle-2">Número de repetições</v-text>
        <v-text-field
          variant="outlined"
          rounded="lg"
          name="repeticoes"
          label="Selecione o número de repetições"
        ></v-text-field>

        <ConfirmButton
          text="Iniciar teste"
          height="50"
          class="rounded-lg font-weight-bold"
          ><Play :size="16" />
        </ConfirmButton>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { Play } from "lucide-vue-next";

import PageTitle from "@/components/PageTitle.vue";
import ConfirmButton from "@/components/ConfirmButton.vue";

const pacientes = ref(["Paciente 1", "Paciente 2", "Paciente 3"]);
const tempos = ref([30, 60, 120]);
</script>

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
