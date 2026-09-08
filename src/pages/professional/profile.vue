<template>
  <!-- MOBILE -->
  <template v-if="smAndDown">
    <template v-if="route.name === '/professional/profile'">
      <v-container class="blue-gradient rounded-b-xl">
        <div
          class="d-flex justify-center align-center text-center"
          :class="smAndDown ? 'flex-row' : 'flex-column'"
          :style="{
            minHeight: mdAndUp ? '10vh' : '15vh',
            maxWidth: mdAndUp ? '30vw' : '100vw',
          }"
        >
          <v-col
            class="d-flex justify-center align-center"
            :cols="smAndDown ? 3 : 5"
          >
            <v-img
              aspect-ratio="16/9"
              cover
              src="@/assets/foto-profissional.png"
              :width="300"
            />
          </v-col>
          <v-col class="d-flex justify-center align-center" cols="3">
            <p class="text-h5 font-weight-bold text-white"> Daniel </p>
          </v-col>
        </div>
      </v-container>

      <!-- Configurações -->

      <v-container>
        <v-list class="rounded-xl mb-4">
          <v-list-item
            v-for="setting in settings.slice(0, 2)"
            :key="setting.name"
            class="bg-grey-lighten-3 hover:bg-red-4 transition-colors duration-200 cursor-pointer"
            :to="setting.link"
          >
            <template #prepend>
              <component :is="setting.icon" class="mr-3 opacity-70" color="black" />
            </template>
            <v-list-item-title>{{ setting.name }}</v-list-item-title>
            <template #append>
              <ChevronRight class="opacity-70" color="black" />
            </template>
          </v-list-item>
        </v-list>
        <v-list class="rounded-xl mb-4">
          <v-list-item
            v-for="setting in settings.slice(2, 4)"
            :key="setting.name"
            class="bg-grey-lighten-3"
            :to="setting.link"
          >
            <template #prepend>
              <component :is="setting.icon" class="mr-3 opacity-70" color="black" />
            </template>
            <v-list-item-title>{{ setting.name }}</v-list-item-title>
            <template #append>
              <ChevronRight class="opacity-70" color="black" />
            </template>
          </v-list-item>
        </v-list>
        <v-list>
          <v-list-item
            v-for="setting in settings.slice(4)"
            :key="setting.name"
            class="bg-grey-lighten-3 text-red rounded-xl"
            :to="setting.link"
          >
            <template #prepend>
              <component :is="setting.icon" class="mr-3 opacity-70" color="red" />
            </template>
            <v-list-item-title>{{ setting.name }}</v-list-item-title>
            <template #append>
              <ChevronRight class="opacity-70" color="red" />
            </template>
          </v-list-item>
        </v-list>
      </v-container>
    </template>

    <router-view v-else />
  </template>

  <!-- DESKTOP -->
  <v-layout v-else>
    <Sidebar :settings="settings" />
    <v-main style="height: 92.5vh"><router-view /></v-main>
  </v-layout>
</template>

<script setup>
  import { onMounted } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useDisplay } from 'vuetify';
  import {
    ChevronRight,
    Info,
    LockKeyhole,
    LogOut,
    Phone,
  } from 'lucide-vue-next';

  const route = useRoute();
  const router = useRouter();
  const { smAndDown, mdAndUp } = useDisplay();


  const settings = ref([
    {
      name: 'Informações',
      icon: Info,
      link: '/professional/profile/infos',
    },
    {
      name: 'Alterar senha',
      icon: LockKeyhole,
      link: '/professional/profile/change-password',
    },
    {
      name: 'Termos de Uso',
      icon: Info,
      link: '/professional/profile/terms-of-use',
    },
    {
      name: 'Contato',
      icon: Phone,
      link: '/professional/profile/contact',
    },
    {
      name: 'Sair',
      icon: LogOut,
      link: '/auth/sign-in',
    },
  ]);

  // Verifica o tamanho da tela e redireciona para a página de informações se for desktop
  onMounted(() => {
    console.log(route.name);
    if (route.name === '/professional/profile' && !smAndDown.value) {
      router.push('/professional/profile/infos');
    }
  })
</script>
<style scoped>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
