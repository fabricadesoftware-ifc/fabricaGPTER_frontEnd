import { ref } from 'vue'

export function useMeasurementSave (testId, updateTest, onSaved) {
  const saving = ref(false)
  const error = ref('')
  let pending

  async function save () {
    if (!pending || saving.value) return
    saving.value = true
    error.value = ''
    try {
      await updateTest(testId, pending)
    } catch (failure) {
      error.value = failure.message || 'Não foi possível salvar as medições.'
      return
    } finally {
      saving.value = false
    }
    pending = undefined
    onSaved(testId)
  }

  function finish (samples) {
    if (pending || !samples.length) return
    pending = { status: 'finished', measurements: samples.slice() }
    return save()
  }

  return { saving, error, finish, retry: save }
}
