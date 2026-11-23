<script setup>
  import { computed } from 'vue'
  import { AtSign, Calendar, Fingerprint, Mail, Phone, User } from 'lucide-vue-next'
  import { useProfile } from '@/composables/useProfile'
  import { formatDateBR } from '@/utils/date'
  import ProfileSubpage from '@/components/profile/ProfileSubpage.vue'

  const { profile, loading, error, load } = useProfile()

  function formatCpf (value) {
    const digits = String(value || '').replace(/\D/g, '')
    return digits.length === 11 ? digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : value
  }

  const infos = computed(() => {
    const value = profile.value || {}
    return [
      { name: 'Nome', icon: User, info: value.name },
      { name: 'Usuário', icon: AtSign, info: value.username },
      { name: 'E-mail', icon: Mail, info: value.email },
      { name: 'Telefone', icon: Phone, info: value.phone },
      { name: 'Data de nascimento', icon: Calendar, info: value.birthDate ? formatDateBR(value.birthDate) : '' },
      { name: 'CPF', icon: Fingerprint, info: formatCpf(value.cpf) },
    ]
  })
</script>

<template>
  <ProfileSubpage subtitle="Dados cadastrados na sua conta." title="Informações pessoais">
    <v-alert
      v-if="error"
      class="mb-4"
      role="alert"
      type="error"
    >
      {{ error }}
      <template #append><v-btn size="small" variant="outlined" @click="load(true)">Tentar novamente</v-btn></template>
    </v-alert>
    <v-card>
      <v-progress-linear v-if="loading" aria-label="Carregando perfil" indeterminate />
      <div class="card-section">
        <dl class="info-list">
          <div v-for="info in infos" :key="info.name">
            <dt><component :is="info.icon" aria-hidden="true" :size="14" />{{ info.name }}</dt>
            <dd :class="{ 'text-subtle': !info.info }">{{ info.info || 'Não informado' }}</dd>
          </div>
        </dl>
      </div>
    </v-card>
  </ProfileSubpage>
</template>
