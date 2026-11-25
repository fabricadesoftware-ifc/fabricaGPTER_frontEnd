<script setup>
  import { computed, onMounted } from 'vue'
  import { Mail, Phone } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'

  const data = useDataStore()

  const contacts = computed(() => {
    const items = []
    if (data.support?.email) items.push({ name: 'E-mail', icon: Mail, info: data.support.email, href: `mailto:${data.support.email}` })
    if (data.support?.phone) items.push({ name: 'Telefone', icon: Phone, info: data.support.phone, href: `tel:${data.support.phone.replace(/[^\d+]/g, '')}` })
    return items
  })

  function load () {
    return data.loadSupport({ force: true })
  }

  onMounted(load)
</script>

<template>
  <v-card v-if="data.supportLoading"><v-progress-linear aria-label="Carregando contatos de suporte" indeterminate /><div class="pa-8" /></v-card>

  <v-alert
    v-else-if="data.supportError"
    role="alert"
    type="error"
  >
    {{ data.supportError }}
    <template #append><v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn></template>
  </v-alert>

  <div v-else-if="contacts.length" class="contacts">
    <v-card
      v-for="info in contacts"
      :key="info.name"
      class="contact"
      :href="info.href"
    >
      <component :is="info.icon" class="contact__icon" :size="18" />
      <span>
        <span class="contact__label">{{ info.name }}</span>
        <span class="contact__value">{{ info.info }}</span>
      </span>
    </v-card>
  </div>

  <v-card v-else class="pa-8 text-center text-muted">Nenhum contato de suporte disponível no momento</v-card>
</template>

<style scoped>
.contacts { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap: 16px; }
.contact { display: flex; align-items: center; gap: 12px; padding: 20px; }
.contact__icon { color: var(--app-ink-subtle); flex: none; }
.contact__label { display: block; font-size: 0.8125rem; color: var(--app-ink-subtle); }
.contact__value { display: block; font-weight: 500; overflow-wrap: anywhere; }
</style>
