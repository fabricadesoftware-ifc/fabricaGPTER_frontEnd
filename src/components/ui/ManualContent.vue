<script setup>
  import { Armchair, ChartLine, ClipboardCheck, ShieldAlert, Usb } from 'lucide-vue-next'
  import PageHeader from '@/components/ui/PageHeader.vue'

  const sections = [
    {
      title: 'Posição',
      icon: Armchair,
      text: 'A posição para a avaliação da força de preensão manual que a ASHT recomenda é que o avaliado esteja confortavelmente sentado, '
        + 'com o ombro levemente aduzido, o cotovelo fletido a 90°, o antebraço em posição neutra e o punho entre 0° e 30° de extensão.',
    },
    {
      title: 'Preparação do equipamento',
      icon: Usb,
      text: 'Use o Google Chrome ou o Microsoft Edge em um computador. Conecte o dinamômetro na porta USB antes de iniciar o teste. '
        + 'Ao iniciar, o navegador pede para escolher a porta serial do dinamômetro; selecione-a e permita o acesso. '
        + 'Se a conexão falhar, use o botão "Conectar USB" na tela do teste.',
    },
    {
      title: 'Execução do teste',
      icon: ClipboardCheck,
      text: 'Escolha o tempo de coleta (30 ou 60 segundos) e a mão testada. Com o paciente na posição recomendada e sem apertar o equipamento, '
        + 'mantenha marcada a opção "Zerar no início (tara)" e clique em "Iniciar coleta". Instrua o paciente a apertar com força máxima '
        + 'e manter a contração durante todo o tempo. A coleta termina sozinha ao fim do tempo; use "Parar coleta" apenas se precisar interromper.',
    },
    {
      title: 'Interpretação dos resultados',
      icon: ChartLine,
      text: 'Ao final, o sistema salva a série de medições e mostra o gráfico de força (N) ao longo do tempo, o pico de contração e o tempo até o pico. '
        + 'Os valores normais variam de acordo com idade, sexo e dominância; compare os resultados com tabelas normativas apropriadas '
        + 'e considere sempre o contexto clínico. Depois de revisar, o profissional pode validar o teste ou refazê-lo.',
    },
    {
      title: 'Cuidados e contraindicações',
      icon: ShieldAlert,
      text: 'Não realize o teste em pacientes com lesões agudas na mão, punho ou antebraço. Evite testes em casos de inflamação articular ativa ou dor intensa. '
        + 'Sempre explique o procedimento ao paciente e obtenha seu consentimento. Interrompa o teste se o paciente relatar dor ou desconforto excessivo.',
    },
  ]
</script>

<template>
  <div class="page page--narrow">
    <PageHeader subtitle="Guia rápido para realizar a avaliação de força de preensão." title="Como usar" />
    <ol class="steps">
      <li v-for="(section, index) in sections" :key="section.title">
        <v-card class="step">
          <span class="step__icon"><component :is="section.icon" :size="20" /></span>
          <div>
            <p class="eyebrow mb-1">Passo {{ index + 1 }}</p>
            <h2 class="step__title">{{ section.title }}</h2>
            <p class="step__text">{{ section.text }}</p>
          </div>
        </v-card>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 16px; }
.step { display: flex; gap: 16px; padding: 20px 24px; }
.step__icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 12px; background: var(--app-primary-soft); color: var(--app-primary); flex: none; }
.step__title { font-size: 1.0625rem; font-weight: 600; margin: 0 0 6px; }
.step__text { margin: 0; color: var(--app-ink-muted); line-height: 1.65; }
@media (max-width: 599px) {
  .step { flex-direction: column; gap: 12px; padding: 18px; }
}
</style>
