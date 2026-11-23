<script setup>
  // Headline number: label, value and unit. Text stays in ink colors.
  defineProps({
    label: { type: String, required: true },
    value: { type: [String, Number], default: '—' },
    unit: { type: String, default: '' },
    icon: { type: [Object, Function], default: null },
  })
</script>

<template>
  <v-card class="stat-tile">
    <div class="stat-tile__label">
      <component
        :is="icon"
        v-if="icon"
        aria-hidden="true"
        class="stat-tile__icon"
        :size="16"
      />
      {{ label }}
    </div>
    <div class="stat-tile__value">
      {{ value }}<span v-if="unit && value !== '—'" class="stat-tile__unit">{{ unit }}</span>
    </div>
  </v-card>
</template>

<style scoped>
.stat-tile { padding: 16px 20px; }
.stat-tile__label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--app-ink-subtle);
}
.stat-tile__icon { color: var(--app-primary); }
.stat-tile__value {
  margin-top: 6px;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}
.stat-tile__unit { margin-left: 4px; font-size: 0.875rem; font-weight: 500; color: var(--app-ink-muted); }
</style>
