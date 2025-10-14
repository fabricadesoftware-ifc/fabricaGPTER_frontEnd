<template>
    <v-container>
        <PageTitle title="Teste em progresso..." class="mb-2" />
        <SubpageTitle title="Roberto Santos" class="mb-7 opacity-50" />
        <patientDetails :patient="Details[0]" />
        <v-row justify="center">
            <v-col cols="auto">
                <CancelButton text="Cancelar teste" class="text-base px-12" />
            </v-col>
        </v-row>
    </v-container>
    <NavBar></NavBar>

</template>
<script setup>
import PageTitle from "@/components/PageTitle.vue";
import { ref } from "vue";
import SubpageTitle from "@/components/SubpageTitle.vue";
import patientDetails from "@/components/patientDetails.vue";
import NavBar from "@/components/NavBar.vue";

const Details = ref([
    {
        id: 1,
        patient: "Roberto Santos",
        type: "60s",
        reps: 6,
        arm: "Direito",
        date: "04/07/2025",
    },
]);

</script>
