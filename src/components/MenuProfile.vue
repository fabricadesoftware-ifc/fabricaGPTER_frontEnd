<template>
  <v-container>
    <v-row class="ma-0 d-flex justify-center align-center">
      <v-col cols="3" class="pl-0 pa-0 d-flex justify-center align-center">
        <v-img src="@/assets/foto-profissional.png">
        </v-img>
      </v-col>

      <v-col cols="6" class="px-0 py-2 d-flex flex-column ml-6">
        <v-text class="text-h5 font-weight-bold ml-0 ">
          {{ profissionalInfos.name }}
        </v-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const profissionalInfos = ref({
  name: "Daniel Santos",
  clinic: "Conviver",
});

import { Camera } from "lucide-vue-next";
</script>
