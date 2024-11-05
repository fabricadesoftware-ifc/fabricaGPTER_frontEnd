<script setup>
import LogoTitle from '@/components/templates/LogoTitle.vue';
</script>

<template>
  <logo-title class="pl-0" />
  <div class="icons">
    <i class="mdi mdi-magnify" />
  </div>
</template>

<style scoped>
.pl-0 {
  padding-left: 0rem;
}

.icons {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.7rem;
}
</style>
