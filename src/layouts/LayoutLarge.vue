<script setup>
  import LargeHeader from '@/components/templates/large/LargeHeader.vue';
  import LargeAside from '@/components/templates/large/LargeAside.vue';
  import LargeFooter from '@/components/templates/large/LargeFooter.vue';
</script>
<template>
  <div id="layout-large">
    <header>
      <large-header />
    </header>
    <aside>
      <large-aside />
    </aside>
    <main>
      <router-view />
    </main>
    <footer>
      <large-footer />
    </footer>
  </div>
</template>