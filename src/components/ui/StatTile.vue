<script setup>
  // Headline number: label, value and unit. `lead` marks the one figure that matters.
  defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], default: '—' },
    unit: { type: String, default: '' },
    lead: Boolean,
    // Text values (e.g. "Direita") stay in the interface face.
    text: Boolean,
  })
</script>

<template>
  <v-card class="stat-tile" :class="{ 'stat-tile--lead': lead }">
    <div class="stat-tile__label">{{ label }}</div>
    <div class="stat-tile__value" :class="{ figure: !text }">
      {{ value }}<span v-if="unit && value !== '—'" class="stat-tile__unit">{{ unit }}</span>
    </div>
  </v-card>
</template>

<style scoped>
.stat-tile { display: flex; flex-direction: column; justify-content: space-between; gap: 8px; padding: 16px 20px; }
.stat-tile__label { font-size: 0.8125rem; color: var(--app-ink-subtle); }
.stat-tile__value { font-size: 1.5rem; font-weight: 500; line-height: 1.2; }
.stat-tile__unit { margin-left: 4px; font-family: 'Inter', system-ui, sans-serif; font-size: 0.875rem; color: var(--app-ink-muted); }
.stat-tile--lead .stat-tile__value { font-size: 2.25rem; line-height: 1.1; color: var(--app-primary); }
.stat-tile--lead .stat-tile__unit { font-size: 1rem; }
</style>
