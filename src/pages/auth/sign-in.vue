<template>
  <v-container
    class="fill-height pa-0 ma-0 d-flex flex-column flex-md-row flex-nowrap align-center"
    fluid
  >
    <v-container
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center blue-gradient"
      :style="{
        minHeight: mdAndUp ? '100vh' : '50vh',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
    >
      <!-- Logo mobile -->
      <AppLogo class="mt-12 mb-10 d-flex d-md-none flex-0-0" />

      <v-card
        class="rounded-xl pa-4"
        :class="mdAndUp ? 'position-relative' : 'position-absolute'"
        :elevation="smAndDown ? 5 : 0"
        :style="[
          mdAndUp
            ? { width: 'clamp(320px, 70%, 350px)' }
            : {
              width: '320px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
        ]"
      >
        <v-card-title
          class="text-h5 text-primary text-center font-weight-bold mt-2 mb-6"
        >
          Bem-vindo
        </v-card-title>

        <v-text-field
          class="mb-3"
          label="Usuário"
          rounded="lg"
          variant="outlined"
        />
        <v-text-field
          append-inner-icon="mdi-eye-off"
          class="mb-5"
          label="Senha"
          rounded="lg"
          type="password"
          variant="outlined"
        />

        <v-btn
          block
          class="darken-blue-gradient text-white"
          height="50px"
          rounded="lg"
        >
          Login
        </v-btn>
      </v-card>
    </v-container>

    <v-container
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center bg-white"
      :style="{
        minHeight: mdAndUp ? '100vh' : 'calc(50vh - 70px)',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
    >
      <!-- Logo desktop -->
      <AppLogo class="mt-10 d-none d-md-flex" />
    </v-container>
  </v-container>
</template>

<script setup>
  import { useDisplay } from 'vuetify';
  import AppLogo from '@/components/AppLogo.vue';

  const { mdAndUp, smAndDown } = useDisplay();
</script>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #4a8dde 0%, #0c4f9d 100%);
}
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
