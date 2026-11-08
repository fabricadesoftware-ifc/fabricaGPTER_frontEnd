<script setup>
  import { computed } from 'vue'
  import { useProfile } from '@/composables/useProfile'
  import { formatDateBR } from '@/utils/date'
  import { useDisplay } from 'vuetify'
  import PersonalInfos from '@/components/profile/PersonalInfos.vue'
  import SubpageTitle from '@/components/ui/SubpageTitle.vue'
  import { ChevronLeft } from 'lucide-vue-next'

  const { smAndDown } = useDisplay()
  const { profile, loading, error, load } = useProfile()

  const personalInfos = computed(() => {
    const value = profile.value || {}
    return [
      { name: 'Nome', icon: 'user', info: value.name || 'Não informado' },
      { name: 'Usuário', icon: 'user', info: value.username || 'Não informado' },
      { name: 'Email', icon: 'mail', info: value.email || 'Não informado' },
      { name: 'Telefone', icon: 'phone', info: value.phone || 'Não informado' },
      { name: 'Data de Nascimento', icon: 'calendar', info: formatDateBR(value.birthDate) },
      { name: 'CPF', icon: 'fingerprint', info: value.cpf || 'Não informado' },
    ]
  })
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

    <v-progress-linear
      v-if="loading"
      aria-label="Carregando perfil"
      class="mb-4"
      indeterminate
      rounded
    />
    <v-alert
      v-else-if="error"
      class="mb-4"
      role="alert"
      type="error"
      variant="tonal"
    >
      <div class="d-flex flex-column ga-3">
        <span>{{ error }}</span>
        <v-btn size="small" variant="outlined" @click="load(true)">Tentar novamente</v-btn>
      </div>
    </v-alert>

    <PersonalInfos v-else :personal-infos="personalInfos" />
  </v-container>
</template>
