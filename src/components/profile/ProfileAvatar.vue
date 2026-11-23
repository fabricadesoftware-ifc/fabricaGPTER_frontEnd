<script setup>
  import { computed, ref, watch } from 'vue'
  import { User } from 'lucide-vue-next'

  const props = defineProps({
    name: { type: String, default: '' },
    photo: { type: String, default: '' },
    size: { type: [Number, String], default: 96 },
  })

  const failed = ref(false)
  watch(() => props.photo, () => { failed.value = false })
  // Up to two initials ("Ana Martins" -> "AM").
  const initials = computed(() => (props.name || '').trim().split(/\s+/).filter(Boolean)
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .map(part => part.charAt(0).toUpperCase()).join(''))
  const hasPhoto = computed(() => Boolean(props.photo) && !failed.value)
  const fontSize = computed(() => `${Math.max(10, Math.round(Number(props.size) * 0.38))}px`)
</script>

<template>
  <v-avatar class="profile-avatar" :size="size">
    <v-img
      v-if="hasPhoto"
      :alt="name || 'Foto do perfil'"
      cover
      :src="photo"
      @error="failed = true"
    />
    <span v-else-if="initials" aria-hidden="true" :style="{ fontSize }">{{ initials }}</span>
    <User v-else aria-hidden="true" :size="Number(size) / 2" />
  </v-avatar>
</template>

<style scoped>
.profile-avatar {
  background: var(--app-primary-soft);
  color: var(--app-primary);
  font-weight: 700;
  letter-spacing: -0.01em;
}
</style>
