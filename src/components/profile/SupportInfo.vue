<script setup>
  import { computed, onMounted } from 'vue'
  import { useDataStore } from '@/stores/data'
  import { Mail, Phone } from 'lucide-vue-next'

  const data = useDataStore()

  const contacts = computed(() => {
    const items = []
    if (data.support?.email) items.push({ name: 'Email', icon: Mail, info: data.support.email })
    if (data.support?.phone) items.push({ name: 'Telefone', icon: Phone, info: data.support.phone })
    return items
  })

  function load () {
    return data.loadSupport({ force: true })
  }

  onMounted(load)
</script>

<template>
  <v-card class="pa-4 rounded-xl elevation-2">
    <v-card-title class="text-h6 font-weight-bold pa-0 mb-6">Suporte</v-card-title>

    <v-progress-linear
      v-if="data.supportLoading"
      aria-label="Carregando contatos de suporte"
      class="mb-4"
      indeterminate
      rounded
    />

    <v-alert
      v-else-if="data.supportError"
      role="alert"
      type="error"
      variant="tonal"
    >
      <div class="d-flex flex-column ga-3">
        <span>{{ data.supportError }}</span>
        <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
      </div>
    </v-alert>

    <template v-else>
      <v-row v-for="info in contacts" :key="info.name" class="ga-2">
        <v-col align="center" cols="1" justify="center">
          <Component :is="info.icon" color="#005BBB" />
        </v-col>
        <v-col class="d-flex flex-column">
          <p class="text-p font-weight-bold">{{ info.name }}</p>
          <p class="text-p opacity-80 font-weight-light">{{ info.info }}</p>
        </v-col>
      </v-row>
      <p v-if="!contacts.length" class="text-body-1 text-grey-darken-1">
        Nenhum contato de suporte disponível no momento.
      </p>
    </template>
  </v-card>
</template>
