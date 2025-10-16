<template>
    <v-container>
        <PageTitle  title="Contato" />
        <v-card class="pb-8 px-4 mt-12">
            <v-card-title  class="text-h5 font-weight-bold mb-6">Suporte</v-card-title>
            <v-row>
            <v-col class="pl-6 d-flex align-top">
                <Mail color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Paciente: <br>
                    <v-text class="font-weight-light">{{ personalInfos.email }}</v-text>
                </v-text>
            </v-col>
        </v-row>

        <v-row>
            <v-col class="pl-6 d-flex align-top">
                <Phone color="#005BBB" class="mr-2" />
                <v-text class="text-h6 font-weight-bold">
                    Telefone: <br>
                    <v-text class="font-weight-light">{{ personalInfos.phone }}</v-text>
                </v-text>
            </v-col>
        </v-row>
        </v-card>
    </v-container>
</template>
<script setup> 
import { Mail,  Phone } from "lucide-vue-next";
const  personalInfos = ref({
    email: "suporte@email.com",
    phone: "+55 47 334903948"
})

defineProps ({
    personalInfos: {
        type: Array,
        required: true
    }
});
</script>