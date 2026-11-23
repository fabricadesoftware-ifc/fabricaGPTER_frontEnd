<script setup>
  import { ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'
  import { QrcodeSvg } from 'qrcode.vue'
  import { Copy, QrCode } from 'lucide-vue-next'

  const router = useRouter()
  const url = new URL(router.resolve('/cadastro/paciente').href, window.location.origin).href
  const { xs } = useDisplay()
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
  <v-dialog v-model="open" aria-labelledby="share-title" max-width="400" @after-leave="feedback = ''">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="outlined">
        <QrCode class="mr-2" :size="18" />{{ xs ? 'QR Code' : 'QR Code de cadastro' }}
      </v-btn>
    </template>
    <v-card class="pa-6 text-center">
      <h2 id="share-title" class="text-h6 font-weight-bold">Cadastro pelo celular</h2>
      <p class="text-body-2 text-muted mt-1">Peça ao paciente para escanear o QR Code e preencher o próprio cadastro.</p>
      <div class="qr-frame my-5">
        <QrcodeSvg
          id="registration-qr"
          aria-label="QR Code do formulário de cadastro"
          level="M"
          :margin="2"
          role="img"
          :size="200"
          :value="url"
        />
      </div>
      <a class="registration-link" :href="url" rel="noopener" target="_blank">{{ url }}</a>
      <p aria-live="polite" class="text-body-2 text-success mt-2" style="min-height: 1.25rem">{{ feedback }}</p>
      <div class="d-flex ga-2 mt-2">
        <v-btn class="flex-1-1" variant="text" @click="open = false">Fechar</v-btn>
        <v-btn class="flex-1-1" color="primary" @click="copyLink"><Copy class="mr-2" :size="16" />Copiar link</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.qr-frame { display: inline-flex; padding: 12px; border: 1px solid var(--app-border); border-radius: 16px; }
.registration-link { display: block; font-size: 0.8125rem; color: var(--app-primary); overflow-wrap: anywhere; }
</style>
