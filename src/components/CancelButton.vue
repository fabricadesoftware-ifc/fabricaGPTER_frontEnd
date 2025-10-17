<template>
  <v-btn
    flat
    block
    :height="height"
    color="grey-darken-2"
    class="text-none text-white text-subtitle-1 font-weight-regular w-100 rounded-lg"
    >{{ text }}</v-btn
  >
</template>

<script setup>
defineProps({
  text: {
    type: String
  },
  height: {
    type: String,
    default: '40'
  }
})
</script>