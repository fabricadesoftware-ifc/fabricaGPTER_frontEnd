<template>
  <v-container>
    <SubpageTitle title="Informações" class="mb-4" />
    <MenuProfile />
    <PersonalInfos :personalInfos="personalInfos" />
    <ProfessionalInfos :professionalInfos="professionalInfos" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import SubpageTitle from "@/components/SubpageTitle.vue";
import MenuProfile from "@/components/MenuProfile.vue";
import PersonalInfos from "@/components/PersonalInfos.vue";
import ProfessionalInfos from "@/components/ProfessionalInfos";
import { User, Calendar, Mail, Phone, Fingerprint, IdCard, Hospital } from "lucide-vue-next";

const personalInfos = ref([
  {
    name: "Nome",
    info: "Daniel Santos",
    icon: User,
  },
  {
    name: "Email",
    info: "daniel@gmail.com",
    icon: Mail,
  },
  {
    name: "Telefone",
    info: "(47)998903948",
    icon: Phone,
  },
  {
    name: "Data de Nascimento",
    info: "25/08/1989",
    icon: Calendar,
  },
  {
    name: "CPF",
    info: "01234567890",
    icon: Fingerprint,
  },
]);

const professionalInfos = ref([
  {
    name: "Identificação Profissional",
    info: "012345678",
    icon: IdCard,
  },
  {
    name: "Clínica Associada",
    info: "Conviver",
    icon: Hospital,
  },
]);
</script>
