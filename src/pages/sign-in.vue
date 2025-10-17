<template>
  <v-container
    fluid
    class="fill-height pa-0 ma-0 d-flex flex-column flex-md-row flex-nowrap align-center"
  >
    <v-container
      :style="{
        minHeight: mdAndUp ? '100vh' : '50vh',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center blue-gradient"
    >
      <!-- Logo mobile -->
      <AppLogo class="mt-12 mb-10 d-flex d-md-none flex-0-0" />

      <v-card
        class="rounded-xl pa-4"
        :class="mdAndUp ? 'position-relative' : 'position-absolute'"
        :elevation="smAndDown ? 5 : 0"
        :style="[
          mdAndUp
            ? { width: 'clamp(320px, 70%, 400px)' }
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
          label="Usuário"
          variant="outlined"
          class="mb-3"
          rounded="lg"
        />
        <v-text-field
          label="Senha"
          type="password"
          variant="outlined"
          rounded="lg"
          class="mb-5"
          append-inner-icon="mdi-eye-off"
        />

        <v-btn
          block
          rounded="lg"
          height="50px"
          class="darken-blue-gradient text-white"
        >
          Login
        </v-btn>
      </v-card>
    </v-container>

    <v-container
      :style="{
        minHeight: mdAndUp ? '100vh' : 'calc(50vh - 70px)',
        maxWidth: mdAndUp ? '50vw' : '100%',
      }"
      class="ma-0 pa-0 d-flex align-start align-md-center justify-center bg-white"
    >
      <!-- Logo desktop -->
      <AppLogo class="mt-10 d-none d-md-flex" />
    </v-container>
  </v-container>
</template>

<script setup>
import { useDisplay } from "vuetify";
import AppLogo from "@/components/AppLogo.vue";

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
