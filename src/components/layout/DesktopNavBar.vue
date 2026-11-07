<script setup>
  import { useTheme } from 'vuetify'
  const theme = useTheme()
  const dark = computed({ get: () => theme.global.name.value === 'dark', set: value => { theme.global.name.value = value ? 'dark' : 'light' } })
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')

  import { Moon, User } from 'lucide-vue-next';
</script>
<template>
  <v-app-bar class="px-6" :elevation="1" height="70">
    <v-toolbar-items class="w-100 d-flex align-center ga-8">
      <img
        alt="GPTER"
        src="@/assets/logo-gpter.png"
        style="max-height: 100%; max-width: 100%; object-fit: contain"
      >
      <v-btn
        class="text-none"
        router
        :to="professional ? '/professional/patients' : '/patient/test-history'"
        value="Pacientes"
        variant="text"
      >
        {{ professional ? 'Pacientes' : 'Histórico' }}</v-btn>

      <v-btn
        class="text-none"
        router
        :to="base + '/manual'"
        value="Manual"
        variant="text"
      >Manual</v-btn>

      <v-spacer />

      <v-row align="center" class="ga-2 flex-0-0">
        <v-switch
          v-model="dark"
          aria-label="Modo escuro"
          center-affix
          class="toggle-btn"
          flat
          hide-details
          inset
        />
        <Moon />
      </v-row>

      <v-btn aria-label="Perfil" class="pa-0" variant="text" @click="$router.push(base + '/profile/infos')">
        <User />
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
