<script setup>
  import { useDisplay } from 'vuetify'
  import SubpageTitle from '@/components/ui/SubpageTitle.vue'
  import SupportInfo from '@/components/profile/SupportInfo.vue'
  import { ChevronLeft } from 'lucide-vue-next'

  const { smAndDown } = useDisplay()
</script>

<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn
        v-if="smAndDown"
        aria-label="Voltar"
        class="d-flex align-center"
        variant="text"
        @click="$router.back()"
      >
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Contato" />
    </div>
    <SupportInfo />
  </v-container>
</template>
