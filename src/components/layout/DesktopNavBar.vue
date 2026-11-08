<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'
  import { Moon } from 'lucide-vue-next'

  const theme = useTheme()
  const dark = computed({ get: () => theme.global.name.value === 'dark', set: value => { theme.global.name.value = value ? 'dark' : 'light' } })
  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')
  const profile = computed(() => data.profile || session.user || {})
  const displayName = computed(() => profile.value.name || profile.value.displayName || profile.value.username || 'Perfil')
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

      <v-btn aria-label="Perfil" class="pa-0 text-none" variant="text" @click="$router.push(base + '/profile/infos')">
        <div class="d-flex align-center ga-2">
          <ProfileAvatar :name="profile.name" :photo="profile.photo" :size="36" />
          <span class="text-body-2">{{ displayName }}</span>
        </div>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
