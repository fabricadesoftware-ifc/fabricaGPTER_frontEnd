<template>
  <v-bottom-navigation color="primary" height="70" grow>
    <v-btn value="Pacientes" router :to="'../patients/'">
      <ClipboardList color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Pacientes</span>
    </v-btn>

    <v-btn value="Manual" router :to="'../manual/'">
      <BookOpen color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Manual</span>
    </v-btn>

    <v-btn value="Perfil" router :to="'../profile/'">
      <User color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
import {
  House,
  HeartPulse,
  ClipboardList,
  BookOpen,
  User,
} from "lucide-vue-next";
</script>

<style scoped></style>
