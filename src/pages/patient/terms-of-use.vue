<template>

  <v-container :style="{
    minHeight: mdAndUp ? '20vh' : '20vh',
    maxWidth: mdAndUp ? '30vw' : '100%',
  }" class="ma-0 pa-0 d-flex align-center align-center justify-center blue-gradient rounded-b-xl"
  >
    <v-text class="font-weight-bold text-h4 text-white">Termos de Uso</v-text>
  </v-container>
  <v-container>
    <v-text class="opacity-50">Última atualização: 05/08/2025</v-text>
    <v-list lines="four">
      <v-list-item class="my-2">
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder my-2">1. Aceitação dos termos</div>
          <div class="opacity-90 text-p">
            Você concorda em seguir todas as regras e condições descritas neste aplicativo.
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder my-2">2. Descrição do serviço</div>
          <div class="opacity-90 text-p">
            O aplicativo fornece ferramentas para registro, acompanhamento e análise de testes fisioterapêuticos, bem
            como gerenciamento de informações de pacientes.
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder my-2">3. Uso permitido</div>
          <div class="opacity-90 text-p">
            Você se compromete a utilizar o aplicativo apenas para fins legais e de acordo com a legislação vigente. É
            proibido:
            <ul class="list-disc ml-5 mt-1 text-p">
              <li>Fornecer informações falsas;</li>
              <li>Compartilhar dados de terceiros sem autorização;</li>
              <li>Tentar acessar dados de outros usuários sem permissão.</li>
            </ul>
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder">4. Responsabilidade do usuário</div>
          <div class="opacity-90 text-p">
            Você é responsável por manter a confidencialidade das suas credenciais e por todas as ações realizadas na
            sua conta.
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder">5. Limitação de responsabilidade</div>
          <div class="opacity-90 text-p">
            O aplicativo é fornecido “como está” e não nos responsabilizamos por perdas ou danos decorrentes do uso indevido ou indisponibilidade do serviço.
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder">6. Alterações nos termos</div>
          <div class="opacity-90 text-p">
            Podemos atualizar estes termos a qualquer momento. Quando isso ocorrer, informaremos a data de revisão no início deste documento.
          </div>
        </v-list-item-content>
        <v-list-item-content>
          <div class="text-h6 font-weight-bolder">7. Contato</div>
          <div class="opacity-90 text-p">
            Se tiver dúvidas sobre estes Termos de Uso, entre em contato: <br> 📧 suporte@email.com
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>


  </v-container>


</template>

<script setup>
import { ChevronLeft } from "lucide-vue-next";

</script>

<style>
.blue-gradient {
  background-image: linear-gradient(180deg, #2877d7 0%, #0d519e 100%);
}

.darken-blue-gradient {
  background-image: linear-gradient(90deg, #2877d7 0%, #0d519e 100%);
}
</style>
