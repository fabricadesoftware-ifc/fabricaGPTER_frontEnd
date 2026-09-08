<script setup>
  import { Calendar, Check, Clock, Hand, RotateCcw, Stethoscope, User, Zap } from 'lucide-vue-next';
  import RemakeButton from '@/components/RemakeButton.vue';

  defineProps({
    patient: {
      type: Object,
      required: true,
    },
    buttons: {
      type: Boolean,
      default: false,
    },
  });

  import { useDisplay } from 'vuetify';

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
          <v-text class="text-subtitle-1 font-weight-bold">
            Paciente:
            <v-text class="font-weight-regular">{{ patient.name }}</v-text>
          </v-text>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Stethoscope color="#005BBB" />
          <v-text class="text-subtitle-1 font-weight-bold">
            Profissional:
            <v-text class="font-weight-regular">{{ patient.profissional }}</v-text>
          </v-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Clock color="#005BBB" />
          <v-text class="text-subtitle-1 font-weight-bold">
            Tipo de teste:
            <v-text class="font-weight-regular">{{ patient.type }}</v-text>
          </v-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Hand color="#005BBB" />
          <v-text class="text-subtitle-1 font-weight-bold">
            N° de repetições:
            <v-text class="font-weight-regular">{{ patient.reps }}</v-text>
          </v-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Zap color="#005BBB" />
          <v-text class="text-subtitle-1 font-weight-bold">
            Braço testado:
            <v-text class="font-weight-regular">{{ patient.arm }}</v-text>
          </v-text>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="d-flex align-center ga-2">
          <Calendar color="#005BBB" />
          <v-text class="text-subtitle-1 font-weight-bold">
            Data:
            <v-text class="font-weight-regular">{{ patient.date }}</v-text>
          </v-text>
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
            height="60"
            text="Validar Teste"
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
          >
            <RotateCcw color="#000000" />
          </RemakeButton>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
