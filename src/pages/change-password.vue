<template>
    <v-container>
    <div class="d-flex align-center mb-4">
    <v-btn v-if="smAndDown" variant="text" @click="$router.back()" class="d-flex align-center">
      <ChevronLeft class="opacity-70 mr-2" />
    </v-btn>

    <PageTitle title="Informações" />
      </div>
  
  
      <div
        class="d-flex flex-grow-1 flex-column align-center"
        :class="smAndDown ? 'w-100' : 'w-50'"
      >
        
        <v-form 
    
        class="w-100 pa-4 p rounded-xl mt-4">
          <v-text class="text-subtitle-2 font-weight-light">Senha atual</v-text>
          <v-text-field
            class="mt-2"
            variant="outlined"
            rounded="lg"
            name="senha-atual"
            
          ></v-text-field>
  
          <v-text class="text-subtitle-2 font-weight-light">Nova Senha</v-text>
          <v-text-field
            class="mt-2"
            variant="outlined"
            rounded="lg"
            name="nova-senha"
          ></v-text-field>
  
          <v-text class="text-subtitle-2 font-weight-light">Confirmar nova senha</v-text>
          <v-text-field
            class="mt-2"
            variant="outlined"
            rounded="lg"
            name="confirmar-senha"
          ></v-text-field>
  
          <v-btn    
    height='50'
    class="darken-blue-gradient text-white w-100 rounded-xl text-none text-subtitle-1"
    >Alterar senha
          </v-btn>

        </v-form>
      </div>
    </v-container>
  </template>
  
  <script setup>
  import { ChevronLeft, Eye } from "lucide-vue-next";
  import {useDisplay} from "vuetify";
  
  import PageTitle from "@/components/PageTitle.vue";
  
  const {smAndDown} = useDisplay()
  </script>
  
  
<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>  