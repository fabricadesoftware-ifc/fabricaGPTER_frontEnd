<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn v-if="smAndDown" class="d-flex align-center" variant="text" @click="$router.back()">
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Informações" />
    </div>
    <MenuProfile
      class="text-black"
      :image="foto"
      :infos="{ name: 'Roberto' }"
    />
    <PersonalInfos :personal-infos="personalInfos" />
  </v-container>
</template>

<script setup>
  import { ref } from 'vue';
  import { useDisplay } from 'vuetify';
  const { smAndDown } = useDisplay()
  import PersonalInfos from '@/components/PersonalInfos.vue';
  import { Calendar, ChevronLeft, Fingerprint, House, Mail, Phone, User } from 'lucide-vue-next';
  import foto from '@/assets/foto-paciente.png'
  const personalInfos = ref([
    {
      name: 'Nome',
      info: 'Daniel Santos',
      icon: User,
    },
    {
      name: 'Email',
      info: 'daniel@gmail.com',
      icon: Mail,
    },
    {
      name: 'Telefone',
      info: '(47)998903948',
      icon: Phone,
    },
    {
      name: 'Data de Nascimento',
      info: '25/08/1989',
      icon: Calendar,
    },
    {
      name: 'CPF',
      info: '01234567890',
      icon: Fingerprint,
    },
    {
      name: 'Endereço',
      info: 'Rua das alamedas, 345, Centro, Joinville - SC, 8839-8476',
      icon: House,
    },
  ]);
</script>
