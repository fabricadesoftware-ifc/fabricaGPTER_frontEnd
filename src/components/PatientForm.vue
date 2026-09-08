<script setup>
  import { ref } from 'vue';
  import ConfirmButton from './ConfirmButton.vue';
  import CancelButton from './CancelButton.vue';


  const router = useRouter();

  const fields = ref([
    {
      label: 'Nome completo',
      type: 'name',
    },
    {
      label: 'Email',
      type: 'email',
    },
    {
      label: 'CPF',
      type: 'number',
    },
    {
      label: 'Senha',
      type: 'password',
    },
    {
      label: 'Confirmar senha',
      type: 'password',
    },
    {
      label: 'Logradouro',
      type: 'text',
    },
  ]);

  const states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];
</script>

<template>
  <v-form
    class="pa-2 rounded-xl"
  >
    <v-text-field
      v-for="field in fields"
      :key="field.label"
      density="comfortable"
      :label="field.label"
      required
      rounded="lg"
      :type="field.type"
      variant="outlined"
    />

    <v-row class="ma-0">
      <v-col class="pa-0" cols="8">
        <v-text-field
          density="comfortable"
          label="Cidade"
          required
          rounded="lg"
          variant="outlined"
        />
      </v-col>
      <v-col class="pr-0 py-0">
        <v-select
          density="comfortable"
          :items="states"
          label="UF"
          required
          rounded="lg"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col class="pa-0" cols="8">
        <v-text-field
          density="comfortable"
          label="Bairro"
          required
          rounded="lg"
          variant="outlined"
        />
      </v-col>
      <v-col class="pr-0 py-0">
        <v-text-field
          density="comfortable"
          label="Número"
          required
          rounded="lg"
          type="number"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col class="pa-0 py-0" cols="6">
        <CancelButton text="Cancelar" @click="router.back()" />
      </v-col>
      <v-col class="pr-0 py-0" cols="6">
        <ConfirmButton text="Salvar" />
      </v-col>
    </v-row>
  </v-form>
</template>
