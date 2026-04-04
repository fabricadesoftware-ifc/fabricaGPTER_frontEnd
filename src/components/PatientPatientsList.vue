<template>
  <v-list border="md" class="w-100 rounded-xl pa-0">
    <template v-for="(patient, i) in patients" :key="patient.id">
      <v-list-item link :title="patient.tempo" @click="router.push('/patient/test-result')">
        <template #append>
          <p class="text-subtitle-1">{{ patient.data }}</p>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  defineProps({
    patients: {
      type: Array,
      required: true,
    },
  });
</script>
