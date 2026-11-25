<script setup>
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
  import { useDisplay } from 'vuetify'
  import { Plus, RefreshCw, Search } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import RegistrationShare from '@/components/patients/RegistrationShare.vue'
  import PatientsList from '@/components/patients/PatientsList.vue'

  const data = useDataStore()
  const { xs } = useDisplay()

  const search = ref(data.patientsSearch)
  const currentPage = ref(data.patientsPage)
  let searchTimer

  const subtitle = computed(() => {
    if (data.patientsLoading && !data.patients.length) return 'Carregando pacientes…'
    const total = data.patientsTotal
    return total === 1 ? '1 paciente cadastrado' : `${total} pacientes cadastrados`
  })

  function reload () {
    return data.loadPatients({ page: currentPage.value, search: (search.value || '').trim() })
  }

  watch(search, () => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      if (currentPage.value !== 1) {
        currentPage.value = 1
        return
      }
      reload()
    }, 350)
  })

  watch(currentPage, page => {
    if (page === data.patientsPage) return
    data.loadPatients({ page, search: (search.value || '').trim() })
  })

  watch(() => data.patientsPage, page => {
    if (page !== currentPage.value) currentPage.value = page
  })

  onMounted(reload)
  onBeforeUnmount(() => clearTimeout(searchTimer))
</script>

<template>
  <div class="page">
    <PageHeader :subtitle="subtitle" title="Pacientes">
      <template #actions>
        <RegistrationShare />
        <v-btn color="primary" to="/professional/register-patient">
          <Plus class="mr-2" :size="16" />{{ xs ? 'Novo' : 'Novo paciente' }}
        </v-btn>
      </template>
    </PageHeader>

    <v-card>
      <div class="toolbar">
        <v-text-field
          v-model="search"
          class="toolbar__search"
          clearable
          density="compact"
          hide-details
          placeholder="Buscar por nome"
          @click:clear="search = ''"
        >
          <template #prepend-inner><Search class="text-subtle" :size="16" /></template>
        </v-text-field>
        <v-btn
          aria-label="Atualizar lista"
          :disabled="data.patientsLoading"
          icon
          size="small"
          variant="text"
          @click="reload"
        ><RefreshCw :size="18" /></v-btn>
      </div>

      <v-progress-linear v-if="data.patientsLoading" aria-label="Carregando pacientes" indeterminate />
      <v-divider v-else />

      <v-alert
        v-if="data.patientsError"
        class="ma-4"
        role="alert"
        type="error"
      >
        {{ data.patientsError }}
        <template #append>
          <v-btn size="small" variant="outlined" @click="reload">Tentar novamente</v-btn>
        </template>
      </v-alert>

      <PatientsList v-else-if="data.patients.length" :patients="data.patients" />

      <div v-else-if="!data.patientsLoading" class="empty">
        <p class="font-weight-medium mb-1">Nenhum paciente encontrado</p>
        <p class="text-muted text-body-2 mb-4">
          {{ search ? 'Tente buscar por outro nome' : 'Cadastre um paciente ou compartilhe o QR Code de cadastro' }}
        </p>
        <v-btn v-if="!search" color="primary" to="/professional/register-patient" variant="tonal">Cadastrar paciente</v-btn>
      </div>
    </v-card>

    <v-pagination
      v-if="data.patientsTotalPages > 1"
      v-model="currentPage"
      class="mt-4"
      :length="data.patientsTotalPages"
      :total-visible="xs ? 3 : 7"
    />
  </div>
</template>

<style scoped>
.toolbar { display: flex; align-items: center; gap: 8px; padding: 12px 16px; }
.toolbar__search { max-width: 360px; }
.empty { padding: 48px 24px; text-align: center; }
</style>
