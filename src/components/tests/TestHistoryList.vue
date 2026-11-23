<script setup>
  import { Activity, ChevronRight } from 'lucide-vue-next'
  import { formatDateBR } from '@/utils/date'
  import StatusChip from '@/components/ui/StatusChip.vue'

  defineProps({
    tests: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <ul class="tests">
    <li v-for="test in tests" :key="test.id">
      <router-link class="test-row" :to="{ path: '/patient/assessment-details', query: { id: test.id } }">
        <span class="test-row__icon"><Activity :size="18" /></span>
        <span class="test-row__main">
          <span class="test-row__title">Teste de {{ test.seconds }}s</span>
          <span class="test-row__meta">{{ formatDateBR(test.date) }} · mão {{ (test.arm || 'não informada').toLowerCase() }}</span>
        </span>
        <span class="test-row__status"><StatusChip :status="test.status" /></span>
        <ChevronRight class="text-subtle" :size="18" />
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
.tests { list-style: none; margin: 0; padding: 0; }
.tests li + li { border-top: 1px solid var(--app-border); }
.test-row { display: flex; align-items: center; gap: 14px; padding: 14px 20px; color: inherit; text-decoration: none; transition: background-color 0.15s ease; }
.test-row:hover { background: #F8FAFC; }
.test-row:focus-visible { outline: 2px solid var(--app-primary); outline-offset: -2px; }
.test-row__icon { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 10px; background: var(--app-primary-soft); color: var(--app-primary); flex: none; }
.test-row__main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.test-row__title { font-weight: 600; }
@media (max-width: 599px) {
  .test-row { flex-wrap: wrap; row-gap: 6px; }
  .test-row__status { order: 3; flex-basis: 100%; padding-left: 50px; }
}
.test-row__meta { font-size: 0.8125rem; color: var(--app-ink-subtle); }
</style>
