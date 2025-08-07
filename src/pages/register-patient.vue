<template>
  <v-container class="h-100">
    <SubpageTitle title="Cadastrar pacientes" />

    <v-row justify="center" align="center" class="h-100">
      <v-col cols="12" md="8">
        <NewPatientForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import SubpageTitle from "@/components/SubpageTitle.vue";
import NewPatientForm from "@/components/NewPatientForm.vue";
</script>