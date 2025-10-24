<template>
  <v-container 
  >
    <SubpageTitle title="Roberto Santos" class="ma-0"/>
    <v-text v-if="mdAndUp" class="opacity-50 pr-0">Informações e testes recentes do paciente</v-text>
    <div
      class="d-flex ga-8 justify-center align-end"
      :class="smAndDown ? 'flex-column' : 'flex-row'"
    >
      <InfoCard
              class="d-flex flex-column ga-2"
        address="Avenida Nereu Ramos, 154, Centro, Balneário Piçarras"
        email="roberto@gmail.com"
        status="Ativo"
      />
      
      <div
      class="d-flex flex-column ga-2">
        <TestsList />
      </div>

      <div v-if="smAndDown">
      <v-btn 
        width="90vw"
        rounded="lg"
        height="50px"
        class="darken-blue-gradient text-white"
      >
    <div class="d-flex flex-row justify-center align-center ga-2">
        <span><Play/></span>
        <span>Iniciar teste</span>
        </div>
      </v-btn>
      </div>
    </div>
<div v-if="mdAndUp" class="d-flex justify-end">
  <v-btn 
    rounded="lg"
    height="50px"
    width="300px"
    class="darken-blue-gradient text-white d-flex"
    style="position: relative; margin-top: 20px;"
  >
    <div class="d-flex flex-row justify-center align-center ga-2">
      <span><Play/></span>
      <span>Iniciar teste</span>
    </div>
  </v-btn>
</div>

  </v-container>
</template>

<script setup>
import {Play} from "lucide-vue-next";
import SubpageTitle from "@/components/SubpageTitle.vue";
import InfoCard from "@/components/InfoCard.vue";
import TestsList from "@/components/TestsList.vue";
import {useDisplay} from "vuetify";

const {mdAndUp, smAndDown,} = useDisplay()

</script>

<style>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
