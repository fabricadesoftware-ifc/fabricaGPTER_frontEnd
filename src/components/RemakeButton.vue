<template>
  <v-btn
    flat
    height="60"
    class="darken-blue-gradient text-black w-100 rounded-lg"
    ><slot /> {{ text }}</v-btn
  >
</template>

<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #ffffff 0%, #ffffff 100%);
}
</style>
