<template>
    <v-container >
        <SubpageTitle :title="Details[0].time" />
        <main class="d-flex ga-8 mt-8"
        :class="smAndDown ? 'flex-column' : 'flex-row'"
        >

            <PatientDetails :patient="Details[0]" />
            <!-- <TestGraph /> -->
            <DiagnosticDetails :patient="info[0]" />
        </main>
    </v-container>
</template>

<script setup>
import { ref } from "vue";
import SubpageTitle from "@/components/SubpageTitle.vue";
import PatientDetails from "@/components/PatientDetails.vue";
import DiagnosticDetails from "@/components/DiagnosticDetails.vue";
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
import { useDisplay } from "vuetify";

const { mdAndUp, smAndDown } = useDisplay();

</script>
