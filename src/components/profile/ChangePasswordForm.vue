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

  const canSubmit = computed(() => !busy.value && Boolean(form.current) && Boolean(form.password) && Boolean(form.confirmation))

  function clearErrors () {
    for (const key of Object.keys(errors)) delete errors[key]
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
  <v-form
    class="w-100 pa-4 rounded-xl mt-4"
    @submit.prevent="submit"
  >
    <v-alert
      v-if="formError"
      class="mb-4"
      role="alert"
      type="error"
      variant="tonal"
    >{{ formError }}</v-alert>
    <v-alert
      v-if="success"
      class="mb-4"
      role="status"
      type="success"
      variant="tonal"
    >{{ success }}</v-alert>

    <span class="text-subtitle-2 font-weight-light">Senha atual</span>
    <v-text-field
      v-model="form.current"
      aria-label="Senha atual"
      autocomplete="current-password"
      class="mt-2"
      :disabled="busy"
      :error-messages="errors.current"
      name="senha-atual"
      required
      rounded="lg"
      type="password"
      variant="outlined"
      @update:model-value="delete errors.current; formError = ''; success = ''"
    />

    <span class="text-subtitle-2 font-weight-light">Nova senha</span>
    <v-text-field
      v-model="form.password"
      aria-label="Nova senha"
      autocomplete="new-password"
      class="mt-2"
      :disabled="busy"
      :error-messages="errors.password"
      name="nova-senha"
      required
      rounded="lg"
      type="password"
      variant="outlined"
      @update:model-value="delete errors.password; formError = ''; success = ''"
    />

    <span class="text-subtitle-2 font-weight-light">Confirmar nova senha</span>
    <v-text-field
      v-model="form.confirmation"
      aria-label="Confirmar nova senha"
      autocomplete="new-password"
      class="mt-2"
      :disabled="busy"
      :error-messages="errors.confirmation"
      name="confirmar-senha"
      required
      rounded="lg"
      type="password"
      variant="outlined"
      @update:model-value="delete errors.confirmation; formError = ''; success = ''"
    />

    <v-btn
      class="darken-blue-gradient text-white w-100 rounded-xl text-none text-subtitle-1"
      :disabled="!canSubmit"
      height="50"
      :loading="busy"
      type="submit"
    >Alterar senha
    </v-btn>
  </v-form>
</template>

<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
