<script setup>
  import {
    Clock,
    User,
  } from 'lucide-vue-next';

  defineProps({
    patient: {
      type: Object,
      required: true,
    },
  });
</script>

<template>
  <v-card class="w-100 elevation-2 rounded-xl mb-6 pl-3 pb-4 h-100 ">
    <v-card-title class="text-h6 text-left font-weight-bold mt-2 mb-0">Detalhes do teste</v-card-title>
    <v-row>
      <v-col class="pl-6 d-flex align-center">
        <User class="mr-2" color="#005BBB" />
        <v-text class="text-subtitle-1 font-weight-bold">
          Pico de contração:
          <v-text class="font-weight-light">{{ patient.peak }}</v-text>
        </v-text>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="pl-6 d-flex align-center">
        <Clock class="mr-2" color="#005BBB" />
        <v-text class="text-subtitle-1 font-weight-bold">
          Período máximo de força:
          <v-text class="font-weight-light">{{ patient.period }}</v-text>
        </v-text>
      </v-col>
    </v-row>
  </v-card>
</template>
