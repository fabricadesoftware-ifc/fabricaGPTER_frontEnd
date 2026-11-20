<script setup>
  import { Calendar, Check, Clock, Hand, RotateCcw, Stethoscope, User, Zap } from 'lucide-vue-next';
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
  import RemakeButton from '@/components/ui/RemakeButton.vue';

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

  import { useDisplay } from 'vuetify';

  watch(() => props.patient.id, () => { editing.value = false; errorMessage.value = '' })
  const { mdAndUp } = useDisplay();
</script>
<template>
  <v-card
    class="elevation-2 rounded-xl pa-6 w-100"
    :width="mdAndUp ? '436' : '400'"
  >
    <v-card-title class="text-h6 font-weight-bold mb-4 pa-0">
      Detalhes do teste
    </v-card-title>
    <v-divider class="mb-4" length="100%" />

    <div>
      <v-row>
        <v-col class="d-flex align-center ga-2">
          <User color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Paciente:
            <span class="font-weight-regular">{{ patient.name }}</span>
          </span>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Stethoscope color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Profissional:
            <span class="font-weight-regular">{{ patient.profissional }}</span>
          </span>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Clock color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Tipo de teste:
            <span class="font-weight-regular">{{ patient.type }}</span>
          </span>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Hand color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Observações:
            <span style="white-space: pre-wrap; overflow-wrap: anywhere" class="font-weight-regular">{{ patient.observations || 'Nenhuma observação registrada.' }}</span>
          </span>
        </v-col>
      </v-row>

      <div v-if="buttons || editable">
        <v-btn v-if="!editing" variant="text" @click="draft = patient.observations || ''; editing = true">Editar observações</v-btn>
        <v-form v-else @submit.prevent="saveNotes">
          <v-textarea v-model="draft" auto-grow :disabled="saving" label="Observações (opcional)" variant="outlined" />
          <v-alert v-if="errorMessage" role="alert" type="error">{{ errorMessage }}</v-alert>
          <v-btn :loading="saving" type="submit">Salvar</v-btn>
          <v-btn :disabled="saving" variant="text" @click="editing = false">Cancelar</v-btn>
        </v-form>
      </div>
      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Zap color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Braço testado:
            <span class="font-weight-regular">{{ patient.arm || 'Não informado' }}</span>
          </span>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Calendar color="#005BBB" />
          <span class="text-subtitle-1 font-weight-bold">
            Data:
            <span class="font-weight-regular">{{ patient.date }}</span>
          </span>
        </v-col>
      </v-row>
    </div>
    <!-- passei tamanho da fonte e peso pra dentro do componente -->
    <div v-if="buttons" class="buttons">
      <v-row class="mt-4">
        <v-col class="d-flex gap-3">
          <ConfirmButton
            class="px-4 py-2 rounded"
            color="blue"
            :disabled="patient.status === 'validated'"
            height="60"
            text="Validar Teste"
            @click="validate"
          >
            <Check color="#ffffff" />
          </ConfirmButton>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col class="d-flex gap-3">
          <RemakeButton
            class="px-4 py-2 rounded bg-white border border-black"
            color="blue"
            text="Refazer Teste"
            @click="remake"
          >
            <RotateCcw color="#000000" />
          </RemakeButton>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
