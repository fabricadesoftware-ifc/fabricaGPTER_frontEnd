<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'
  import { BookOpen, ClipboardList } from 'lucide-vue-next'

  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()
  const professional = computed(() => route.path.startsWith('/professional'))
  const base = computed(() => professional.value ? '/professional' : '/patient')
  const profile = computed(() => data.profile || session.user || {})
  const displayName = computed(() => profile.value.name || profile.value.displayName || profile.value.username || 'Perfil')
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
      <ProfileAvatar :name="profile.name" :photo="profile.photo" :size="24" />
      <span class="text-grey-darken-2 text-subtitle-2">{{ displayName.split(' ')[0] }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped></style>
