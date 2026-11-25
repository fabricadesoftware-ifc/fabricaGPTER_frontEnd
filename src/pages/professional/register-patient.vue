<script setup>
  import PageHeader from '@/components/ui/PageHeader.vue'
  import PatientForm from '@/components/patients/PatientForm.vue'
</script>

<template>
  <div class="page page--form">
    <PageHeader
      back="/professional/patients"
      back-label="Pacientes"
      subtitle="Preencha os dados de acesso, identificação e endereço"
      title="Novo paciente"
    />
    <PatientForm />
  </div>
</template>

<style scoped>
.page--form { max-width: 960px; }
</style>
