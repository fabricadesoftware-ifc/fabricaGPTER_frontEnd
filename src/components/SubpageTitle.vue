<template>
  <div class="w-100 d-flex align-center ga-2">
    <div v-if="backButton" @click="goBack" class="d-flex align-center cursor-pointer">
      <ArrowLeft class="d-flex align-center" />
    </div>
    <h2 class="text-h5 font-weight-medium">{{ title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  backButton: {
    type: Boolean,
    default: true,
  },
});

import { ArrowLeft } from "lucide-vue-next";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>
