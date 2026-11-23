<script setup>
  import { useDisplay } from 'vuetify'
  import DesktopNavBar from '@/components/layout/DesktopNavBar.vue'
  import MobileNavBar from '@/components/layout/MobileNavBar.vue'

  const { smAndDown } = useDisplay()
</script>

<template>
  <MobileNavBar v-if="smAndDown" />
  <DesktopNavBar v-else />

  <v-main class="bg-background">
    <router-view />
  </v-main>
</template>
