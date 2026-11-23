<script setup>
  import { computed, reactive, ref } from 'vue'
  import { useSessionStore } from '@/stores/auth'
  import { applyServerFieldErrors } from '@/services/errors'
  import { hasErrors, validatePasswordChange } from '@/utils/password'

  const session = useSessionStore()
  const form = reactive({ current: '', password: '', confirmation: '' })
  const errors = reactive({})
  const formError = ref('')
  const success = ref('')
  const busy = ref(false)
  const showPasswords = ref(false)

  const canSubmit = computed(() => !busy.value && Boolean(form.current) && Boolean(form.password) && Boolean(form.confirmation))

  function clearErrors () {
    for (const key of Object.keys(errors)) delete errors[key]
  }

  function touch (key) {
    delete errors[key]
    formError.value = ''
    success.value = ''
  }

  async function submit () {
    if (busy.value) return
    formError.value = ''
    success.value = ''
    clearErrors()

    const validation = validatePasswordChange(form.current, form.password, form.confirmation)
    if (hasErrors(validation)) {
      Object.assign(errors, validation)
      formError.value = 'Revise os campos informados.'
      return
    }

    busy.value = true
    try {
      await session.changePassword(form.current, form.password, form.confirmation)
      form.current = ''
      form.password = ''
      form.confirmation = ''
      success.value = 'Senha alterada com sucesso.'
    } catch (failure) {
      const aliases = {
        currentPassword: 'current',
        current_password: 'current',
        current: 'current',
        old_password: 'current',
        newPassword: 'password',
        new_password: 'password',
        password: 'password',
        confirmation: 'confirmation',
        password_confirmation: 'confirmation',
        new_password_confirmation: 'confirmation',
        password_confirm: 'confirmation',
        new_password_confirm: 'confirmation',
      }
      const serverErrors = applyServerFieldErrors(failure.fields, aliases)
      for (const [key, message] of Object.entries(serverErrors)) {
        if (key in form) errors[key] = message
      }
      formError.value = serverErrors.non_field_errors
        || serverErrors.detail
        || failure.message
        || 'Não foi possível alterar a senha.'
    } finally {
      busy.value = false
    }
  }
</script>

<template>
  <v-card class="password-card">
    <v-form class="card-section" @submit.prevent="submit">
      <v-alert
        v-if="formError"
        class="mb-4"
        density="compact"
        role="alert"
        type="error"
      >{{ formError }}</v-alert>
      <v-alert
        v-if="success"
        class="mb-4"
        density="compact"
        role="status"
        type="success"
      >{{ success }}</v-alert>

      <v-text-field
        v-model="form.current"
        autocomplete="current-password"
        class="mb-2"
        :disabled="busy"
        :error-messages="errors.current"
        label="Senha atual"
        name="senha-atual"
        required
        :type="showPasswords ? 'text' : 'password'"
        @update:model-value="touch('current')"
      />
      <v-text-field
        v-model="form.password"
        autocomplete="new-password"
        class="mb-2"
        :disabled="busy"
        :error-messages="errors.password"
        hint="Mínimo de 8 caracteres"
        label="Nova senha"
        name="nova-senha"
        persistent-hint
        required
        :type="showPasswords ? 'text' : 'password'"
        @update:model-value="touch('password')"
      />
      <v-text-field
        v-model="form.confirmation"
        autocomplete="new-password"
        :disabled="busy"
        :error-messages="errors.confirmation"
        label="Confirmar nova senha"
        name="confirmar-senha"
        required
        :type="showPasswords ? 'text' : 'password'"
        @update:model-value="touch('confirmation')"
      />
      <v-checkbox
        v-model="showPasswords"
        density="compact"
        hide-details
        label="Mostrar senhas"
      />

      <div class="d-flex justify-end mt-4">
        <v-btn
          color="primary"
          :disabled="!canSubmit"
          :loading="busy"
          size="large"
          type="submit"
        >Alterar senha</v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<style scoped>
.password-card { max-width: 520px; }
</style>
