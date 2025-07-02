<template>
  <v-container
    class="fluid fill-height pa-0 blue-gradient d-flex flex-column align-center"
  >
    <AppLogo class="mb-15" />
    <v-card width="320" elevation="5" class="rounded-xl class pa-4">
      <v-card-title
        class="text-h5 text-primary text-center font-weight-bold mt-2 mb-6"
        >Bem-vindo</v-card-title
      >
      <v-text-field
        type="email"
        label="Usuario"
        variant="outlined"
        class="mb-3"
        rounded="lg"
      ></v-text-field>
      <v-text-field
        label="Senha"
        type="password"
        variant="outlined"
        rounded="lg"
        class="mb-5"
        append-inner-icon="mdi-eye-off"
      ></v-text-field>
      <v-btn
        block
        variant=""
        rounded="lg"
        height="50px"
        class="darken-blue-gradient text-white"
        >Login</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
import AppLogo from "@/components/AppLogo.vue";
</script>

<style>
.blue-gradient {
  background-image: linear-gradient(
    180deg,
    #4a8dde 0%,
    #0c4f9d 50%,
    #ffffff 50%
  );
}
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
