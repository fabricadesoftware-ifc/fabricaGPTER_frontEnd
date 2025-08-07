<template>
  <v-form class="pa-4 elevation-3 rounded-xl">
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="Nome completo"
      required
    />
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="Email"
      type="email"
      required
    />
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="CPF"
      required
    ></v-text-field>
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="Senha"
      type="password"
      required
    ></v-text-field>
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="Confirmar senha"
      type="password"
      required
    ></v-text-field>
    <v-text-field
      rounded="lg"
      density="compact"
      variant="outlined"
      label="Logradouro"
      required
    ></v-text-field>

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
      <v-col cols="4" class="pa-0">
        <CancelButton text="Cancelar" />
      </v-col>
      <v-col cols="8" class="pr-0 py-0">
        <ConfirmButton
          text="Cadastrar"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import ConfirmButton from './ConfirmButton.vue';
import CancelButton from './CancelButton.vue';

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