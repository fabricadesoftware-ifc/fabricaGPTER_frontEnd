<template>
  <div class="w-100 mt-2 d-flex" :class="justify">
    <v-text class="text-h4 font-weight-bold">{{ title }}</v-text>
  </div>
</template>

<script setup>
defineProps(['title', 'justify'])
</script>