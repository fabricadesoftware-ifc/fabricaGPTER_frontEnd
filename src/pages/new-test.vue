<template>
  <v-container class="fill-height d-flex flex-column align-center">
    <SubpageTitle class="mt-2" title="Novo teste" v-if="smAndDown" />
    <div class="d-flex flex-grow-1 flex-column align-center justify-center w-100">
      <PageTitle title="Novo teste" class="d-flex justify-center" v-if="mdAndUp" />

      <p class="text-subtitle-1 text-grey-darken-1"
        >Configure os parâmetros para iniciar o teste</p
      >
      <v-form v-if="smAndDown" class="w-100 pa-4 p elevation-3 rounded-xl mt-4">
        <p class="text-subtitle-2">Tempo</p>
        <v-select
          class="mt-2"
          :items="tempos"
          label="Tempo"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <p class="text-subtitle-2">Número de repetições</p>
        <v-text-field
          class="mt-2"
          variant="outlined"
          rounded="lg"
          name="repeticoes"
          label="Selecione o número de repetições"
        ></v-text-field>

        <p class="text-subtitle-2">Dominância</p>
        <v-select
          class="mt-2"
          :items="hands"
          label="Dominância"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <ConfirmButton
          text="Iniciar teste"
          height="50"
          class="rounded-lg font-weight-bold"
          ><Play :size="16" />
        </ConfirmButton>
      </v-form>
      <v-form v-if="mdAndUp" class="w-50 pa-4 p elevation-3 rounded-xl mt-4">
        <v-text class="text-subtitle-2">Tempo</v-text>
        <v-select
          class="mt-2"
          :items="tempos"
          label="Tempo"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <v-text class="text-subtitle-2">Número de repetições</v-text>
        <v-text-field
          class="mt-2"
          variant="outlined"
          rounded="lg"
          name="repeticoes"
          label="Selecione o número de repetições"
        ></v-text-field>

        <v-text class="text-subtitle-2">Mão</v-text>
        <v-select
          class="mt-2"
          :items="hands"
          label="Mão"
          variant="outlined"
          rounded="lg"
        ></v-select>

        <ConfirmButton
          text="Iniciar teste"
          height="50"
          class="rounded-lg font-weight-bold"
          ><Play :size="16" />
        </ConfirmButton>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { Play, ArrowLeft } from "lucide-vue-next";

const hands = ref(["Esquerda", "Direita", "Ambidestro"]);
const tempos = ref(["30s", "60s", "120s"]);

const router = useRouter();
const { mdAndUp, smAndDown } = useDisplay();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.blue-gradient {
  background-image: linear-gradient(180deg, #4a8dde 0%, #0c4f9d 50%, #ffffff 50%);
}
</style>
