<template>
    <v-container>
        <PageTitle :title="Details[0].time" class="mb-2" />
        <patientDetailsBtn :patient="Details[0]"> </patientDetailsBtn />
        <DiagnosisDetails  :patient="info[0]"></DiagnosisDetails>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import patientDetailsBtn from "@/components/patientDetailsBtn.vue";
import DiagnosisDetails from "@/components/DiagnosisDetails.vue";
const Details = ref([
    {
        id: 1,
        name: "Roberto Santos",
        time: "Roberto Santos - teste 1",
        type: "60s",
        reps: 6,
        arm: "Direito",
        date: "04/07/2025",
    },
]);

const info = ref([
    {
        peak: "15s",
        period: "6s"

    }
])
</script>
