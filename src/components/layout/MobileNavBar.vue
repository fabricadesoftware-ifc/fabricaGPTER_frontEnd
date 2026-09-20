<script setup>
  import {
    BookOpen,
    ClipboardList,
    User,
  } from 'lucide-vue-next';
</script>
<template>
  <v-bottom-navigation color="primary" grow height="70">
    <v-btn router :to="'/professional/patients/'" value="Pacientes">
      <ClipboardList color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Pacientes</span>
    </v-btn>

    <v-btn router :to="'/professional/manual/'" value="Manual">
      <BookOpen color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Manual</span>
    </v-btn>

    <v-btn router :to="'/professional/profile/'" value="Perfil">
      <User color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>


<style scoped></style>
