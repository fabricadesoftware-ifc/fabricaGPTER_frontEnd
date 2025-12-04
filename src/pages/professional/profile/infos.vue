<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn
        v-if="smAndDown"
        class="d-flex align-center"
        variant="text"
        @click="$router.back()"
      >
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Informações" />
    </div>
    <MenuProfile
      class="text-black"
      :image="foto"
      :infos="{ name: 'Daniel Santos' }"
    />
    <PersonalInfos :personal-infos="personalInfos" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import PersonalInfos from "@/components/PersonalInfos.vue";
import {
  Calendar,
  ChevronLeft,
  Fingerprint,
  Mail,
  Phone,
  User,
} from "lucide-vue-next";
import foto from "@/assets/foto-profissional.png";

const router = useRouter();
const { smAndDown } = useDisplay();
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
