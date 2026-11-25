<script setup>
  import { onBeforeUnmount, ref } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'
  import { QrcodeSvg } from 'qrcode.vue'
  import { Check, Copy, QrCode, X } from 'lucide-vue-next'

  const router = useRouter()
  const url = new URL(router.resolve('/cadastro/paciente').href, window.location.origin).href
  const { xs } = useDisplay()
  const open = ref(false)
  const copied = ref(false)
  const copyError = ref('')
  const steps = ['Abra a câmera do celular', 'Aponte para o código', 'Preencha o cadastro e crie a senha']
  let timer

  async function copyLink () {
    copyError.value = ''
    try {
      await navigator.clipboard.writeText(url)
      copied.value = true
      clearTimeout(timer)
      timer = setTimeout(() => { copied.value = false }, 2000)
    } catch {
      copyError.value = 'Não foi possível copiar. Selecione o link e copie manualmente.'
    }
  }

  function reset () {
    clearTimeout(timer)
    copied.value = false
    copyError.value = ''
  }

  onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <v-dialog v-model="open" aria-labelledby="share-title" max-width="480" @after-leave="reset">
    <template #activator="{ props }">
      <v-btn v-bind="props" variant="outlined">
        <QrCode class="mr-2" :size="16" />{{ xs ? 'QR Code' : 'QR Code de cadastro' }}
      </v-btn>
    </template>

    <v-card class="share">
      <header class="share__header">
        <div>
          <h2 id="share-title" class="share__title">Cadastro pelo celular</h2>
          <p class="share__subtitle">O paciente escaneia o código e preenche o próprio cadastro</p>
        </div>
        <v-btn
          aria-label="Fechar"
          class="share__close"
          density="comfortable"
          icon
          size="small"
          variant="text"
          @click="open = false"
        ><X :size="18" /></v-btn>
      </header>

      <div class="share__body">
        <div class="share__qr">
          <QrcodeSvg
            id="registration-qr"
            aria-label="QR Code do formulário de cadastro"
            level="M"
            :margin="0"
            role="img"
            :size="152"
            :value="url"
          />
        </div>
        <ol class="share__steps">
          <li v-for="(step, index) in steps" :key="step">
            <span aria-hidden="true" class="share__step-number figure">{{ index + 1 }}</span>{{ step }}
          </li>
        </ol>
      </div>

      <div class="share__footer">
        <label class="share__label" for="registration-link">Ou envie o link</label>
        <div class="share__link">
          <input
            id="registration-link"
            class="share__url figure"
            readonly
            :value="url"
            @focus="$event.target.select()"
          >
          <v-btn
            :color="copied ? 'success' : undefined"
            size="small"
            variant="text"
            @click="copyLink"
          >
            <component :is="copied ? Check : Copy" class="mr-1" :size="16" />{{ copied ? 'Copiado' : 'Copiar' }}
          </v-btn>
        </div>
        <p aria-live="polite" class="share__error">{{ copyError }}</p>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.share { padding: 24px; }
.share__header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
.share__title { font-size: 1.125rem; font-weight: 500; line-height: 1.3; margin: 0; }
.share__subtitle { margin: 4px 0 0; font-size: 0.875rem; color: var(--app-ink-muted); }
.share__close { margin: -4px -8px 0 0; color: var(--app-ink-subtle); }

.share__body { display: flex; align-items: center; gap: 24px; padding: 16px; border: 1px solid var(--app-border); border-radius: 12px; }
.share__qr { flex: none; display: grid; place-items: center; width: 168px; height: 168px; padding: 8px; border-radius: 8px; background: #FFFFFF; }
.share__qr :deep(svg) { display: block; width: 152px; height: 152px; }
.share__steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; font-size: 0.875rem; color: var(--app-ink); }
.share__steps li { display: flex; align-items: center; gap: 12px; }
.share__step-number { display: grid; place-items: center; flex: none; width: 24px; height: 24px; border: 1px solid var(--app-border); border-radius: 6px; font-size: 0.75rem; color: var(--app-ink-subtle); }

.share__footer { margin-top: 20px; }
.share__label { display: block; margin-bottom: 8px; font-size: 0.8125rem; color: var(--app-ink-subtle); }
.share__link { display: flex; align-items: center; gap: 4px; height: 40px; padding: 0 4px 0 12px; border: 1px solid var(--app-border); border-radius: 8px; background: var(--app-hover); }
.share__url { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; font-size: 0.8125rem; color: var(--app-ink-muted); text-overflow: ellipsis; }
.share__link:focus-within { border-color: var(--app-primary); }
.share__error { min-height: 20px; margin: 4px 0 0; font-size: 0.8125rem; color: rgb(var(--v-theme-error)); }

@media (max-width: 479px) {
  .share { padding: 20px; }
  .share__body { flex-direction: column; align-items: stretch; }
  .share__qr { align-self: center; }
}
</style>
