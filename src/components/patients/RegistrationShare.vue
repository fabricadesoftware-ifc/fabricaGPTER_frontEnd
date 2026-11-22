<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { QrcodeSvg } from 'qrcode.vue'

  const router = useRouter()
  const url = new URL(router.resolve('/cadastro/paciente').href, window.location.origin).href
  const open = ref(false)
  const feedback = ref('')

  async function copyLink () {
    try {
      await navigator.clipboard.writeText(url)
      feedback.value = 'Link copiado.'
    } catch {
      feedback.value = 'Selecione o link acima e copie manualmente.'
    }
  }
</script>

<template>
  <v-dialog v-model="open" aria-labelledby="share-title" max-width="420" @after-leave="feedback = ''">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        class="text-none"
        prepend-icon="mdi-qrcode"
        rounded="xl"
        variant="outlined"
      >
        QR Code de cadastro
      </v-btn>
    </template>
    <v-card class="pa-5" rounded="xl">
      <h2 id="share-title" class="text-h6">Cadastro pelo celular</h2>
      <p class="text-body-2 mt-1">Escaneie o QR Code ou abra o link para preencher o cadastro.</p>
      <QrcodeSvg
        id="registration-qr"
        aria-label="QR Code do formulário de cadastro"
        class="qr my-3"
        level="M"
        :margin="4"
        role="img"
        :size="224"
        :value="url"
      />
      <a class="registration-link" :href="url" rel="noopener" target="_blank">{{ url }}</a>
      <span aria-live="polite" class="text-body-2">{{ feedback }}</span>
      <v-card-actions class="px-0 pb-0 flex-wrap">
        <v-btn class="text-none" @click="open = false">Fechar</v-btn>
        <v-btn
          class="text-none"
          color="primary"
          prepend-icon="mdi-content-copy"
          variant="tonal"
          @click="copyLink"
        >Copiar link</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.qr { align-self: center; max-width: 100%; height: auto; }
.registration-link { overflow-wrap: anywhere; }
</style>
