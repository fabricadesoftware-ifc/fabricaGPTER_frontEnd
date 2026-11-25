<script setup>
  import { ref, watch } from 'vue'
  import { Calendar, Clock, Hand, Pencil, User } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'

  // Test summary plus editable observations.
  const props = defineProps({
    test: { type: Object, required: true },
    editable: Boolean,
    // Hides fields already shown elsewhere (e.g. stat tiles on the result page).
    compact: Boolean,
  })

  const data = useDataStore()
  const editing = ref(false)
  const saving = ref(false)
  const draft = ref('')
  const errorMessage = ref('')

  async function saveNotes () {
    if (saving.value) return
    saving.value = true
    errorMessage.value = ''
    try {
      await data.updateTest(props.test.id, { observations: draft.value.trim() })
      editing.value = false
    } catch (error) {
      errorMessage.value = Object.values(error.fields || {}).flat().join(' ') || error.message
    } finally {
      saving.value = false
    }
  }

  function startEditing () {
    draft.value = props.test.observations || ''
    editing.value = true
  }

  watch(() => props.test.id, () => {
    editing.value = false
    errorMessage.value = ''
  })
</script>

<template>
  <v-card>
    <div class="card-header"><h2>Detalhes do teste</h2></div>
    <div class="card-section">
      <dl class="info-list">
        <div><dt><User :size="16" />Paciente</dt><dd>{{ test.name || 'Não informado' }}</dd></div>
        <div v-if="!compact"><dt><Clock :size="16" />Duração</dt><dd>{{ test.seconds ? `${test.seconds} segundos` : 'Não informada' }}</dd></div>
        <div v-if="!compact"><dt><Hand :size="16" />Mão testada</dt><dd>{{ test.arm || 'Não informada' }}</dd></div>
        <div><dt><Calendar :size="16" />Data</dt><dd>{{ test.date || 'Não informada' }}</dd></div>
      </dl>
    </div>
    <v-divider />
    <div class="card-section">
      <div class="d-flex align-center justify-space-between mb-2">
        <h3 class="notes-title">Observações</h3>
        <v-btn
          v-if="editable && !editing"
          size="small"
          variant="text"
          @click="startEditing"
        ><Pencil class="mr-1" :size="16" />Editar</v-btn>
      </div>
      <v-form v-if="editing" @submit.prevent="saveNotes">
        <v-textarea
          v-model="draft"
          auto-grow
          autofocus
          :disabled="saving"
          hide-details="auto"
          label="Observações (opcional)"
          rows="3"
        />
        <v-alert
          v-if="errorMessage"
          class="mt-2"
          density="compact"
          role="alert"
          type="error"
        >{{ errorMessage }}</v-alert>
        <div class="d-flex justify-end ga-2 mt-3">
          <v-btn :disabled="saving" variant="text" @click="editing = false">Cancelar</v-btn>
          <v-btn color="primary" :loading="saving" type="submit">Salvar</v-btn>
        </div>
      </v-form>
      <p v-else class="notes" :class="{ 'text-subtle': !test.observations }">
        {{ test.observations || 'Nenhuma observação registrada' }}
      </p>
    </div>
  </v-card>
</template>

<style scoped>
.notes-title { font-size: 0.875rem; font-weight: 500; margin: 0; }
.notes { white-space: pre-wrap; overflow-wrap: anywhere; margin: 0; font-size: 0.9375rem; }
</style>
