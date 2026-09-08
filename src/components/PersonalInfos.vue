<script setup>
  defineProps({
    personalInfos: {
      type: Array,
      required: true,
    },
  });
</script>
<template>
  <v-container class="pl-6">
    <v-text class="text-h6 font-weight-bold text-top"> Informações Pessoais </v-text>

    <v-row v-for="info in personalInfos" :key="info.name" class="mt-4 ga-2">
      <v-col align="center" cols="1" justify="center">
        <Component :is="info.icon" color="#005BBB" />
      </v-col>
      <v-col class="d-flex flex-column">
        <v-text class="text-p font-weight-bold"> {{ info.name }}</v-text>
        <v-text class="text-p opacity-90 font-weight-light">{{ info.info }}</v-text>
      </v-col>
    </v-row>
  </v-container>
</template>
