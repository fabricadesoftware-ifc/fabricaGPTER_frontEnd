<template>
  <v-btn
    flat
    height="40"
    color="grey"
    class="text-white w-100 rounded-lg"
    >{{ text }}</v-btn
  >
</template>

<script setup>
defineProps(['text'])
</script>