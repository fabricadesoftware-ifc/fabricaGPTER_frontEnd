<template>
  <v-card
    :class="['mx-auto', {'pa-4' : smAndDown, 'pa-6': mdAndUp}]"
    max-width="550"
    :min-height="mdAndUp ? '349' : '300'"
    elevation="2"
    rounded="xl"
  >
    <v-card-title class="font-weight-medium pa-0" :class="{ 'text-h6 mb-3' : smAndDown, 'text-h5 mb-6': mdAndUp }">
      Informações do paciente
    </v-card-title>
    <v-divider length="100%" color="grey-darken-4"/>

    <v-card-text :class="['pa-0', {'mt-6': mdAndUp, 'mt-4': smAndDown}]">
      <div :class="['d-flex flex-column', {'ga-8' : mdAndUp, 'ga-4': smAndDown}]">
        <div v-for="info in infos" :key="info.prop" class="d-flex align-start ga-3">
          <div>
            <component :is="info.icon" :size="20" class="text-blue"/>
          </div>
          <div>
            <span class="font-weight-bold text-subtitle-1">{{ info.name }}:</span>
            <span :class="info.name === 'Status' ? 'ml-1 text-subtitle-1 bg-blue-lighten-4 text-blue-darken-4 rounded-xl px-2 py-1' : 'ml-1 text-subtitle-1'">{{ info.prop }}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
import {useDisplay} from "vuetify";
import {Clock, Mail, MapPinHouse} from "lucide-vue-next";

const {mdAndUp, smAndDown} = useDisplay()

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
