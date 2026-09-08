<script setup>
  import PageTitle from '@/components/PageTitle.vue';
  import { useDisplay } from 'vuetify';

  const { mdAndUp, smAndDown } = useDisplay()

</script>
<template>
  <v-container>
    <PageTitle class="mb-12" title="Como usar" />
    <v-card
      v-if="smAndDown"
      class="w-100 elevation-2 rounded-xl mb-6 px-6 pb-6"
    >
      <v-card-title class="text-h5 text-center font-weight-bold mt-2 mb-2">Posição</v-card-title>
      <v-row>
        <v-col class="pl-6 pr-6 d-flex align-center justify-center">
          <v-text class="w-80 text-left d-block text-subtitle-1">
            A posição para a avaliação da força de preensão manual que a ASHT recomenda é
            que o avaliado deva estar confortavelmente sentado, posicionado com o ombro
            levemente aduzido, o cotovelo fletido a 90°, o antebraço em posição neutra e,
            por fim, a posição do punho pode variar de 0° a 30° de extensão.
          </v-text>
        </v-col>
      </v-row>
    </v-card>
    <v-container v-else-if="mdAndUp">
      <div class="mb-6">
        <h3 class="text-h6 font-weight-bolder mb-2 text-decoration-underline ">Posição</h3>
        <p class="body-1">
          A posição para a avaliação da força de preensão manual que a ASHT recomenda é que o avaliado deve estar confortavelmente sentado,
          posicionado com o ombro levemente aduzido, o cotovelo fletido a 90°, o antebraço em posição neutra e, por fim, a posição do punho
          pode variar de 0° a 30° de extensão.
        </p>
      </div>

      <div class="my-6">
        <h3 class="text-h6 font-weight-bolder mb-2 text-decoration-underline">Preparação do Equipamento</h3>
        <p class="body-1">
          Antes de iniciar o teste, certifique-se de que o dinamômetro esteja calibrado e funcionando corretamente. Verifique se as baterias
          estão carregadas e se o display está limpo e legível. O equipamento deve estar à temperatura ambiente para garantir medições precisas.
        </p>
      </div>

      <div class="my-6">
        <h3 class="text-h6 font-weight-bolder mb-2 text-decoration-underline">Execução do Teste</h3>
        <p class="body-1">
          O paciente deve segurar o dinamômetro com a mão a ser testada, mantendo a posição recomendada. Instrua o paciente a apertar o equipamento
          com força máxima por 3–5 segundos. Realize 3 medições com intervalo de 1 minuto entre elas. Registre o maior valor obtido como resultado final.
        </p>
      </div>

      <div class="my-6">
        <h3 class="text-h6 font-weight-bolder mb-2 text-decoration-underline">Interpretação dos Resultados</h3>
        <p class="body-1">
          Os valores normais variam de acordo com idade, sexo e dominância. Compare os resultados obtidos com tabelas normativas apropriadas.
          Valores abaixo de 85% do esperado podem indicar fraqueza muscular significativa. Sempre considere o contexto clínico do paciente.
        </p>
      </div>

      <div class="mt-6">
        <h3 class="text-h6 font-weight-bolder mb-2 text-decoration-underline">Cuidados e Contraindicações</h3>
        <p class="body-1">
          Não realize o teste em pacientes com lesões agudas na mão, punho ou antebraço. Evite testes em casos de inflamação articular ativa ou dor intensa.
          Sempre explique o procedimento ao paciente e obtenha seu consentimento. Interrompa o teste se o paciente relatar dor ou desconforto excessivo.
        </p>
      </div>
    </v-container>
  </v-container>
</template>
