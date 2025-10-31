<template>
  <v-card
    :class="[{ 'pa-4 mx-auto': smAndDown, 'pa-6 mx-0': mdAndUp }]"
    :min-width="mdAndUp ? '500' : '90vw'"
    :min-height="mdAndUp ? '349' : '300'"
    elevation="2"
    rounded="xl"
  >
    <v-card-title
      class="font-weight-medium pa-0"
      :class="{ 'text-h6 mb-3': smAndDown, 'text-h5 mb-6': mdAndUp }"
    >
      Testes recentes
    </v-card-title>

    <v-divider color="grey-darken-4" />

    <v-card-text :class="['pa-0', { 'mt-6': mdAndUp, 'mt-4': smAndDown }]">
      <v-list class="d-flex flex-column rounded-xl pa-0">
        <v-list-item
          v-for="test in tests"
          :key="test.id"
          class="pa-0 mb-2"
          aria-label="teste-recente"
        >
          <div class="d-flex flex-row justify-space-between align-center w-100 mb-4">
            <v-list-item-title class="text-body-1">{{ test.name }}</v-list-item-title>
            <div class="text-right">
              <v-list-item-title class="text-grey-darken-2">
                {{ formatDateBR(test.date) }}
              </v-list-item-title>
            </div>
          </div>
          <v-divider />
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mdAndUp, smAndDown } = useDisplay();

const formatDateBR = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("pt-BR");
};

const tests = ref([
  { id: 1, name: "Isometria 60s", date: "2024-06-01" },
  { id: 2, name: "Isometria 120s", date: "2024-05-20" },
  { id: 3, name: "Isometria 60s", date: "2024-04-15" },
]);
</script>
