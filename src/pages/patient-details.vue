<template>
  <v-container>
    <SubpageTitle title="Roberto Santos"/>
    <div class="d-flex flex-column justify-center ga-8">
      <InfoCard class="mt-12" address="Avenida Nereu Ramos, 154, Centro, Balneário Piçarras" email="roberto@gmail.com"
                status="Ativo"/>
      <div class="d-flex flex-column ga-2">
        <v-text class="text-h6 font-weight-medium">Testes recentes</v-text>
        <TestsList/>
      </div>
      <v-btn
        block
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
  </v-container>
</template>

<script setup>
import {Play} from "lucide-vue-next";
import SubpageTitle from "@/components/SubpageTitle.vue";
import InfoCard from "@/components/InfoCard.vue";
import TestsList from "@/components/TestsList.vue";
</script>

<style>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
