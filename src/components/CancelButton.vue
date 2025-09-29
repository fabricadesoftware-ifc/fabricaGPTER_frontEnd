<template>
  <v-btn
    flat
    :height="smAndDown ? '40' : '50'"
    color="grey"
    class="text-white w-100 rounded-lg text-none"
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
