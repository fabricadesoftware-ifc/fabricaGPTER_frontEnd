<template>
  <v-container>
    <SubpageTitle title="Teste em progresso" class="mb-2" />
    <p class="text-subtitle-1 font-weight-bold text-grey-darken-1">Roberto Santos</p>

    <main class="d-flex flex-column align-center ga-8 mt-8">
      <PatientDetails :patient="Details[0]" />
      <v-row justify="center" class="w-100">
        <v-col cols="auto" class="w-100 px-12">
          <CancelButton text="Cancelar teste" />
        </v-col>
      </v-row>
    </main>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import SubpageTitle from "@/components/SubpageTitle.vue";
import PatientDetails from "@/components/PatientDetails.vue";

const Details = ref([
  {
    id: 1,
    patient: "Roberto Santos",
    type: "60s",
    reps: 6,
    arm: "Direito",
    date: "04/07/2025",
  },
]);
</script>
