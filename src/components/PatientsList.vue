<template>
  <v-list border="md" class="w-100 rounded-xl pa-0">
    <template v-for="(patient, i) in patients" :key="patient.id">
      <!-- Implementar navegação com parametros (id) -->
      <v-list-item link :title="patient.name" @click="router.push('/professional/patient-details/')">
        <template #append>
          <v-btn icon variant="text" @click.stop="router.push('/professional/edit-patient/')"><Pencil /></v-btn>
          <v-btn icon variant="text"><Trash2 /></v-btn>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>
</template>

<script setup>
  import { Trash2 } from 'lucide-vue-next';
  import { Pencil } from 'lucide-vue-next';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps({
    patients: {
      type: Array,
      required: true,
    },
  });
</script>
