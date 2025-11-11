<template>
  <v-container>
    <div class="d-flex align-center mb-4">
    <v-btn v-if="smAndDown" variant="text" @click="$router.back()" class="d-flex align-center">
      <ChevronLeft class="opacity-70 mr-2" />
    </v-btn>

    <SubpageTitle title="Informações" />
      </div>
        <MenuProfile
      :image="foto"
      :infos="{ name: 'Daniel Santos' }"
      class="text-black"
    />
    <PersonalInfos :personalInfos="personalInfos" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import {useDisplay} from "vuetify";
const {smAndDown} = useDisplay()
import PersonalInfos from "@/components/PersonalInfos.vue";
import { User, Calendar, Mail, Phone, Fingerprint, ChevronLeft } from "lucide-vue-next";
import foto from '@/assets/foto-profissional.png'
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
</script>
