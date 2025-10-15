<template>
    <v-container class="container">
    <v-text class="text-h6 font-weight-bold text-top ml-4">
            Informações Pessoais
        </v-text>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-4">
                <User color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bolder">
                    Nome: <br> <v-text class="text-p opacity-80 font-weight-light">{{ perInfos.name }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-2">
                <Mail color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bolder">
                    Email: <br> <v-text class="text-p opacity-80 font-weight-light">{{ perInfos.email }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-2">
                <Phone color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bolder">
                    Telefone: <br> <v-text class="text-p opacity-80 font-weight-light">{{ perInfos.phone }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-2">
                <Calendar color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bolder">
                    Data de nascimento: <br> <v-text class="text-p opacity-80 font-weight-light">{{ perInfos.date }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pl-6 d-flex align-top mt-2 mb-8">
                <Fingerprint color="#005BBB" class="mr-2 ml-0" />
                <v-text class="text-p font-weight-bolder">
                    CPF: <br> <v-text class="text-p opacity-80">{{ perInfos.cpf }}</v-text>
                </v-text>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import {
    User,
    Calendar,
    Mail,
    Phone,
    Fingerprint,
} from "lucide-vue-next";   
defineProps({
    perInfos: {
        type: Object,
        required: true
    }
});
</script>
