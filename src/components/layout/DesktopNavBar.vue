<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { BookOpen, ChevronDown, ClipboardList, LogOut, UserRound, Users } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { useLogout } from '@/composables/useLogout'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'

  const route = useRoute()
  const data = useDataStore()
  const { session, selectSetting } = useLogout()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')
  const profile = computed(() => data.profile || session.user || {})
  const displayName = computed(() => profile.value.name || profile.value.displayName || profile.value.username || 'Perfil')
  const roleLabel = computed(() => professional.value ? 'Profissional' : 'Paciente')

  const links = computed(() => [
    professional.value
      ? { title: 'Pacientes', to: '/professional/patients', icon: Users, match: /^\/professional\/(patients|patient-details|edit-patient|register-patient|new-test|test-|assessment)/ }
      : { title: 'Histórico', to: '/patient/test-history', icon: ClipboardList, match: /^\/patient\/(test-|assessment)/ },
    { title: 'Manual', to: `${base.value}/manual`, icon: BookOpen, match: /\/manual$/ },
  ])
</script>

<template>
  <v-app-bar class="app-bar" flat height="64">
    <div class="app-bar__inner">
      <router-link aria-label="Página inicial" class="app-bar__brand" :to="links[0].to">
        <img alt="GPTER" height="56" src="@/assets/logo-gpter-wo-bg.png">
      </router-link>

      <nav aria-label="Principal" class="app-bar__nav">
        <v-btn
          v-for="link in links"
          :key="link.to"
          :active="link.match.test(route.path)"
          class="app-bar__link"
          :to="link.to"
          variant="text"
        >
          <component :is="link.icon" class="mr-2" :size="18" />{{ link.title }}
        </v-btn>
      </nav>

      <v-spacer />

      <v-menu location="bottom end" offset="8">
        <template #activator="{ props }">
          <v-btn v-bind="props" class="app-bar__user" height="44" variant="text">
            <ProfileAvatar :name="profile.name || displayName" :photo="profile.photo" :size="32" />
            <span class="app-bar__user-text">
              <span class="app-bar__user-name">{{ displayName }}</span>
              <span class="app-bar__user-role">{{ roleLabel }}</span>
            </span>
            <ChevronDown class="ml-1 text-subtle" :size="16" />
          </v-btn>
        </template>
        <v-list min-width="200">
          <v-list-item :to="`${base}/profile/infos`">
            <template #prepend><UserRound class="mr-3" :size="18" /></template>
            <v-list-item-title>Meu perfil</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1" />
          <v-list-item base-color="error" :disabled="session.loading" @click="selectSetting({ logout: true })">
            <template #prepend><LogOut class="mr-3" :size="18" /></template>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<style scoped>
.app-bar { border-bottom: 1px solid var(--app-border) !important; background: rgba(255, 255, 255, 0.92) !important; backdrop-filter: blur(8px); }
.app-bar__inner { display: flex; align-items: center; gap: 24px; width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 32px; }
.app-bar__brand { display: flex; align-items: center; margin: 0 -8px; }
.app-bar__nav { display: flex; gap: 4px; }
.app-bar__link { color: var(--app-ink-muted); font-weight: 500; }
.app-bar__link.v-btn--active { color: var(--app-primary); background: var(--app-primary-soft); }
.app-bar__link.v-btn--active :deep(.v-btn__overlay) { opacity: 0; }
.app-bar__user { padding: 0 8px; }
.app-bar__user-text { display: flex; flex-direction: column; align-items: flex-start; margin-left: 10px; line-height: 1.2; }
.app-bar__user-name { font-size: 0.875rem; font-weight: 600; }
.app-bar__user-role { font-size: 0.75rem; font-weight: 500; color: var(--app-ink-subtle); }
</style>
