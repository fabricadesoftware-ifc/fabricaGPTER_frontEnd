<script setup>
  import { Calendar, Fingerprint, Mail, Phone, User } from 'lucide-vue-next';

  const personalIcons = { user: User, mail: Mail, phone: Phone, calendar: Calendar, fingerprint: Fingerprint };

  defineProps({
    personalInfos: {
      type: Array,
      required: true,
    },
  });
</script>
<template>
  <v-container class="pl-6">
    <span class="text-h6 font-weight-bold text-top"> Informações Pessoais </span>

    <v-row v-for="info in personalInfos" :key="info.name" class="mt-4 ga-2">
      <v-col align="center" cols="1" justify="center">
        <Component :is="personalIcons[info.icon]" color="#005BBB" />
      </v-col>
      <v-col class="d-flex flex-column">
        <span class="text-p font-weight-bold"> {{ info.name }}</span>
        <span class="text-p opacity-90 font-weight-light">{{ info.info }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>
