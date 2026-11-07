<script setup>
  import MobileNavBar from '@/components/layout/MobileNavBar.vue'
  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay()
</script>

<template>
  <v-main>
    <router-view />
  </v-main>

  <MobileNavBar v-if="smAndDown" />
  <DesktopNavBar v-else />
</template>
