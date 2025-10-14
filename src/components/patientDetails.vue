<template>
    <v-card class=" w-100 elevation-2 rounded-xl mb-6 pl-3 pb-4">
        <v-card-title class="text-h5 text-left font-weight-bold mt-2 mb-0">Detalhes do teste</v-card-title>
        <v-row>
            <v-col class="pl-6 d-flex align-center">
                <User color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Paciente:
                    <v-text class="font-weight-light">{{ patient.patient }}</v-text>
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
    </v-card>
</template>
<script setup>
import {
    Clock,
    User,
    Hand,
    Zap,
    Calendar,
} from "lucide-vue-next";

defineProps({
    patient: {
        type: Object,
        required: true
    }
});
</script>