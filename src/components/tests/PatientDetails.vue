<script setup>
  import { Calendar, Check, Clock, Stethoscope, User } from 'lucide-vue-next';
  import { useDataStore } from '@/stores/data'
  import { useRouter } from 'vue-router'
  const data = useDataStore()
  const router = useRouter()
  const editing = ref(false)
  const saving = ref(false)
  const draft = ref('')
  const errorMessage = ref('')
  async function saveNotes () {
    if (saving.value) return
    saving.value = true
    errorMessage.value = ''
    try {
      await data.updateTest(props.patient.id, { observations: draft.value.trim() })
      editing.value = false
    } catch (error) {
      errorMessage.value = Object.values(error.fields || {}).flat().join(' ') || error.message
    } finally {
      saving.value = false
    }
  }
  import { ref, watch } from 'vue'
  async function validate () {
    try { await data.updateTest(props.patient.id, 'validated'); alert('Teste validado.') } catch (error) { alert(error.message) }
  }
  function remake () { router.push({ path: '/professional/new-test', query: { patientId: props.patient.patientId, source: props.patient.id } }) }

  const props = defineProps({
    patient: {
      type: Object,
      required: true,
    },
    editable: Boolean,
    buttons: {
      type: Boolean,
      default: false,
    },
  });



  watch(() => props.patient.id, () => { editing.value = false; errorMessage.value = '' })

</script>
<template>
  <section class="w-100">
  <v-card class="rounded-lg elevation-2 pa-5">
    <v-card-title class="text-h6 font-weight-bold mb-4 pa-0">
      Detalhes do teste
    </v-card-title>
    <v-divider class="mb-4" length="100%" />

    <div>
      <dl class="details">
        <div v-for="field in [
          [User, 'Paciente', patient.name],
          [Stethoscope, 'Profissional', patient.profissional || patient.professional_name],
          [Clock, 'Tipo de teste', patient.type],
          [Calendar, 'Data', patient.date],
        ]" :key="field[1]">
          <component :is="field[0]" aria-hidden="true" />
          <dt>{{ field[1] }}</dt><dd>{{ field[2] ?? 'Não informado' }}</dd>
        </div>
      </dl>
      <details class="mt-3">
        <summary>Observações e braço testado</summary>
        <p class="mt-2">{{ patient.arm || 'Braço não informado' }}</p>
        <p style="white-space: pre-wrap">{{ patient.observations || 'Nenhuma observação registrada.' }}</p>
      <div v-if="buttons || editable">
        <v-btn v-if="!editing" variant="text" @click="draft = patient.observations || ''; editing = true">Editar observações</v-btn>
        <v-form v-else @submit.prevent="saveNotes">
          <v-textarea v-model="draft" auto-grow :disabled="saving" label="Observações (opcional)" variant="outlined" />
          <v-alert v-if="errorMessage" role="alert" type="error">{{ errorMessage }}</v-alert>
          <v-btn :loading="saving" type="submit">Salvar</v-btn>
          <v-btn :disabled="saving" variant="text" @click="editing = false">Cancelar</v-btn>
        </v-form>
      </div>
      </details>
    </div>
  </v-card>
  <div v-if="buttons" class="actions mt-3">
    <v-btn color="primary" :disabled="patient.status === 'validated'" @click="validate"><Check :size="16" class="mr-2" />Validar teste</v-btn>
    <v-btn variant="outlined" @click="remake">Refazer teste</v-btn>
  </div>
  </section>
</template>

<style scoped>
.details { display: grid; gap: 1.5rem; }
.details > div { display: grid; grid-template-columns: 22px 1fr; column-gap: .75rem; }
.details svg { grid-row: span 2; width: 20px; color: #005bbb; }
.details dt { font-weight: 600; }
.details dd { grid-column: 2; }
summary { cursor: pointer; }
.actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.actions .v-btn { text-transform: none; letter-spacing: normal; }
</style>
