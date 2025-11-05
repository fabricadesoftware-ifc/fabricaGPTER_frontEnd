<template>
  <v-container
    :style="{
      minHeight: mdAndUp ? '20vh' : '20vh',
      maxWidth: mdAndUp ? '30vw' : '100%',
    }"
    class="ma-0 pa-0 d-flex align-center justify-center blue-gradient rounded-b-xl"
  >
      <MenuProfile
      :image="foto"
      :infos="{ name: 'Roberto Santos' }"
      class="text-white"
    />
  </v-container>

<Settings
    :routes="{
      info: 'patient-infos',
      password: 'change-password',
      terms: 'terms-of-use',
      contact: 'contact',
      logout: 'sign-in',
    }"
  />
</template>

<script setup>
import { useDisplay } from 'vuetify'
import MenuProfile from '@/components/MenuProfile.vue'
import Settings from '@/components/Settings.vue' 
import foto from '@/assets/foto-paciente.png'
const { mdAndUp } = useDisplay()
</script>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
