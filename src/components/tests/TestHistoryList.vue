<script setup>
  import { ChevronRight } from 'lucide-vue-next'
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
      <router-link class="list-row" :to="{ path: '/patient/assessment-details', query: { id: test.id } }">
        <span class="test-row__main">
          <span class="test-row__title">Teste de {{ test.seconds }} s</span>
          <span class="test-row__meta">{{ formatDateBR(test.date) }} · mão {{ (test.arm || 'não informada').toLowerCase() }}</span>
        </span>
        <StatusChip :status="test.status" />
        <ChevronRight class="text-subtle" :size="18" />
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
.tests { list-style: none; margin: 0; padding: 0; }
.tests li + li { border-top: 1px solid var(--app-border); }
.test-row__main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.test-row__title { font-weight: 500; }
.test-row__meta { font-size: 0.8125rem; color: var(--app-ink-subtle); }
</style>
