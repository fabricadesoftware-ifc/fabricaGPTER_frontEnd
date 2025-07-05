<template>
  <v-container class="d-flex flex-column justify-center align-center pa-0 px-8">
    <AppLogo class="mb-16" />
    <h1 class="text-h4 font-weight-bold text-primary mr-auto mb-6">
      Entrar como
    </h1>

    <v-card class="w-100 elevation-2 rounded-xl mb-6">
        <v-row class="d-flex align-center px-6" no-gutters>
            <v-col cols="auto" class="pr-6">
                <v-img src="@/assets/icons/heart-hand.svg" width="64"></v-img>
            </v-col>
            <v-col class="px-0 py-4">
                <h5 class="text-primary text-h5 font-weight-bold">Médico</h5>
                <p class="text-subtitle-2 font-weight-regular text-grey-darken-2">Acompanhar registros e testes de pacientes.</p>
            </v-col>
        </v-row>
    </v-card>
    <v-card class="w-100 elevation-2 rounded-xl">
        <v-row class="d-flex align-center px-6" no-gutters>
            <v-col cols="auto" class="pr-6">
                <v-img src="@/assets/icons/activity-heart.svg" width="64"></v-img>
            </v-col>
            <v-col class="px-0 py-4">
                <h5 class="text-primary text-h5 font-weight-bold">Paciente</h5>
                <p class="text-subtitle-2 font-weight-regular text-grey-darken-2">Realizar testes e acompanhar progresso.</p>
            </v-col>
        </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import AppLogo from "@/components/AppLogo.vue";
</script>