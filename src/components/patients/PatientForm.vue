<script setup>
  import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useDataStore } from '@/stores/data'
  import { useSessionStore } from '@/stores/auth'
  import {
    dominantHands,
    emptyPatientForm,
    hasValidationErrors,
    patientFormFromRecord,
    todayISO,
    validatePatient,
  } from '@/utils/patient'
  import { formatCep, useCep } from '@/composables/useCep'
  import { applyServerFieldErrors } from '@/services/errors'
  import { registerPublicPatient } from '@/services/patients'
  import { Eye, EyeOff } from 'lucide-vue-next'

  const props = defineProps({ publicRegistration: Boolean })
  const emit = defineEmits(['registered'])
  const publicSubmitting = ref(false)
  const router = useRouter()
  const route = useRoute()
  const data = useDataStore()
  const session = useSessionStore()

  const form = reactive(emptyPatientForm())
  const errors = reactive({})
  const formError = ref('')
  const errorSummary = ref(null)
  const loading = ref(false)
  const loadError = ref('')
  const usernameEditable = ref(true)
  const showPassword = ref(false)
  let loadToken = 0

  const editing = computed(() => route.path.includes('edit-patient'))
  const patientId = computed(() => route.query.id ?? '')
  const busy = computed(() => props.publicRegistration ? publicSubmitting.value : data.patientSubmitting)
  const cancelTo = computed(() => editing.value && patientId.value
    ? { path: '/professional/patient-details', query: { id: patientId.value } }
    : '/professional/patients')
  const { loading: cepLoading, error: cepError } = useCep(form, { enabled: () => !loading.value })

  const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

  function formatCpf (value) {
    return String(value ?? '').replace(/\D/g, '').slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }

  function formatPhone (value) {
    const digits = String(value ?? '').replace(/\D/g, '').slice(0, 11)
    if (digits.length <= 2) return digits ? `(${digits}` : ''
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }

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
    Object.assign(form, patientFormFromRecord(patient), {
      cpf: formatCpf(patient.cpf),
      cep: formatCep(patient.cep),
      phone: formatPhone(patient.phone),
    })
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
    if (key === 'cep') form[key] = formatCep(value)
    else if (key === 'cpf') form[key] = formatCpf(value)
    else if (key === 'phone') form[key] = formatPhone(value)
    else form[key] = value ?? ''
    if (errors[key]) delete errors[key]
    formError.value = ''
  }

  function bind (key) {
    return {
      'modelValue': form[key],
      'errorMessages': errors[key],
      'disabled': busy.value,
      'onUpdate:modelValue': value => updateField(key, value),
    }
  }

  async function showError (message) {
    formError.value = message
    await nextTick()
    errorSummary.value?.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    errorSummary.value?.$el.focus()
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
    const validation = validatePatient(values, { editing: editing.value, contactRequired: props.publicRegistration })
    Object.assign(errors, validation)
    if (hasValidationErrors(validation)) {
      await showError('Revise os campos destacados.')
      return
    }
    if (editing.value && !patientId.value) {
      formError.value = 'Paciente não informado.'
      return
    }

    try {
      if (props.publicRegistration) {
        publicSubmitting.value = true
        await registerPublicPatient(session.request, values)
        emit('registered')
        return
      }
      const saved = await data.savePatient(values, { id: patientId.value, editing: editing.value })
      if (!saved) return
      session.notice = editing.value
        ? 'Paciente atualizado com sucesso.'
        : 'Paciente cadastrado com sucesso.'
      await router.push(editing.value
        ? { path: '/professional/patient-details', query: { id: patientId.value } }
        : '/professional/patients')
    } catch (failure) {
      const aliases = {
        dominantHand: 'dominant_hand',
        birth_date: 'birthDate',
        telefone: 'phone',
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
      await showError(serverErrors.non_field_errors
        || serverErrors.detail
        || failure.message
        || 'Não foi possível salvar o paciente.')
    } finally {
      publicSubmitting.value = false
    }
  }

  onMounted(load)
  watch([patientId, editing], load)
</script>

<template>
  <div v-if="editing && loading" class="d-flex flex-column align-center ga-3 py-12">
    <v-progress-circular aria-label="Carregando paciente" color="primary" indeterminate />
    <span class="text-body-2 text-muted">Carregando dados do paciente…</span>
  </div>

  <v-alert
    v-else-if="editing && loadError"
    role="alert"
    type="error"
  >
    {{ loadError }}
    <div class="d-flex ga-2 mt-3">
      <v-btn size="small" variant="outlined" @click="load">Tentar novamente</v-btn>
      <v-btn size="small" to="/professional/patients" variant="text">Voltar para pacientes</v-btn>
    </div>
  </v-alert>

  <v-form v-else class="patient-form" @submit.prevent="submit">
    <v-alert
      v-if="formError"
      ref="errorSummary"
      class="mb-4"
      role="alert"
      tabindex="-1"
      type="error"
    >{{ formError }}</v-alert>

    <v-card>
      <section class="form-section">
        <header>
          <h2>Acesso</h2>
          <p>{{ publicRegistration ? 'Você usará estes dados para entrar no sistema' : 'Dados que o paciente usa para entrar no sistema' }}</p>
        </header>
        <div class="form-grid">
          <v-text-field
            v-bind="bind('username')"
            autocomplete="username"
            class="span-2"
            :hint="editing && !usernameEditable ? 'O usuário não pode ser alterado neste cadastro' : 'Letras, números e @ . + - _'"
            label="Usuário"
            persistent-hint
            :readonly="editing && !usernameEditable"
          />
          <template v-if="!editing">
            <v-text-field
              v-bind="bind('password')"
              autocomplete="new-password"
              hint="Mínimo de 8 caracteres"
              :label="publicRegistration ? 'Senha' : 'Senha inicial'"
              persistent-hint
              :type="showPassword ? 'text' : 'password'"
            >
              <template #append-inner>
                <button
                  :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
                  class="reveal"
                  type="button"
                  @click="showPassword = !showPassword"
                ><component :is="showPassword ? EyeOff : Eye" :size="18" /></button>
              </template>
            </v-text-field>
            <v-text-field
              v-bind="bind('confirmation')"
              autocomplete="new-password"
              label="Confirmar senha"
              :type="showPassword ? 'text' : 'password'"
            />
          </template>
        </div>
      </section>

      <v-divider />

      <section class="form-section">
        <header>
          <h2>Dados pessoais</h2>
          <p>Identificação do paciente e mão dominante</p>
        </header>
        <div class="form-grid">
          <v-text-field v-bind="bind('name')" autocomplete="name" class="span-2" label="Nome completo" />
          <v-text-field v-bind="bind('email')" autocomplete="email" label="E-mail" type="email" />
          <v-text-field
            v-bind="bind('cpf')"
            inputmode="numeric"
            label="CPF"
            maxlength="14"
            placeholder="000.000.000-00"
          />
          <template v-if="publicRegistration">
            <v-text-field
              v-bind="bind('phone')"
              autocomplete="tel"
              inputmode="tel"
              label="Telefone"
              maxlength="15"
              placeholder="(00) 00000-0000"
              type="tel"
            />
            <v-text-field
              v-bind="bind('birthDate')"
              autocomplete="bday"
              label="Data de nascimento"
              :max="todayISO()"
              type="date"
            />
          </template>
          <div class="span-2">
            <p class="field-label">Mão dominante</p>
            <v-btn-toggle
              class="hand-toggle"
              :disabled="busy"
              divided
              :model-value="form.dominant_hand || undefined"
              variant="outlined"
              @update:model-value="updateField('dominant_hand', $event)"
            >
              <v-btn v-for="hand in dominantHands" :key="hand" :value="hand">{{ hand }}</v-btn>
            </v-btn-toggle>
            <p v-if="errors.dominant_hand" class="field-error" role="alert">{{ errors.dominant_hand }}</p>
          </div>
        </div>
      </section>

      <v-divider />

      <section class="form-section">
        <header>
          <h2>Endereço</h2>
          <p>Digite o CEP para preencher o endereço automaticamente</p>
        </header>
        <div class="form-grid form-grid--address">
          <v-text-field
            v-bind="bind('cep')"
            autocomplete="postal-code"
            :error-messages="[errors.cep, cepError].filter(Boolean)"
            inputmode="numeric"
            label="CEP"
            :loading="cepLoading"
            maxlength="9"
            placeholder="00000-000"
          />
          <v-text-field v-bind="bind('street')" autocomplete="address-line1" class="span-2" label="Logradouro" />
          <v-text-field v-bind="bind('number')" label="Número" />
          <v-text-field v-bind="bind('neighborhood')" class="span-2" label="Bairro" />
          <v-text-field v-bind="bind('city')" autocomplete="address-level2" class="span-2" label="Cidade" />
          <v-select
            v-bind="bind('state')"
            :items="states"
            label="UF"
            :model-value="form.state || null"
          />
        </div>
      </section>

      <v-divider />

      <div class="form-actions">
        <v-btn v-if="!publicRegistration" :disabled="busy" :to="cancelTo" variant="text">Cancelar</v-btn>
        <v-btn
          :block="publicRegistration"
          color="primary"
          :disabled="busy || loading"
          :loading="busy"
          size="large"
          type="submit"
        >{{ publicRegistration ? 'Concluir cadastro' : editing ? 'Salvar alterações' : 'Cadastrar paciente' }}</v-btn>
      </div>
    </v-card>
  </v-form>
</template>

<style scoped>
.form-section { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr); gap: 24px; padding: 24px; }
.form-section header h2 { font-size: 1rem; font-weight: 500; margin: 0 0 4px; }
.form-section header p { font-size: 0.875rem; color: var(--app-ink-muted); margin: 0; }
.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; row-gap: 4px; }
.form-grid--address { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.span-2 { grid-column: span 2; }
.form-grid--address .span-2 { grid-column: span 2; }
.hand-toggle { width: 100%; height: 48px !important; }
.hand-toggle :deep(.v-btn) { flex: 1 1 0; }
.field-label { font-size: 0.875rem; font-weight: 500; color: var(--app-ink-muted); margin: 0 0 8px; }
.field-error { font-size: 0.75rem; color: rgb(var(--v-theme-error)); margin: 4px 0 0 16px; }
.form-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 16px 24px; }
.reveal { display: grid; place-items: center; width: 32px; height: 32px; margin-right: -4px; border-radius: 8px; color: var(--app-ink-subtle); transition: color 160ms var(--app-ease); }
.reveal:hover { color: var(--app-ink); }
.reveal:focus-visible { outline: 2px solid var(--app-primary); outline-offset: 0; }

@media (max-width: 959px) {
  .form-section { grid-template-columns: minmax(0, 1fr); gap: 16px; padding: 20px 16px; }
  .form-grid, .form-grid--address { grid-template-columns: minmax(0, 1fr); }
  .span-2, .form-grid--address .span-2 { grid-column: auto; }
  .form-actions { padding: 16px; }
  .form-actions .v-btn { flex: 1 1 0; }
}
</style>
