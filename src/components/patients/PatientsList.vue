<script setup>
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ChevronRight, EllipsisVertical, Pencil, Play, UserX } from 'lucide-vue-next'
  import { useDataStore } from '@/stores/data'
  import { isInactivePatient } from '@/utils/patient'
  import ProfileAvatar from '@/components/profile/ProfileAvatar.vue'
  import StatusChip from '@/components/ui/StatusChip.vue'

  defineProps({
    patients: {
      type: Array,
      required: true,
    },
  })

  const data = useDataStore()
  const router = useRouter()

  const pending = ref(null)
  const dialog = ref(false)
  const deactivateError = ref('')
  const deactivating = computed(() => data.deletingPatientId !== null)

  function open (patient) {
    router.push({ path: '/professional/patient-details', query: { id: patient.id } })
  }

  function askDeactivate (patient) {
    if (deactivating.value) return
    pending.value = patient
    deactivateError.value = ''
    dialog.value = true
  }

  async function confirmDeactivate () {
    if (!pending.value || deactivating.value) return
    deactivateError.value = ''
    try {
      await data.deletePatient(pending.value.id)
      dialog.value = false
      pending.value = null
    } catch (failure) {
      deactivateError.value = failure.message || 'Não foi possível desativar o paciente'
    }
  }
</script>

<template>
  <ul class="patients">
    <li v-for="patient in patients" :key="patient.id">
      <div
        class="list-row patient-row"
        :class="{ 'patient-row--inactive': isInactivePatient(patient) }"
        role="link"
        tabindex="0"
        @click="open(patient)"
        @keydown.enter="open(patient)"
      >
        <ProfileAvatar :name="patient.name" :photo="patient.photo" :size="40" />
        <div class="patient-row__main">
          <span class="patient-row__name">{{ patient.name || 'Paciente sem nome' }}</span>
          <span class="patient-row__meta">{{ patient.email || patient.username || 'Sem e-mail' }}</span>
        </div>
        <StatusChip v-if="isInactivePatient(patient)" kind="patient" :status="patient.status" />
        <v-menu location="bottom end">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :aria-label="'Ações para ' + (patient.name || 'paciente')"
              :disabled="deactivating"
              icon
              size="small"
              variant="text"
              @click.stop
              @keydown.enter.stop
            ><EllipsisVertical :size="18" /></v-btn>
          </template>
          <v-list min-width="200">
            <v-list-item
              v-if="!isInactivePatient(patient)"
              :to="{ path: '/professional/new-test', query: { patientId: patient.id } }"
            >
              <template #prepend><Play class="mr-3" :size="16" /></template>
              <v-list-item-title>Iniciar teste</v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ path: '/professional/edit-patient', query: { id: patient.id } }">
              <template #prepend><Pencil class="mr-3" :size="16" /></template>
              <v-list-item-title>Editar cadastro</v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="!isInactivePatient(patient)"
              base-color="error"
              @click="askDeactivate(patient)"
            >
              <template #prepend><UserX class="mr-3" :size="16" /></template>
              <v-list-item-title>Desativar</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <ChevronRight class="patient-row__chevron" :size="18" />
      </div>
    </li>
  </ul>

  <v-dialog v-model="dialog" max-width="440">
    <v-card class="pa-2">
      <v-card-title class="text-h6">Desativar paciente</v-card-title>
      <v-card-text>
        <p class="mb-4">
          Deseja desativar <strong>{{ pending?.name || 'este paciente' }}</strong>?
          O paciente perderá o acesso ao sistema, mas o cadastro e as avaliações serão mantidos.
        </p>
        <v-alert v-if="deactivateError" role="alert" type="error">{{ deactivateError }}</v-alert>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn :disabled="deactivating" variant="text" @click="dialog = false">Cancelar</v-btn>
        <v-btn
          color="error"
          :disabled="deactivating"
          :loading="deactivating"
          variant="flat"
          @click="confirmDeactivate"
        >Desativar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.patients { list-style: none; margin: 0; padding: 0; }
.patients li + li { border-top: 1px solid var(--app-border); }
.patient-row--inactive .patient-row__name { color: var(--app-ink-subtle); }
.patient-row__main { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.patient-row__name { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.patient-row__meta { font-size: 0.8125rem; color: var(--app-ink-subtle); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.patient-row__chevron { color: var(--app-ink-subtle); flex: none; }
</style>
