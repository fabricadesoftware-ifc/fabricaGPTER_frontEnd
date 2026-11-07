<script setup>
  import { formatDateBR } from '@/utils/date'
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
      <v-list-item link :title="patient.name" @click="router.push({ path: '/patient/test-result', query: { id: patient.id } })">
        <template #append>
          <p class="text-subtitle-1">{{ formatDateBR(patient.date) }}</p>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>
</template>
