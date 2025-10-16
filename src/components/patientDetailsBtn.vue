<template>
    <v-card class="w-100 elevation-2 rounded-xl mb-6 pl-3 pb-4">
        <v-card-title class="text-h5 text-left font-weight-bold mt-2 mb-0">
            Detalhes do teste
        </v-card-title>

        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <User color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Paciente:
                    <v-text class="font-weight-light">{{ patient.name }}</v-text>
                </v-text>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <Clock color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Tipo de teste:
                    <v-text class="font-weight-light">{{ patient.type }}</v-text>
                </v-text>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <Hand color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    N° de repetições:
                    <v-text class="font-weight-light">{{ patient.reps }}</v-text>
                </v-text>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <Zap color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Braço testado:
                    <v-text class="font-weight-light">{{ patient.arm }}</v-text>
                </v-text>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <Calendar color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Data:
                    <v-text class="font-weight-light">{{ patient.date }}</v-text>
                </v-text>
            </v-col>
        </v-row>


        <v-row class="mt-4 pl-6 pr-6">
            <v-col class="d-flex gap-3">
                <ConfirmButton text="Validar Teste" class="px-4 py-2 rounded" color="blue" height="60">
                    <Check color="#ffffff" class="mr-2" />
                </ConfirmButton>
            </v-col>
        </v-row>
        <v-row class="mt-4 pl-6 pr-6">
            <v-col class="d-flex gap-3">
                <RemakeButton text="Refazer Teste" class="px-4 py-2 rounded bg-white border border-black " color="blue">
                    <RotateCcw color="#000000" class="mr-2" />
                </RemakeButton>
            </v-col>
        </v-row>
    </v-card>
</template>

<script setup>
import { Clock, User, Hand, Zap, Calendar, Check, RotateCcw } from "lucide-vue-next";
import RemakeButton from "@/components/RemakeButton.vue";

defineProps({
    patient: {
        type: Object,
        required: true,
    },
});
</script>
