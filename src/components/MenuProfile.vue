<template>
  <v-container>
    <v-row class="ma-0 flex align-center">
      <v-col cols="16" class="pl-0 pa-0 py-">
    <v-img
      src="@/assets/foto-profissional.png"
      class="ml-16 w-40 mt-0 flex flex-0-0"
    ></v-img>
    </v-col>
    <v-col cols="16" class="flex px-0 py-0 align-center m-0">
      <v-col cols="16" class="flex px-0 py-0 align-center m-0"  >
      <v-text class="text-h5 font-weight-bold text-top ml-0">
            Daniel
        </v-text>
      </v-col>
        <v-text class="text-p font-weight-bolder text-top">
            Clinica Concalver
        </v-text>
    </v-col>

  </v-row>
  </v-container>
</template>

<script setup>
const profissionalInfos = ref ([
    {
        name: "Daniel Santos",
        clinic: "Concalver"
    }
]);
</script>