<script setup>
  import { computed, inject } from 'vue'
  import { useDisplay } from 'vuetify'
  import { ArrowLeft } from 'lucide-vue-next'

  // Heading for profile subpages; on mobile it links back to the account menu.
  defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
  })
  const { smAndDown } = useDisplay()
  const profileRoute = inject('profileRoute', computed(() => ''))
</script>

<template>
  <div>
    <header class="subpage-header">
      <v-btn
        v-if="smAndDown && profileRoute"
        class="subpage-header__back"
        density="comfortable"
        size="small"
        :to="profileRoute"
        variant="text"
      ><ArrowLeft class="mr-1" :size="16" />Minha conta</v-btn>
      <h2 class="subpage-header__title">{{ title }}</h2>
      <p v-if="subtitle" class="subpage-header__subtitle">{{ subtitle }}</p>
    </header>
    <slot />
  </div>
</template>

<style scoped>
.subpage-header { margin-bottom: 16px; }
.subpage-header__back { margin-left: -8px; margin-bottom: 8px; color: var(--app-ink-muted); }
.subpage-header__title { font-size: 1.25rem; font-weight: 700; letter-spacing: -0.01em; margin: 0; }
.subpage-header__subtitle { margin: 4px 0 0; color: var(--app-ink-muted); font-size: 0.875rem; }
</style>
