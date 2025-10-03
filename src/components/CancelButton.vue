<template>
  <v-btn
    flat
    :height="smAndDown ? '40' : '50'"
    color="white"
    :class="smAndDown ? 'rounded-lg' : 'rounded-xl'"
    class="text-black w-100 rounded-lg border-sm border-opacity-50 text-none"
    >{{ text }}</v-btn
  >
</template>

<script setup>
import { useDisplay } from "vuetify";
defineProps({
  text: {
    type: String,
    required: true,
  },
});

const { mdAndUp, smAndDown, xs } = useDisplay();
</script>
