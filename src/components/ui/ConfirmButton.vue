<script setup>

  defineProps({
    text: {
      type: String,
      required: true,
    },
  });
</script>
<template>
  <!-- Usar text-none para letras não ficarem em caps lock no button -->
  <v-btn
    class="darken-blue-gradient text-white w-100 rounded-xl text-none text-subtitle-1"
    flat
    height="50"
  ><slot /> {{ text }}</v-btn>
</template>
<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
