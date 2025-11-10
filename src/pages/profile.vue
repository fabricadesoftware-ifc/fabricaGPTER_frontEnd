<template>
  
<div v-if="smAndDown">
  <v-container 

    :style="{
      minHeight: mdAndUp ? '20vh' : '20vh',
      maxWidth: mdAndUp ? '30vw' : '100%',
    }"
    class="ma-0 pa-0 d-flex align-center justify-center blue-gradient rounded-b-xl "
  >
    <MenuProfile
      :image="foto"
      :infos="{ name: 'Daniel' }"
      class="text-white"
    />
    
  </v-container>
   <Settings
    :routes="{
      info: 'infos',
      password: 'change-password',
      terms: 'terms-of-use',
      contact: 'contact',
      logout: 'sign-in',
    }"
  />
  
  </div>


    <v-card v-else-if="mdAndUp" >

    <v-layout >

      <v-navigation-drawer class="bg-grey-lighten-4"
      
        location="left"
        permanent
      >
      
     <MenuProfile

      :image="foto"
      :infos="{ name: 'Daniel' }"
      class="text-white blue-gradient pb-8"
    />

        <v-divider></v-divider>
   <Settings
    :routes="{
      info: 'infos',
      password: 'change-password',
      terms: 'terms-of-use',
      contact: 'contact',
      logout: 'sign-in',
    }"
  />
      
      </v-navigation-drawer>
      <v-main style="height: 100vh"></v-main>
    </v-layout>

  </v-card>
  
</template>

<script setup>
import { useDisplay } from 'vuetify'
import MenuProfile from '@/components/MenuProfile.vue'

import foto from '@/assets/foto-profissional.png'

const { mdAndUp, smAndDown } = useDisplay()
</script>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
