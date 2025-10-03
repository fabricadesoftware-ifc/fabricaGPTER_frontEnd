<template>
  <v-list border="md" class="rounded-xl pa-0">
    <template v-for="(test, i) in tests" :key="test.id">
      <div class="d-flex flex-row justify-space-between align-center">
        <v-list-item :title="test.name"></v-list-item>
        <v-list-item :title="test.date"></v-list-item>
      </div>
      <v-divider v-if="i < tests.length - 1"/>
    </template>
  </v-list>
</template>

<script setup>
import {ref} from 'vue'

const tests = ref([
  {
    id: 1,
    name: 'Isometria 60s',
    date: '2024-06-01',
  },
  {
    id: 2,
    name: 'Isometria 120s',
    date: '2024-05-20',
  },
  {
    id: 3,
    name: 'Isometria 60s',
    date: '2024-04-15',
  },
])
</script>
