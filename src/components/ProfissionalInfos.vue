<template>
    <v-container>
        <v-text class="text-h6 font-weight-bold text-center ml-3">
            Informações Profissionais
        </v-text>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-4 mb-4">
                <IdCard color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bold ">
                    Matricula: <br> <v-text class="text-p opacity-80 font-weight-light">{{ profInfos.studentId }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-6 d-flex align-top">
                <Hospital color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bold">
                    Clinica: <br> <v-text class="text-p opacity-80 font-weight-light">{{ profInfos.hospital }}</v-text>
                </v-text>
                
            </v-col>
        </v-row>
        </v-container>
</template>
<script setup>
import {
    IdCard,
    Hospital
} from "lucide-vue-next";
defineProps({
    profInfos: {
        type: Object,
        required: true
    }
});
</script>
