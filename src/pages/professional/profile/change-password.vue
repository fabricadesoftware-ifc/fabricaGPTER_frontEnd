<script setup>
  import { reactive, ref } from 'vue'
  import { useSessionStore } from '@/stores/auth'
  const session = useSessionStore()
  const form = reactive({ current: '', password: '', confirmation: '' })
  const busy = ref(false)
  async function submit () {
    if (busy.value) return
    busy.value = true
    try {
      await session.changePassword(form.current, form.password, form.confirmation)
      form.current = form.password = form.confirmation = ''
      alert('Senha alterada com sucesso.')
    } catch (error) { alert(error.message) } finally { busy.value = false }
  }

  import { ChevronLeft } from 'lucide-vue-next';
  import { useDisplay } from 'vuetify';


  const { smAndDown } = useDisplay()
</script>
<template>
  <v-container>
    <div class="d-flex align-center mb-4">
      <v-btn
        v-if="smAndDown"
        aria-label="Voltar"
        class="d-flex align-center"
        variant="text"
        @click="$router.back()"
      >
        <ChevronLeft class="opacity-70 mr-2" />
      </v-btn>
      <SubpageTitle title="Alterar senha" />
    </div>


    <div
      class="d-flex flex-grow-1 flex-column align-center"
      :class="smAndDown ? 'w-100' : 'w-50'"
    >

      <v-form
        class="w-100 pa-4 p rounded-xl mt-4"

        @submit.prevent="submit"
      >
        <span class="text-subtitle-2 font-weight-light">Senha atual</span>
        <v-text-field
          v-model="form.current"
          aria-label="Senha atual"
          autocomplete="current-password"
          class="mt-2"
          name="senha-atual"
          required
          rounded="lg"
          type="password"
          variant="outlined"
        />

        <span class="text-subtitle-2 font-weight-light">Nova Senha</span>
        <v-text-field
          v-model="form.password"
          aria-label="Nova senha"
          autocomplete="new-password"
          class="mt-2"
          name="nova-senha"
          required
          rounded="lg"
          type="password"
          variant="outlined"
        />

        <span class="text-subtitle-2 font-weight-light">Confirmar nova senha</span>
        <v-text-field
          v-model="form.confirmation"
          aria-label="Confirmar nova senha"
          autocomplete="new-password"
          class="mt-2"
          name="confirmar-senha"
          required
          rounded="lg"
          type="password"
          variant="outlined"
        />

        <v-btn
          class="darken-blue-gradient text-white w-100 rounded-xl text-none text-subtitle-1"
          height="50"
          :loading="busy"
          type="submit"
        >Alterar senha
        </v-btn>

      </v-form>
    </div>
  </v-container>
</template>

<style scoped>
.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
