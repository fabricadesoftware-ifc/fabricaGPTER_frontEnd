<template>
  <v-container class="pt-6">
    <PageTitle margin="mb-2" title="Roberto Santos" v-if="mdAndUp" />
    <SubpageTitle title="Roberto Santos" class="ma-0" v-else />
    <p class="opacity-50 pr-0 mb-8">Informações e testes recentes do paciente</p>
    <div
      class="d-flex ga-12 justify-space-between align-end"
      :class="smAndDown ? 'flex-column' : 'flex-row'"
    >
      <InfoCard
        class="d-flex flex-column"
        address="Avenida Nereu Ramos, 154, Centro, Balneário Piçarras"
        email="roberto@gmail.com"
        status="Ativo"
      />

      <TestsList />

      <div v-if="smAndDown">
        <router-link to="/new-test">
          <v-btn
            width="90vw"
            rounded="xl"
            height="50px"
            class="darken-blue-gradient text-white"
          >
            <div class="d-flex flex-row justify-center align-center ga-2">
              <span><Play /></span>
              <span>Iniciar teste</span>
            </div>
          </v-btn>
        </router-link>
      </div>
    </div>
    <div v-if="mdAndUp" class="d-flex justify-end">
      <router-link to="/new-test">
        <v-btn
          rounded="xl"
          height="50px"
          width="300px"
          class="darken-blue-gradient text-white mt-5"
        >
          <div class="d-flex flex-row justify-center align-center ga-2">
            <span><Play /></span>
            <span>Iniciar teste</span>
          </div>
        </v-btn>
      </router-link>
    </div>
  </v-container>
</template>

<script setup>
import { Play } from "lucide-vue-next";
import SubpageTitle from "@/components/SubpageTitle.vue";
import InfoCard from "@/components/InfoCard.vue";
import TestsList from "@/components/TestsList.vue";
import { useDisplay } from "vuetify";

const { mdAndUp, smAndDown } = useDisplay();
</script>

<style>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
