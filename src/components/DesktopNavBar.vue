<template>
  <v-app-bar class="px-6" :elevation="1" height="70">
    <v-toolbar-items class="w-100 d-flex align-center ga-8">
      <img
        src="@/assets/logo-gpter.png"
        style="max-height: 100%; max-width: 100%; object-fit: contain"
      >
      <v-btn
        class="text-none"
        router
        :to="'/professional/patients'"
        value="Pacientes"
        variant="text"
      >
        Pacientes</v-btn>

      <v-btn
        class="text-none"
        router
        :to="'/professional/manual'"
        value="Manual"
        variant="text"
      >Manual</v-btn>

      <v-spacer />

      <v-row align="center" class="ga-2 flex-0-0">
        <v-switch
          center-affix
          class="toggle-btn"
          flat
          hide-details
          inset
        />
        <Moon />
      </v-row>

      <v-btn class="pa-0" variant="text" @click="$router.push('/professional/profile')">
        <User />
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script setup>
  import { Moon, User } from 'lucide-vue-next';
</script>
