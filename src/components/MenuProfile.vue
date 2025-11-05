<template>
  <v-container>
    <v-row class="ma-0 d-flex justify-center align-center">
      <v-col cols="3" class="pl-0 pa-0 d-flex justify-center align-center">
        <v-img :src="image" cover />
      </v-col>

      <v-col cols="6" class="px-0 py-2 d-flex flex-column ml-6">
        <v-text class="text-h5 font-weight-bold ml-0">
          {{ infos.name }}
        </v-text>
        <v-text class="text-subtitle-2 opacity-70">
          {{ infos.clinic }}
        </v-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  image: {
    type: String,
    required: true,
  },
  infos: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      clinic: '',
    }),
  },
})
</script>
