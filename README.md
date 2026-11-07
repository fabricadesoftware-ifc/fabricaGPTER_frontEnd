# GPTER — frontend

Aplicação Vue 3 + Vuetify 3, com Pinia e rotas geradas a partir de `src/pages`.

## Executar

```sh
npm ci
npm run dev
npm run lint
npm run build
```

`npm run lint:fix` aplica correções de lint. `npm run preview` serve o build.

## Estado atual

- Rotas abertas, sem autenticação; `/` abre a lista de pacientes.
- Login apenas visual, sem envio ou redirecionamento.
- Não há dados de exemplo, contas, resultados ou operações simuladas.
- Pacientes, testes, perfis, contatos e termos começam vazios e aguardam dados reais.
- Operações de gravação, exclusão, testes e senha informam que a integração ainda não está disponível; não alteram dados nem simulam sucesso.
- Não há persistência local de dados da aplicação. As duas chaves da antiga demonstração são removidas na inicialização.
- Telas sem registros continuam acessíveis e apresentam ausência de dados.
- Não há testes automatizados no projeto.

## Integração pendente

`src/stores/data.js` define o estado vazio e os pontos de entrada das operações. `src/stores/auth.js` mantém o estado inicial de sessão. A próxima etapa é conectar essas operações, os perfis, contatos e termos à API e integrar os testes clínicos ao equipamento.

Foram preservados os estilos e componentes visuais. O conteúdo estático da interface, opções de formulário e manual de uso continuam no frontend.
