<template>
  <v-container>
    <SubpageTitle title="Contato" class="mb-8" />
    <v-card class="pa-4 rounded-xl elevation-2">
      <v-card-title class="text-h6 font-weight-bold pa-0 mb-6">Suporte</v-card-title>

      <v-row v-for="info in contactInfos" :key="info.name" class="ga-2">
        <v-col cols="1" align="center" justify="center">
          <Component color="#005BBB" :is="info.icon" />
        </v-col>
        <v-col class="d-flex flex-column">
          <v-text class="text-p font-weight-bold"> {{ info.name }}</v-text>
          <v-text class="text-p opacity-80 font-weight-light">{{ info.info }}</v-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
import SubpageTitle from "@/components/SubpageTitle.vue";
import { Mail, Phone } from "lucide-vue-next";

const contactInfos = ref([
  {
    name: "Email",
    info: "suporte@email.com",
    icon: Mail,
  },
  {
    name: "Telefone",
    info: "+55 47 334903948",
    icon: Phone,
  },
]);

defineProps({
  personalInfos: {
    type: Array,
    required: true,
  },
});
</script>
