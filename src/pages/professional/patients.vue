<template>
  <v-container :class="{ 'px-8 mt-6': mdAndUp }" max-width="none">
    <v-row align="start" class="w-full" justify="space-between">
      <v-col class="py-0 d-flex flex-column aligin-start">
        <PageTitle :class="{ 'mb-7': xs }" title="Pacientes" />
        <p
          v-if="xs"
          class="text-subtitle-1 font-weigh-medium"
        >Lista de pacientes</p>
      </v-col>
      <v-col align-self="end" class="text-right d-flex justify-end align-end py-0 mb-2">
        <v-btn
          v-if="xs"
          class="d-flex align-center"
          icon
          variant="text"
          @click="router.push('/professional/register-patient')"
        ><CirclePlus :size="24" /></v-btn>
        <v-btn
          v-else
          class="text-none rounded-xl border border-md"
          flat
          height="60"
          width="160"
          @click="router.push('/professional/register-patient')"
        >Registrar paciente</v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col v-if="mdAndUp" cols="auto">
        <v-text-field
          class="mb-3"
          label="Buscar paciente"
          prepend-inner-icon="mdi-magnify"
          rounded="xl"
          variant="outlined"
          width="200"
        />
      </v-col>
      <v-col>
        <PatientsList :patients="patients" />
        <v-pagination v-model="currentPage" :length="4" />
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center align-center" />
  </v-container>
</template>

<script setup>
// Funções reais (create, edit, delete, pagination, details) serão implementadas posteriormente, com o backend
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useRouter } from 'vue-router';

  import PageTitle from '@/components/PageTitle.vue';
  import PatientsList from '@/components/PatientsList.vue';

  import { CirclePlus } from 'lucide-vue-next';

  const router = useRouter()
  const { mdAndUp, smAndDown, xs } = useDisplay();

  const currentPage = ref(1);

  const patients = ref([
    {
      id: 1,
      name: 'Roberto Santos',
    },
    {
      id: 2,
      name: 'Fábio Longo de Moura',
    },
    {
      id: 3,
      name: 'João Vitor Guiotti',
    },
    {
      id: 4,
      name: 'Tiago Veigh',
    },
    {
      id: 5,
      name: 'Adamo Dalberto',
    },
    {
      id: 6,
      name: 'Larissa dos Santos',
    },
    {
      id: 7,
      name: 'João Tarzan',
    },
    {
      id: 8,
      name: 'Marr Candré',
    },
  ]);
</script>
