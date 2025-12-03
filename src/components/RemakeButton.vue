<template>
  <!-- Usar text-none para letras não ficarem em caps lock no button -->
  <v-btn
    class="darken-blue-gradient text-black w-100 rounded-lg text-none text-subtitle-1"
    flat
    height="60"
  ><slot /> {{ text }}</v-btn>
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
