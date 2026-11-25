<script setup>
  import { ArrowLeft } from 'lucide-vue-next'

  // Standard page heading: optional back link, title, subtitle and actions.
  defineProps({
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    back: { type: [String, Object], default: null },
    backLabel: { type: String, default: 'Voltar' },
  })
</script>

<template>
  <header class="page-header">
    <v-btn
      v-if="back"
      class="page-header__back"
      density="comfortable"
      size="small"
      :to="back"
      variant="text"
    >
      <ArrowLeft class="mr-1" :size="16" />{{ backLabel }}
    </v-btn>
    <div class="page-header__row">
      <div class="page-header__text">
        <p v-if="eyebrow" class="eyebrow mb-1">{{ eyebrow }}</p>
        <div class="d-flex align-center flex-wrap ga-3">
          <h1 class="page-header__title">{{ title }}</h1>
          <slot name="badge" />
        </div>
        <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots.actions" class="page-header__actions">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<style scoped>
.page-header { margin-bottom: 24px; }
.page-header__back { margin-left: -8px; margin-bottom: 8px; color: var(--app-ink-muted); }
.page-header__row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.page-header__text { min-width: 0; }
.page-header__title {
  font-size: clamp(1.5rem, 2.2vw, 1.875rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.2;
  margin: 0;
}
.page-header__subtitle {
  margin: 8px 0 0;
  color: var(--app-ink-muted);
  font-size: 0.9375rem;
}
.page-header__actions { display: flex; flex-wrap: wrap; gap: 8px; }

@media (max-width: 599px) {
  .page-header { margin-bottom: 16px; }
  .page-header__actions { width: 100%; }
  .page-header__actions > :deep(.v-btn) { flex: 1 1 0; }
}
</style>
