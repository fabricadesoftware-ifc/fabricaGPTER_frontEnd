<template>
  <v-container class="fill-height d-flex flex-column align-center">
    <PageTitle v-if="smAndDown" title="Novo teste" />


    <div
      class="d-flex flex-grow-1 flex-column align-center justify-center w-100"
    >
      <PageTitle v-if="mdAndUp" class="d-flex justify-center" title="Novo teste" />

      <v-text class="text-subtitle-1 text-grey-darken-1">Configure os parâmetros para iniciar o teste</v-text>
      <v-form
        v-if="smAndDown"
        class="w-100 pa-4 p elevation-3 rounded-xl mt-4"
      >
        <v-text class="text-subtitle-2">Tempo</v-text>
        <v-select
          class="mt-2"
          :items="tempos"
          label="Tempo"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2">Número de repetições</v-text>
        <v-text-field
          class="mt-2"
          label="Selecione o número de repetições"
          name="repeticoes"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2">Mão</v-text>
        <v-select
          class="mt-2"
          :items="hands"
          label="Mão"
          rounded="lg"
          variant="outlined"
        />


        <ConfirmButton
          class="rounded-lg font-weight-bold"
          height="50"
          text="Iniciar teste"
        ><Play :size="16" />
        </ConfirmButton>
      </v-form>
      <v-form
        v-if="mdAndUp"
        class="w-50 pa-4 p elevation-3 rounded-xl mt-4"
      >
        <v-text class="text-subtitle-2">Tempo</v-text>
        <v-select
          class="mt-2"
          :items="tempos"
          label="Tempo"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2">Número de repetições</v-text>
        <v-text-field
          class="mt-2"
          label="Selecione o número de repetições"
          name="repeticoes"
          rounded="lg"
          variant="outlined"
        />

        <v-text class="text-subtitle-2">Mão</v-text>
        <v-select
          class="mt-2"
          :items="hands"
          label="Mão"
          rounded="lg"
          variant="outlined"
        />


        <ConfirmButton
          class="rounded-lg font-weight-bold"
          height="50"
          text="Iniciar teste"
        ><Play :size="16" />
        </ConfirmButton>
      </v-form>
    </div>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { Play } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';

  import PageTitle from '@/components/PageTitle.vue';
  import ConfirmButton from '@/components/ConfirmButton.vue';

  const hands = ref(['Esquerda', 'Direita', 'Ambidestro']);
  const tempos = ref(['30s', '60s', '120s']);


  const { mdAndUp, smAndDown } = useDisplay()
</script>


<style scoped>
.blue-gradient {
  background-image: linear-gradient(
    180deg,
    #4a8dde 0%,
    #0c4f9d 50%,
    #ffffff 50%
  );
}
</style>
