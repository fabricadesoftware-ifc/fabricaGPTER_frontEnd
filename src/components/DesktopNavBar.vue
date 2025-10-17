<template>
  <v-app-bar :elevation="1" height="70" class="px-6">
    <v-toolbar-items class="w-100 d-flex align-center ga-8">
      <img
        src="@/assets/logo-gpter.png"
        style="max-height: 100%; max-width: 100%; object-fit: contain"
      />
      <v-btn
        value="Pacientes"
        router
        :to="'/patients'"
        class="text-none"
        variant="text"
      >
        Pacientes</v-btn
      >

      <v-btn
        value="Manual"
        router
        :to="'/manual'"
        class="text-none"
        variant="text"
        >Manual</v-btn
      >

      <v-spacer />

      <v-row align="center" class="ga-2 flex-0-0">
        <v-switch
          class="toggle-btn"
          inset
          hide-details
          center-affix
          flat
        ></v-switch>
        <Moon />
      </v-row>

      <v-btn>
        <User />
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script setup>
import { User, Moon } from "lucide-vue-next";
</script>
