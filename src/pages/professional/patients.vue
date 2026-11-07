<script setup>
  import { computed, watch } from 'vue'
  import { useDataStore } from '@/stores/data'
  const data = useDataStore()
  const search = ref('')
  const filtered = computed(() => data.patients.filter(patient => patient.name.toLocaleLowerCase('pt-BR').includes(search.value.trim().toLocaleLowerCase('pt-BR'))))
  const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 9)))
  const patients = computed(() => filtered.value.slice((currentPage.value - 1) * 9, currentPage.value * 9))
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  import { useRouter } from 'vue-router';

  import PageTitle from '@/components/ui/PageTitle.vue';
  import PatientsList from '@/components/patients/PatientsList.vue';

  import { CirclePlus } from 'lucide-vue-next';

  const router = useRouter()
  const { mdAndUp, xs } = useDisplay();

  const currentPage = ref(1);
  watch(search, () => { currentPage.value = 1 })
  watch(pages, count => { currentPage.value = Math.min(count, currentPage.value) })

</script>

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
          aria-label="Registrar paciente"
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
          v-model="search"
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
        <v-pagination v-model="currentPage" :length="pages" />
      </v-col>
    </v-row>

    <v-row class="d-flex justify-center align-center" />
  </v-container>
</template>
