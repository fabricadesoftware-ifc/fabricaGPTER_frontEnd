<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { BookOpen, ClipboardList, Users } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'

  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')
  const profile = computed(() => data.profile || session.user || {})
  const displayName = computed(() => profile.value.name || profile.value.displayName || profile.value.username || 'Perfil')

  // Highlights the tab that owns the current page, including nested pages.
  const active = computed(() => {
    if (route.path.includes('/manual')) return 'manual'
    if (route.path.includes('/profile')) return 'profile'
    return 'home'
  })
</script>

<template>
  <v-bottom-navigation
    class="mobile-nav"
    color="primary"
    grow
    height="64"
    :model-value="active"
  >
    <v-btn
      :to="professional ? '/professional/patients' : '/patient/test-history'"
      value="home"
    >
      <component :is="professional ? Users : ClipboardList" :size="20" />
      <span>{{ professional ? 'Pacientes' : 'Histórico' }}</span>
    </v-btn>

    <v-btn :to="base + '/manual'" value="manual">
      <BookOpen :size="20" />
      <span>Manual</span>
    </v-btn>

    <v-btn :to="base + '/profile'" value="profile">
      <ProfileAvatar :name="profile.name || displayName" :photo="profile.photo" :size="24" />
      <span>{{ displayName.split(' ')[0] }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.mobile-nav { border-top: 1px solid var(--app-border); box-shadow: none !important; padding-bottom: env(safe-area-inset-bottom); }
.mobile-nav :deep(.v-btn) { font-size: 0.75rem; font-weight: 500; color: var(--app-ink-subtle); }
.mobile-nav :deep(.v-btn--active) { color: var(--app-primary); }
.mobile-nav :deep(.v-btn__content) { gap: 4px; }
</style>
