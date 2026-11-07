<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')

  import {
    BookOpen,
    ClipboardList,
    User,
  } from 'lucide-vue-next';
</script>
<template>
  <v-bottom-navigation color="primary" grow height="70">
    <v-btn router :to="professional ? '/professional/patients' : '/patient/test-history'" value="Pacientes">
      <ClipboardList color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">{{ professional ? 'Pacientes' : 'Histórico' }}</span>
    </v-btn>

    <v-btn router :to="base + '/manual'" value="Manual">
      <BookOpen color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Manual</span>
    </v-btn>

    <v-btn router :to="base + '/profile'" value="Perfil">
      <User color="#818181" />
      <span class="text-grey-darken-2 text-subtitle-2">Perfil</span>
    </v-btn>
  </v-bottom-navigation>
</template>


<style scoped></style>
