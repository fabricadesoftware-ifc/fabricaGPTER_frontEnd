<script setup>
  import { professionalPersonalInfos as personalInfos } from '@/mocks';
  import { useDisplay } from 'vuetify';
  import PersonalInfos from '@/components/PersonalInfos.vue';
  import { ChevronLeft } from 'lucide-vue-next';

  const { smAndDown } = useDisplay();

</script>
<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn
        v-if="smAndDown"
        class="d-flex align-center"
        variant="text"
        @click="$router.back()"
      >
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>

      <SubpageTitle title="Informações" />
    </div>
    <PersonalInfos :personal-infos="personalInfos" />
  </v-container>
</template>
