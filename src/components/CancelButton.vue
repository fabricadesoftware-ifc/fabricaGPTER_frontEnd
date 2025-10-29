<template>
  <v-btn
    block
    flat
    height="50"
    color="white"
    class="text-black w-100 rounded-xl text-subtitle-1 border-sm border-opacity-50 text-none"
    >{{ text }}</v-btn
  >
</template>

<script setup>
import { useDisplay } from "vuetify";
const { mdAndUp, smAndDown, xs } = useDisplay();

defineProps({
  text: {
    type: String
  },
})
</script>
