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
  const initial = computed(() => (props.name || '').trim().charAt(0).toUpperCase())
  const hasPhoto = computed(() => Boolean(props.photo) && !failed.value)
</script>

<template>
  <v-avatar class="bg-primary" :size="size">
    <v-img
      v-if="hasPhoto"
      :alt="name || 'Foto do perfil'"
      cover
      :src="photo"
      @error="failed = true"
    />
    <span v-else-if="initial" class="text-h4 font-weight-bold text-white">{{ initial }}</span>
    <User v-else color="#ffffff" :size="Number(size) / 2" />
  </v-avatar>
</template>
