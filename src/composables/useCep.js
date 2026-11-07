import { ref, watch } from 'vue'

export function formatCep (value) {
  return String(value ?? '').replace(/\D/g, '').slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2')
}

export function useCep (form) {
  const loading = ref(false)
  const error = ref('')

  watch(() => String(form.cep ?? '').replace(/\D/g, ''), async (cep, previous, onCleanup) => {
    error.value = ''
    loading.value = false
    if (cep.length !== 8) return

    const controller = new AbortController()
    let active = true
    const timeout = setTimeout(() => controller.abort(), 10000)
    onCleanup(() => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    })
    const initial = { street: form.street, neighborhood: form.neighborhood, city: form.city, state: form.state }
    loading.value = true
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal: controller.signal })
      if (!response.ok) throw new Error('Falha na consulta')
      const address = await response.json()
      if (!active) return
      if (address.erro) {
        error.value = 'CEP não encontrado. Confira o CEP ou preencha o endereço manualmente.'
        return
      }
      const values = { street: address.logradouro, neighborhood: address.bairro, city: address.localidade, state: address.uf }
      for (const [key, value] of Object.entries(values)) {
        if (form[key] === initial[key]) form[key] = value || ''
      }
    } catch {
      if (active) error.value = 'Não foi possível consultar o CEP. Tente novamente ou preencha o endereço manualmente.'
    } finally {
      clearTimeout(timeout)
      if (active) loading.value = false
    }
  }, { flush: 'sync' })

  return { loading, error }
}
