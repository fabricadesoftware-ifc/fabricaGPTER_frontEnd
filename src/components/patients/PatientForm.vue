<script setup>
  import { computed, onMounted, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import {
    emptyPatientForm,
    hasValidationErrors,
    patientFormFromRecord,
    validatePatient,
  } from '@/utils/patient'
  import { formatCep, useCep } from '@/composables/useCep'
  import { applyServerFieldErrors } from '@/services/errors'
  import ConfirmButton from '@/components/ui/ConfirmButton.vue'
  import CancelButton from '@/components/ui/CancelButton.vue'

  const router = useRouter()
  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()

  const form = reactive(emptyPatientForm())
  const errors = reactive({})
  const formError = ref('')
  const loading = ref(false)
  const loadError = ref('')
  const usernameEditable = ref(true)
  let loadToken = 0

  const editing = computed(() => route.path.includes('edit-patient'))
  const patientId = computed(() => route.query.id ?? '')
  const busy = computed(() => data.patientSubmitting)
  const { loading: cepLoading, error: cepError } = useCep(form, { enabled: () => !loading.value })

  function clearErrors () {
    for (const key of Object.keys(errors)) delete errors[key]
  }

  function resetForm () {
    Object.assign(form, emptyPatientForm())
    clearErrors()
    formError.value = ''
    loadError.value = ''
    usernameEditable.value = true
  }

  function applyPatient (patient) {
    Object.assign(form, patientFormFromRecord(patient))
    usernameEditable.value = patient.usernameEditable !== false
  }

  async function load () {
    resetForm()
    if (!editing.value) {
      loading.value = false
      return
    }
    if (!patientId.value) {
      loadError.value = 'Paciente não informado.'
      return
    }

    const token = ++loadToken
    loading.value = true
    try {
      const patient = await data.loadPatient(patientId.value, { force: true })
      if (token !== loadToken) return
      if (!patient) {
        loadError.value = data.patientError || 'Não foi possível carregar o paciente.'
        return
      }
      applyPatient(patient)
    } finally {
      if (token === loadToken) loading.value = false
    }
  }

  function updateField (key, value) {
    form[key] = key === 'cep' ? formatCep(value) : value
    if (errors[key]) delete errors[key]
    formError.value = ''
  }

  async function submit () {
    if (busy.value || loading.value || loadError.value) return
    clearErrors()
    formError.value = ''

    const values = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [
        key,
        typeof value === 'string' && !['password', 'confirmation'].includes(key) ? value.trim() : value,
      ]),
    )
    const validation = validatePatient(values, { editing: editing.value })
    Object.assign(errors, validation)
    if (hasValidationErrors(validation)) {
      formError.value = 'Revise os campos informados.'
      return
    }
    if (editing.value && !patientId.value) {
      formError.value = 'Paciente não informado.'
      return
    }

    try {
      const saved = await data.savePatient(values, { id: patientId.value, editing: editing.value })
      if (!saved) return
      session.notice = editing.value
        ? 'Paciente atualizado com sucesso.'
        : 'Paciente cadastrado com sucesso.'
      await router.push('/professional/patients')
    } catch (failure) {
      const aliases = {
        zip_code: 'cep',
        postal_code: 'cep',
        address: 'street',
        logradouro: 'street',
        bairro: 'neighborhood',
        localidade: 'city',
        uf: 'state',
        numero: 'number',
        password_confirm: 'confirmation',
        password_confirmation: 'confirmation',
        new_password: 'password',
        user: 'username',
      }
      const serverErrors = applyServerFieldErrors(failure.fields, aliases)
      for (const [key, message] of Object.entries(serverErrors)) {
        if (key in form) errors[key] = message
      }
      formError.value = serverErrors.non_field_errors
        || serverErrors.detail
        || failure.message
        || 'Não foi possível salvar o paciente.'
    }
  }

  const fields = ref([
    {
      label: 'Usuário', key: 'username',
      type: 'text', autocomplete: 'username',
    },
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
  ])

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
  ]

  function labelFor (field) {
    if (field.key === 'password') return editing.value ? 'Nova senha (opcional)' : 'Senha inicial'
    if (field.key === 'confirmation') return editing.value ? 'Confirmar nova senha' : 'Confirmar senha'
    return field.label
  }

  function isUsernameReadonly (field) {
    return field.key === 'username' && editing.value && !usernameEditable.value
  }

  function hintFor (field) {
    if (field.key === 'cep') return 'Digite o CEP para preencher o endereço automaticamente.'
    if (field.key === 'username' && isUsernameReadonly(field)) return 'O usuário não pode ser alterado neste cadastro.'
    return undefined
  }

  onMounted(load)
  watch([patientId, editing], load)
</script>

<template>
  <div v-if="editing && loading" class="d-flex flex-column align-center ga-3 py-8">
    <v-progress-circular aria-label="Carregando paciente" indeterminate />
    <span class="text-body-2 text-grey-darken-1">Carregando dados do paciente...</span>
  </div>

  <v-alert
    v-else-if="editing && loadError"
    class="mb-4"
    role="alert"
    type="error"
    variant="tonal"
  >
    <div class="d-flex flex-column ga-3">
      <span>{{ loadError }}</span>
      <div class="d-flex ga-2">
        <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
        <v-btn size="small" variant="text" @click="router.push('/professional/patients')">Voltar para pacientes</v-btn>
      </div>
    </div>
  </v-alert>

  <v-form
    v-else
    class="pa-2 rounded-xl"
    @submit.prevent="submit"
  >
    <v-alert
      v-if="formError"
      class="mb-4"
      role="alert"
      type="error"
      variant="tonal"
    >{{ formError }}</v-alert>

    <v-text-field
      v-for="field in fields"
      :key="field.key"
      :autocomplete="field.type === 'password' ? 'new-password' : field.autocomplete"
      density="comfortable"
      :disabled="busy"
      :error-messages="field.key === 'cep' ? [errors.cep, cepError].filter(Boolean) : errors[field.key]"
      :hint="hintFor(field)"
      :inputmode="['cpf', 'cep'].includes(field.key) ? 'numeric' : undefined"
      :label="labelFor(field)"
      :loading="field.key === 'cep' && cepLoading"
      :maxlength="field.maxlength"
      :model-value="form[field.key]"
      :persistent-hint="Boolean(hintFor(field))"
      :readonly="isUsernameReadonly(field)"
      :required="field.key !== 'cep' && (field.type !== 'password' || !editing)"
      rounded="lg"
      :type="field.type"
      variant="outlined"
      @update:model-value="updateField(field.key, $event)"
    />

    <v-row class="ma-0">
      <v-col class="pa-0" cols="8">
        <v-text-field
          v-model="form.city"
          density="comfortable"
          :disabled="busy"
          :error-messages="errors.city"
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
          :disabled="busy"
          :error-messages="errors.state"
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
          :disabled="busy"
          :error-messages="errors.neighborhood"
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
          :disabled="busy"
          :error-messages="errors.number"
          label="Número"
          required
          rounded="lg"
          type="text"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-row class="ma-0">
      <v-col class="pa-0 py-0" cols="6">
        <CancelButton text="Cancelar" type="button" @click="router.back()" />
      </v-col>
      <v-col class="pr-0 py-0" cols="6">
        <ConfirmButton :disabled="busy || loading" :loading="busy" text="Salvar" type="submit" />
      </v-col>
    </v-row>
  </v-form>
</template>
