<script setup>
  import { computed } from 'vue'
  import { useSessionStore } from '@/stores/auth'
  import { useDataStore } from '@/stores/data'
  const session = useSessionStore()
  const data = useDataStore()
  const personalInfos = computed(() => {
    const profile = data.patients.find(patient => patient.id === session.user?.profileId) || {}
    return [['Nome', 'name', 'user'], ['Email', 'email', 'mail'], ['Telefone', 'phone', 'phone'], ['Data de Nascimento', 'birthDate', 'calendar'], ['CPF', 'cpf', 'fingerprint']].map(([name, key, icon]) => ({ name, icon, info: profile[key] || 'Não informado' }))
  })
  import { useDisplay } from 'vuetify';
  import PersonalInfos from '@/components/profile/PersonalInfos.vue';
  import { ChevronLeft } from 'lucide-vue-next';

  const { smAndDown } = useDisplay();

</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn
        v-if="smAndDown"
        aria-label="Voltar"
        class="d-flex align-center"
        variant="text"
        @click="$router.back()"
      >
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Informações" />
    </div>
    <PersonalInfos :personal-infos="personalInfos" />
  </v-container>
</template>
