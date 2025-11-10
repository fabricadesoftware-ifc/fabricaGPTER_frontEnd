<template>
  <v-container>
<div
  class="d-flex justify-center align-center text-center"
  :class="smAndDown ? 'flex-row' : 'flex-column'"
>
  <v-col
   :cols="smAndDown ? 3 : 5" 
   class="d-flex justify-center align-center"
   
   >
    <v-img :src="image" cover max-width="" />
  </v-col>

  <v-col cols="3" class="d-flex justify-center align-center">
    <v-text class="text-h6 font-weight-bold">
      {{ infos.name }}
    </v-text>
  </v-col>
</div>

  </v-container>
</template>

<script setup>
import { defineProps } from 'vue'
import { useDisplay } from "vuetify";


const {  smAndDown } = useDisplay();
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
    }),
  },
})

</script>
