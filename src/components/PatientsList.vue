<template>
  <v-list border="md" class="w-100 rounded-xl pa-0">
    <template v-for="(patient, i) in patients" :key="patient.id">
      <v-list-item :title="patient.name">
        <template v-slot:append>
          <v-btn variant="text" icon><Pencil /></v-btn>
          <v-btn variant="text" icon><Trash2 /></v-btn>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>
</template>

<script setup>
import { Trash2 } from "lucide-vue-next";
import { Pencil } from "lucide-vue-next";

defineProps({
  patients: {
    type: Array,
    required: true,
  },
});
</script>
