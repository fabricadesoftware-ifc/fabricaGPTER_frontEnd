<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn v-if="smAndDown" class="d-flex align-center" variant="text" @click="$router.back()">
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Informações" />
    </div>
    <v-card class="pa-4 rounded-xl elevation-2">
      <v-card-title class="text-h6 font-weight-bold pa-0 mb-6">Suporte</v-card-title>

      <v-row v-for="info in contactInfos" :key="info.name" class="ga-2">
        <v-col align="center" cols="1" justify="center">
          <Component :is="info.icon" color="#005BBB" />
        </v-col>
        <v-col class="d-flex flex-column">
          <p class="text-p font-weight-bold">{{ info.name }}</p>
          <p class="text-p opacity-80 font-weight-light">{{ info.info }}</p>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script setup>
  import SubpageTitle from '@/components/SubpageTitle.vue';
  import { ChevronLeft, Mail, Phone } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';

  const { smAndDown } = useDisplay()
  const contactInfos = ref([
    {
      name: 'Email',
      info: 'suporte@email.com',
      icon: Mail,
    },
    {
      name: 'Telefone',
      info: '+55 47 334903948',
      icon: Phone,
    },
  ]);
</script>
