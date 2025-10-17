<template>
  <v-form
    class="pa-4 elevation-3 rounded-xl"
    :class="{ 'elevation-0': mdAndUp }"
  >
    <v-text-field
      v-for="field in fields"
      :key="field.label"
      rounded="lg"
      density="compact"
      variant="outlined"
      :label="field.label"
      :type="field.type"
      required
    />

    <v-row class="ma-0">
      <v-col cols="8" class="pa-0">
        <v-text-field
          rounded="lg"
          density="compact"
          variant="outlined"
          label="Cidade"
          required
        ></v-text-field>
      </v-col>
      <v-col class="pr-0 py-0">
        <v-select
          rounded="lg"
          density="compact"
          variant="outlined"
          :items="states"
          label="UF"
          required
        ></v-select>
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col cols="8" class="pa-0">
        <v-text-field
          rounded="lg"
          density="compact"
          variant="outlined"
          label="Bairro"
          required
        ></v-text-field>
      </v-col>
      <v-col class="pr-0 py-0">
        <v-text-field
          rounded="lg"
          density="compact"
          variant="outlined"
          label="Número"
          type="number"
          required
        />
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col cols="6" class="pa-0 py-0">
        <CancelButton @click="goBack()" text="Cancelar" />
      </v-col>
      <v-col cols="6" class="pr-0 py-0">
        <ConfirmButton text="Salvar" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

import ConfirmButton from "./ConfirmButton.vue";
import CancelButton from "./CancelButton.vue";

const { smAndDown, xs, mdAndUp } = useDisplay();

const router = useRouter();

const goBack = () => {
  router.back();
};

const fields = ref([
  {
    label: "Nome completo",
    type: "name",
  },
  {
    label: "Email",
    type: "email",
  },
  {
    label: "CPF",
    type: "number",
  },
  {
    label: "Senha",
    type: "password",
  },
  {
    label: "Confirmar senha",
    type: "password",
  },
  {
    label: "Logradouro",
    type: "text",
  },
]);

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];
</script>