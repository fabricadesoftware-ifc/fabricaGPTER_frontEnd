<script setup>
  import { Trash2 } from 'lucide-vue-next';
  import { Pencil } from 'lucide-vue-next';
  import { useDataStore } from '@/stores/data'
  const data = useDataStore()
  function remove (patient) {
    if (!confirm(`Excluir ${patient.name} e seus testes?`)) return
    try { data.deletePatient(patient.id) } catch (error) { alert(error.message) }
  }
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps({
    patients: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <v-list border="md" class="w-100 rounded-xl pa-0">
    <template v-for="(patient, i) in patients" :key="patient.id">
      <v-list-item link :title="patient.name" @click="router.push({ path: '/professional/patient-details', query: { id: patient.id } })">
        <template #append>
          <v-btn :aria-label="'Editar ' + patient.name" icon variant="text" @click.stop="router.push({ path: '/professional/edit-patient', query: { id: patient.id } })"><Pencil /></v-btn>
          <v-btn :aria-label="'Excluir ' + patient.name" icon variant="text" @click.stop="remove(patient)"><Trash2 /></v-btn>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>
</template>
