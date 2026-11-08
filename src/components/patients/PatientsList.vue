<script setup>
  import { computed, ref } from 'vue'
  import { Trash2 } from 'lucide-vue-next'
  import { Pencil } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { useRouter } from 'vue-router'

  const data = useDataStore()
  const router = useRouter()

  const pending = ref(null)
  const dialog = ref(false)
  const deleteError = ref('')
  const deleting = computed(() => data.deletingPatientId !== null)

  function askDelete (patient) {
    if (deleting.value) return
    pending.value = patient
    deleteError.value = ''
    dialog.value = true
  }

  async function confirmDelete () {
    if (!pending.value || deleting.value) return
    deleteError.value = ''
    try {
      await data.deletePatient(pending.value.id)
      dialog.value = false
      pending.value = null
    } catch (failure) {
      deleteError.value = failure.message || 'Não foi possível remover o paciente.'
    }
  }

  defineProps({
    patients: {
      type: Array,
      required: true,
    },
  })
</script>

<template>
  <v-list border="md" class="w-100 rounded-xl pa-0">
    <template v-for="(patient, i) in patients" :key="patient.id">
      <v-list-item link :title="patient.name || 'Paciente sem nome'" @click="router.push({ path: '/professional/patient-details', query: { id: patient.id } })">
        <template #append>
          <v-btn
            :aria-label="'Editar ' + (patient.name || 'paciente')"
            :disabled="deleting"
            icon
            variant="text"
            @click.stop="router.push({ path: '/professional/edit-patient', query: { id: patient.id } })"
          ><Pencil /></v-btn>
          <v-btn
            :aria-label="'Remover ' + (patient.name || 'paciente')"
            :disabled="deleting"
            icon
            variant="text"
            @click.stop="askDelete(patient)"
          ><Trash2 /></v-btn>
        </template>
      </v-list-item>
      <v-divider v-if="i < patients.length - 1" />
    </template>
  </v-list>

  <v-dialog v-model="dialog" max-width="440">
    <v-card class="pa-2">
      <v-card-title class="text-h6 font-weight-bold">Remover paciente</v-card-title>
      <v-card-text>
        <p class="mb-4">
          Deseja remover <strong>{{ pending?.name || 'este paciente' }}</strong>?
          Esta ação não pode ser desfeita.
        </p>
        <v-alert
          v-if="deleteError"
          role="alert"
          type="error"
          variant="tonal"
        >{{ deleteError }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="deleting" variant="text" @click="dialog = false">Cancelar</v-btn>
        <v-btn
          color="error"
          :disabled="deleting"
          :loading="deleting"
          variant="flat"
          @click="confirmDelete"
        >Remover</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
