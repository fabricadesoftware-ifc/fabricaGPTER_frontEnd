<template>
  <v-container class="ml-6">
    <v-row class="ma-0 d-flex justify-center">
      <v-col cols="3" class="pl-0 pa-0 d-flex align-center pl-4 ml-2">
        <v-img src="@/assets/foto-profissional.png">
          <Camera color="#005BBB" class="ml-12 mt-12" />
        </v-img>

      </v-col>
      <v-col cols="8" class="px-0 py-2 d-flex flex-column align-left pl-6">
        <v-text class="text-h5 font-weight-bold ml-0 mt-4">
          {{ profissionalInfos.name }}
        </v-text>
        <v-text class="text-p font-weight-bolder">
          Clinica {{ profissionalInfos.clinic }}
        </v-text>
      </v-col>

    </v-row>
  </v-container>
</template>

<script setup>
const profissionalInfos = ref(
  {
    name: "Daniel Santos",
    clinic: "Concalver"
  }
);

import {
  Camera
} from "lucide-vue-next";   
</script>