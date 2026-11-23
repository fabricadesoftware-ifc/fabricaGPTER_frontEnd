<script setup>
  import { computed } from 'vue'
  import { Calendar, Fingerprint, Hand, MapPinHouse, Phone } from 'lucide-vue-next'
  import { formatDateBR } from '@/utils/date'

  const props = defineProps({
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    dominantHand: { type: String, default: '' },
    cpf: { type: String, default: '' },
    birthDate: { type: String, default: '' },
  })

  function formatCpf (value) {
    const digits = String(value || '').replace(/\D/g, '')
    return digits.length === 11 ? digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : value
  }

  const infos = computed(() => [
    { name: 'Mão dominante', icon: Hand, value: props.dominantHand },
    { name: 'CPF', icon: Fingerprint, value: formatCpf(props.cpf) },
    { name: 'Telefone', icon: Phone, value: props.phone },
    { name: 'Data de nascimento', icon: Calendar, value: props.birthDate ? formatDateBR(props.birthDate) : '' },
    { name: 'Endereço', icon: MapPinHouse, value: props.address, wide: true },
  ])
</script>

<template>
  <v-card>
    <div class="card-header"><h2>Dados do paciente</h2></div>
    <div class="card-section">
      <dl class="info-list">
        <div v-for="info in infos" :key="info.name" :style="info.wide ? 'grid-column: 1 / -1' : ''">
          <dt><component :is="info.icon" aria-hidden="true" :size="14" />{{ info.name }}</dt>
          <dd :class="{ 'text-subtle': !info.value }">{{ info.value || 'Não informado' }}</dd>
        </div>
      </dl>
    </div>
  </v-card>
</template>
