<template>
  <v-main>
    <router-view />
  </v-main>

  <MobileNavBar v-if="smAndDown" />
  <DesktopNavBar v-else />
</template>

<script setup>
  import MobileNavBar from '@/components/MobileNavBar.vue'
  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay()
</script>
