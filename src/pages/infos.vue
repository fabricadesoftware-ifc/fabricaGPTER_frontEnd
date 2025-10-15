<template>
    <v-container>
        <PageTitle title="Informações" class="mb-4"/>

        <MenuProfile />

        <PersonalInfos :perInfos="perInfos[0]" />
        <ProfissionalInfos :profInfos="profInfos[0]"/>
    </v-container>
</template>
<script setup>
import { ref } from "vue";

import MenuProfile from "@/components/MenuProfile.vue";
import PersonalInfos from "@/components/PersonalInfos.vue";
import ProfissionalInfos from "@/components/ProfissionalInfos"
const perInfos = ref ([
    {
        name: "Daniel Santos",
        email: "danielsantos@gmail.com",
        phone: "(47)998903948",
        date: "25/08/1989",
        cpf: "01234567890"
    }
]);

const profInfos = ref ([
    {
        studentId: "012345678",
        hospital: "Conviver"
    }
])
</script>