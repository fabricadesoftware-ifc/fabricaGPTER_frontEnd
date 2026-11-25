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
  <v-app-bar class="app-bar" flat height="60">
    <div class="app-bar__inner">
      <router-link aria-label="GPTER, página inicial" class="app-bar__brand" :to="links[0].to">
        <img alt="" class="app-bar__logo" src="@/assets/logo-gpter-wo-bg.png">
      </router-link>

      <nav aria-label="Principal" class="app-bar__nav">
        <router-link
          v-for="link in links"
          :key="link.to"
          :aria-current="link.match.test(route.path) ? 'page' : undefined"
          class="app-bar__link"
          :class="{ 'app-bar__link--active': link.match.test(route.path) }"
          :to="link.to"
        >
          <component :is="link.icon" :size="16" />{{ link.title }}
        </router-link>
      </nav>

      <v-menu location="bottom end" offset="4">
        <template #activator="{ props }">
          <button v-bind="props" class="app-bar__user" type="button">
            <ProfileAvatar :name="profile.name || displayName" :photo="profile.photo" :size="28" />
            <span class="app-bar__user-text">
              <span class="app-bar__user-name">{{ displayName }}</span>
              <span class="app-bar__user-role">{{ roleLabel }}</span>
            </span>
            <ChevronDown class="app-bar__chevron" :size="16" />
          </button>
        </template>
        <v-list class="py-1" min-width="220">
          <v-list-item :to="`${base}/profile/infos`">
            <template #prepend><UserRound class="mr-3 text-subtle" :size="16" /></template>
            <v-list-item-title>Minha conta</v-list-item-title>
          </v-list-item>
          <v-divider class="my-1" />
          <v-list-item :disabled="session.loading" @click="selectSetting({ logout: true })">
            <template #prepend><LogOut class="mr-3 text-subtle" :size="16" /></template>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<style scoped>
.app-bar { border-bottom: 1px solid var(--app-border) !important; background: rgb(var(--v-theme-surface)) !important; box-shadow: none !important; }
.app-bar__inner { display: flex; align-items: stretch; gap: 32px; width: 100%; height: 100%; max-width: 1200px; margin: 0 auto; padding: 0 32px; }

.app-bar__brand { display: flex; align-items: center; }
/* The logo file has transparent margins; a small negative margin trims them without cutting the mark. */
.app-bar__logo { display: block; width: 56px; height: 56px; margin: 0 -4px; }

.app-bar__nav { display: flex; align-items: stretch; gap: 24px; flex: 1; }
.app-bar__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--app-ink-subtle);
  text-decoration: none;
  transition: color 160ms var(--app-ease);
}
.app-bar__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  border-radius: 2px 2px 0 0;
  background: var(--app-primary);
  opacity: 0;
  transition: opacity 160ms var(--app-ease);
}
.app-bar__link:hover { color: var(--app-ink); }
.app-bar__link--active { color: var(--app-ink); }
.app-bar__link--active::after { opacity: 1; }
.app-bar__link:focus-visible { outline: 2px solid var(--app-primary); outline-offset: -12px; border-radius: 8px; }

.app-bar__user {
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: center;
  height: 40px;
  padding: 0 8px 0 4px;
  border-radius: 8px;
  color: inherit;
  transition: background-color 160ms var(--app-ease);
}
.app-bar__user:hover, .app-bar__user[aria-expanded='true'] { background: var(--app-hover); }
.app-bar__user:focus-visible { outline: 2px solid var(--app-primary); outline-offset: 0; }
.app-bar__user-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.25; text-align: left; }
.app-bar__user-name { font-size: 0.8125rem; font-weight: 500; }
.app-bar__user-role { font-size: 0.75rem; color: var(--app-ink-subtle); }
.app-bar__chevron { color: var(--app-ink-subtle); }
</style>
