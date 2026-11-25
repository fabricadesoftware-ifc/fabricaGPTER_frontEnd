<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import PageHeader from '@/components/ui/PageHeader.vue'
  import PatientForm from '@/components/patients/PatientForm.vue'

  const route = useRoute()
  const back = computed(() => route.query.id
    ? { path: '/professional/patient-details', query: { id: route.query.id } }
    : '/professional/patients')
</script>

<template>
  <div class="page page--form">
    <PageHeader
      :back="back"
      back-label="Paciente"
      subtitle="A senha é alterada pelo próprio paciente, no perfil dele"
      title="Editar paciente"
    />
    <PatientForm />
  </div>
</template>

<style scoped>
.page--form { max-width: 960px; }
</style>
