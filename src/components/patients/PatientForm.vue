<script setup>
  import { reactive, ref, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { validatePatient } from '@/utils/patient'
  import { formatCep, useCep } from '@/composables/useCep'
  import ConfirmButton from '@/components/ui/ConfirmButton.vue';
  import CancelButton from '@/components/ui/CancelButton.vue';


  const router = useRouter();

  const route = useRoute()
  const data = useDataStore()
  const busy = ref(false)
  const editing = computed(() => route.path.includes('edit-patient'))
  const form = reactive({})
  watch(() => route.query.id, () => {
    const patient = editing.value ? data.patients.find(item => item.id === Number(route.query.id)) : null
    Object.assign(form, { name: '', email: '', cpf: '', cep: '', street: '', city: '', state: '', neighborhood: '', number: '', ...patient, password: '', confirmation: '' })
  }, { immediate: true })
  const { loading: cepLoading, error: cepError } = useCep(form)
  async function submit () {
    if (busy.value) return
    const values = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === 'string' && !['password', 'confirmation'].includes(key) ? value.trim() : value]))
    const error = validatePatient(values, editing.value)
    if (error) { alert(error); return }
    busy.value = true
    try {
      await data.savePatient(values, editing.value ? Number(route.query.id) : undefined)
      await router.push('/professional/patients')
    } catch (error) { alert(error.message) } finally { busy.value = false }
  }
  const fields = ref([
    {
      label: 'Nome completo', key: 'name',
      type: 'text',
    },
    {
      label: 'Email', key: 'email',
      type: 'email',
    },
    {
      label: 'CPF', key: 'cpf',
      type: 'text',
    },
    {
      label: 'Senha', key: 'password',
      type: 'password',
    },
    {
      label: 'Confirmar senha', key: 'confirmation',
      type: 'password',
    },
    {
      label: 'CEP', key: 'cep',
      type: 'text',
      autocomplete: 'postal-code',
      maxlength: 9,
    },
    {
      label: 'Logradouro', key: 'street',
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
    @submit.prevent="submit"
  >
    <v-text-field
      v-for="field in fields"
      :key="field.label"
      :model-value="form[field.key]"
      :autocomplete="field.type === 'password' ? 'new-password' : field.autocomplete"
      density="comfortable"
      :error-messages="field.key === 'cep' ? cepError : undefined"
      :hint="field.key === 'cep' ? 'Digite o CEP para preencher o endereço automaticamente.' : undefined"
      :inputmode="['cpf', 'cep'].includes(field.key) ? 'numeric' : undefined"
      :label="field.label"
      :loading="field.key === 'cep' && cepLoading"
      :maxlength="field.maxlength"
      :required="field.key !== 'cep' && (field.type !== 'password' || !editing)"
      rounded="lg"
      :type="field.type"
      variant="outlined"
      @update:model-value="form[field.key] = field.key === 'cep' ? formatCep($event) : $event"
    />

    <v-row class="ma-0">
      <v-col class="pa-0" cols="8">
        <v-text-field
          v-model="form.city"
          density="comfortable"
          label="Cidade"
          required
          rounded="lg"
          variant="outlined"
        />
      </v-col>
      <v-col class="pr-0 py-0">
        <v-select
          v-model="form.state"
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
          v-model="form.neighborhood"
          density="comfortable"
          label="Bairro"
          required
          rounded="lg"
          variant="outlined"
        />
      </v-col>
      <v-col class="pr-0 py-0">
        <v-text-field
          v-model="form.number"
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
        <CancelButton text="Cancelar" type="button" @click="router.back()" />
      </v-col>
      <v-col class="pr-0 py-0" cols="6">
        <ConfirmButton :loading="busy" text="Salvar" type="submit" />
      </v-col>
    </v-row>
  </v-form>
</template>
