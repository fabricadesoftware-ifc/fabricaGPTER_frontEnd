<template>
    <v-container>
        <PageTitle title="Como usar:" class="mb-12" />
        <v-card class=" w-100 elevation-2 rounded-xl mb-6 px-6 pb-6">
            <v-card-title class="text-h5 text-center font-weight-bold mt-2 mb-2">Posição</v-card-title>
            <v-row>
                <v-col class="pl-6 pr-6 d-flex align-center justify-center">
                    <v-text class="w-80 text-left d-block text-h6 "> A posição para a avaliação da força de preensão
                        manual que a ASHT recomenda é que o avaliado deva estar confortavelmente sentado,
                        posicionado com o ombro levemente aduzido, o cotovelo fletido a 90°, o antebraço em posição
                        neutra e, por fim, a posição
                        do punho pode variar de 0° a 30° de extensão.
                    </v-text>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import PageTitle from "@/components/PageTitle.vue";
</script>