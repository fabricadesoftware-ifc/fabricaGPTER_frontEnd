<script setup>
  import { ChevronLeft } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay()
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn v-if="smAndDown" class="d-flex align-center" variant="text" @click="$router.back()">
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>
      <SubpageTitle title="Alterar senha" />
    </div>


    <div
      class="d-flex flex-grow-1 flex-column align-center"
      :class="smAndDown ? 'w-100' : 'w-50'"
    >

      <v-form

        class="w-100 pa-4 p rounded-xl mt-4"
      >
        <v-text class="text-subtitle-2 font-weight-light">Senha atual</v-text>
        <v-text-field
          class="mt-2"
          name="senha-atual"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2 font-weight-light">Nova Senha</v-text>
        <v-text-field
          class="mt-2"
          name="nova-senha"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2 font-weight-light">Confirmar nova senha</v-text>
        <v-text-field
          class="mt-2"
          name="confirmar-senha"
          rounded="lg"
          variant="outlined"
        />

        <v-btn
          class="darken-blue-gradient text-white w-100 rounded-xl text-none text-subtitle-1"
          height="50"
        >Alterar senha
        </v-btn>

      </v-form>
    </div>
  </v-container>
</template>

<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
