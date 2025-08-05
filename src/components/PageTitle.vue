<template>
  <div class="w-100">
    <v-text tag="h1" class="text-h5 font-weight-medium">{{ title }}</v-text>
  </div>
</template>

<script setup>
defineProps(['title'])
</script>