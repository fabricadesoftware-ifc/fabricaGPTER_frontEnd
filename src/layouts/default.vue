<template>
  <v-main>
    <router-view />
  </v-main>

  <NavBar />
</template>

<script setup>
  import NavBar from '@/components/NavBar.vue'
</script>
