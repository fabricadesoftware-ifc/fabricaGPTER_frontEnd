<template>
  <v-card
    class="mx-auto pa-4"
    max-width="450"
    elevation="2"
    rounded="xl"
  >
    <v-card-title class="text-h6 font-weight-medium pa-0 mb-4">
      Informações do paciente
    </v-card-title>

    <v-card-text class="pa-0">
      <div class="d-flex flex-column ga-4">
        <div v-for="info in infos" :key="info.prop" class="d-flex align-start ga-3">
          <div>
            <component :is="info.icon" :size="20" class="text-blue"/>
          </div>
          <div>
            <span class="font-weight-bold">{{ info.name }}:</span>
            <span class="ml-1">{{ info.prop }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import {Clock, Mail, MapPinHouse} from "lucide-vue-next";

const props = defineProps({
  address: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
  }
})

const infos = ref([
  {
    name: 'Endereço',
    icon: MapPinHouse,
    prop: props.address
  },
  {
    name: 'Email',
    icon: Mail,
    prop: props.email
  },
  {
    name: 'Status',
    icon: Clock,
    prop: props.status
  },
])
</script>
