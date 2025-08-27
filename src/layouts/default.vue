<template>
  <v-main>
    <router-view />
  </v-main>

  <NavBar v-if="smAndDown" />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay()
</script>
