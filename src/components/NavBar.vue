<template>
  <v-bottom-navigation color="primary" height="70">
    <v-btn value="Home" router :to="'/'">
      <House color="#818181" />
      <span class="text-grey-darken-2">Home</span>
    </v-btn>

    <v-btn value="Testes" router :to="'/testes'">
      <HeartPulse color="#818181" />
      <span class="text-grey-darken-2">Testes</span>
    </v-btn>

    <v-btn value="Pacientes" router :to="'/pacientes'">
      <ClipboardList color="#818181" />
      <span class="text-grey-darken-2">Pacientes</span>
    </v-btn>

    <v-btn value="Manual" router :to="'/manual'">
      <BookOpen color="#818181" />
      <span class="text-grey-darken-2">Manual</span>
    </v-btn>

    <v-btn value="Perfil" router :to="'/perfil'">
      <User color="#818181" />
      <span class="text-grey-darken-2">User</span>
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
