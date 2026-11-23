<script setup>
  import { computed, provide, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDisplay } from 'vuetify'
  import { ChevronRight, FileText, LockKeyhole, LogOut, Phone, UserRound } from 'lucide-vue-next'
  import { useLogout } from '@/composables/useLogout'
  import { useProfile } from '@/composables/useProfile'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'

  // Shared by /patient/profile and /professional/profile.
  const props = defineProps({
    base: { type: String, required: true },
  })

  const { session, selectSetting } = useLogout()
  const { profile, loading, error, load } = useProfile()
  const route = useRoute()
  const router = useRouter()
  const { smAndDown } = useDisplay()

  const profileRoute = computed(() => `${props.base}/profile`)
  provide('profileRoute', profileRoute)
  const roleLabel = computed(() => props.base === '/professional' ? 'Profissional' : 'Paciente')
  const settings = computed(() => [
    { name: 'Informações pessoais', icon: UserRound, link: `${profileRoute.value}/infos` },
    { name: 'Alterar senha', icon: LockKeyhole, link: `${profileRoute.value}/change-password` },
    { name: 'Termos de uso', icon: FileText, link: `${profileRoute.value}/terms-of-use` },
    { name: 'Contato e suporte', icon: Phone, link: `${profileRoute.value}/contact` },
  ])

  watch([() => route.name, smAndDown], ([name, mobile]) => {
    if (name === profileRoute.value && !mobile) router.replace(`${profileRoute.value}/infos`)
  }, { immediate: true })
</script>

<template>
  <div class="page">
    <header v-if="!smAndDown || route.name === profileRoute" class="mb-6">
      <h1 class="account-title">Minha conta</h1>
    </header>

    <div class="account" :class="{ 'account--mobile': smAndDown }">
      <aside v-if="!smAndDown || route.name === profileRoute" class="account__nav">
        <v-card>
          <div class="account__identity">
            <ProfileAvatar :name="profile.name" :photo="profile.photo" :size="smAndDown ? 64 : 56" />
            <div class="min-w-0">
              <p class="account__name">{{ profile.name || 'Usuário' }}</p>
              <p class="account__role">{{ roleLabel }}</p>
            </div>
          </div>
          <v-progress-linear v-if="loading" aria-label="Carregando perfil" indeterminate />
          <v-divider v-else />
          <v-alert
            v-if="error"
            class="ma-3"
            density="compact"
            role="alert"
            type="error"
          >
            {{ error }}
            <template #append><v-btn size="x-small" variant="outlined" @click="load(true)">Tentar</v-btn></template>
          </v-alert>
          <nav aria-label="Conta">
            <v-list class="py-2" nav>
              <v-list-item
                v-for="setting in settings"
                :key="setting.link"
                class="account__link"
                color="primary"
                rounded="lg"
                :to="setting.link"
              >
                <template #prepend><component :is="setting.icon" class="mr-3" :size="18" /></template>
                <v-list-item-title>{{ setting.name }}</v-list-item-title>
                <template v-if="smAndDown" #append><ChevronRight class="text-subtle" :size="18" /></template>
              </v-list-item>
            </v-list>
          </nav>
          <v-divider />
          <v-list class="py-2" nav>
            <v-list-item
              base-color="error"
              class="account__link"
              :disabled="session.loading"
              rounded="lg"
              @click="selectSetting({ logout: true })"
            >
              <template #prepend><LogOut class="mr-3" :size="18" /></template>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </aside>

      <section v-if="!smAndDown || route.name !== profileRoute" class="account__content">
        <router-view />
      </section>
    </div>
  </div>
</template>

<style scoped>
.account-title { font-size: clamp(1.5rem, 2.2vw, 1.875rem); font-weight: 700; letter-spacing: -0.02em; margin: 0; }
.account { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; align-items: start; }
.account--mobile { grid-template-columns: minmax(0, 1fr); }
.account__identity { display: flex; align-items: center; gap: 14px; padding: 20px; }
.account__identity p { margin: 0; }
.account__name { font-weight: 700; font-size: 1rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.account__role { font-size: 0.8125rem; color: var(--app-ink-subtle); }
.account__link { font-weight: 500; }
.min-w-0 { min-width: 0; }
</style>
