<template>
  <v-container>
    <PageTitle title="Pacientes" class="mb-7" />

    <v-row align="center" justify="space-between" class="w-full">
      <v-col class="py-0">
        <v-text class="text-subtitle-1 font-weight-medium"
          >Lista de pacientes</v-text
        >
      </v-col>
      <v-col class="text-right py-0">
        <v-btn icon variant="text"><CirclePlus /></v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col>
        <PatientsTable :patients="patients" />
      </v-col>
    </v-row>

    <v-row>
      <v-pagination :length="4" v-model="currentPage" @click="showPage"></v-pagination>
    </v-row>
  </v-container>
</template>

<script setup>
// Funções reais (create, edit, delete, pagination, details) serão implementadas posteriormente, com o backend
import { ref } from "vue";

import PageTitle from "@/components/PageTitle.vue";
import PatientsTable from "@/components/PatientsList.vue";

import { CirclePlus } from "lucide-vue-next";

const currentPage = ref(1)

const patients = ref([
  {
    id: 1,
    name: "Roberto Santos",
  },
  {
    id: 2,
    name: "Fábio Longo de Moura",
  },
  {
    id: 3,
    name: "João Vitor Guiotti",
  },
  {
    id: 4,
    name: "Tiago Veigh",
  },
  {
    id: 5,
    name: "Adamo Dalberto",
  },
  {
    id: 6,
    name: "Larissa dos Santos",
  },
  {
    id: 7,
    name: "João Tarzan",
  },
  {
    id: 8,
    name: "Marr Candré",
  },
]);
</script>
