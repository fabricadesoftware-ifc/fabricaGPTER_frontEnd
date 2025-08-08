<template>
  <v-btn
    flat
    height="40"
    class="darken-blue-gradient text-white w-100 rounded-lg"
    >{{ text }}</v-btn
  >
</template>

<script setup>
defineProps(['text'])
</script>

<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>