import { ref } from 'vue'

// Saves one collected series and keeps it for retries until the API accepts it.
export function useMeasurementSave (updateTest, onSaved) {
  const saving = ref(false)
  const error = ref('')
  let pending

  async function save () {
    if (!pending || saving.value) return
    const { id, changes } = pending
    saving.value = true
    error.value = ''
    try {
      await updateTest(id, changes)
    } catch (failure) {
      error.value = failure.message || 'Não foi possível salvar as medições.'
      return
    } finally {
      saving.value = false
    }
    pending = undefined
    onSaved(id)
  }

  function finish (id, samples) {
    if (pending || !samples.length) return
    pending = { id, changes: { status: 'finished', measurements: samples.slice() } }
    return save()
  }

  return { saving, error, finish, retry: save }
}
