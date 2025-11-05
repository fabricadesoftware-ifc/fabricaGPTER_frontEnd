<template>
  <v-container class="pa-4">
    <!-- Seção 1 -->
    <v-list class="rounded-t-xl mb-4">
      <v-list-item
        class="border-b border-solid bg-grey-lighten-4 rounded-t-xl"
        @click="router.push(routes.info)"
      >
        <template #prepend>
          <Info class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Informações</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>

      <v-list-item
        class="bg-grey-lighten-4 rounded-b-xl"
        @click="router.push(routes.password)"
      >
        <template #prepend>
          <LockKeyhole class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Alterar senha</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>
    </v-list>

    <!-- Seção 2 -->
    <v-list class="rounded-xl mb-8">
      <v-list-item class="border-b border-solid bg-grey-lighten-4 py-0 rounded-t-xl">
        <template #prepend>
          <Moon class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Tema escuro</v-list-item-title>
        <template #append>
          <v-switch hide-details />
        </template>
      </v-list-item>

      <v-list-item
        class="border-b border-solid bg-grey-lighten-4"
        @click="router.push(routes.terms)"
      >
        <template #prepend>
          <LockKeyhole class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Termos de uso</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>

      <v-list-item
        class="bg-grey-lighten-4 rounded-b-xl"
        @click="router.push(routes.contact)"
      >
        <template #prepend>
          <Phone class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Contato</v-list-item-title>
        <template #append>
          <ChevronRight class="opacity-70" />
        </template>
      </v-list-item>
    </v-list>

    <!-- Sair -->
    <v-list>
      <v-list-item
        class="bg-grey-lighten-4 rounded-xl text-red"
        @click="router.push(routes.logout)"
      >
        <template #prepend>
          <LogOut class="opacity-70" />
        </template>
        <v-list-item-title class="pl-4">Sair</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { Info, LockKeyhole, ChevronRight, Moon, Phone, LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  routes: {
    type: Object,
    required: true,
    default: () => ({
      info: '',
      password: '',
      terms: '',
      contact: '',
      logout: '',
    }),
  },
})
</script>
