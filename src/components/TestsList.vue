<template>
  <v-card
    :class="[{'pa-4 mx-0' : smAndDown, 'pa-6 mx-auto': mdAndUp}]"
    :max-width="smAndDown ? '450' : '600'"
    :width="smAndDown ? '100%' : undefined"
    :min-height="mdAndUp ? '300' : undefined"
    elevation="2"
    rounded="xl"
  >
    <v-card-title class="font-weight-medium pa-0" :class="{ 'text-h6 mb-3' : smAndDown, 'text-h5 mb-6': mdAndUp }">
      Testes recentes
    </v-card-title>
    <v-divider color="grey-darken-4"/>
    <v-list class="d-flex flex-column ga-4 rounded-xl pa-0 pt-4">
      <template v-for="(test, i) in tests" :key="test.id">
        <div class="d-flex flex-row justify-space-between align-center">
          <v-list-item :title="test.name" class="pa-0"></v-list-item>
          <v-list-item :title="formatDateBR(test.date)" class="text-grey-darken-2 pa-0"></v-list-item>
        </div>
      </template>
    </v-list>
  </v-card>
</template>

<script setup>
import {ref} from 'vue'
import {useDisplay} from "vuetify";

const {mdAndUp, smAndDown} = useDisplay()
const formatDateBR = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

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
