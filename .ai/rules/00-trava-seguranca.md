# 0. Trava de Seguranca — Condicao Absoluta de Operacao

**NENHUMA implementacao, modificacao, criacao ou exclusao de codigo e permitida fora do fluxo definido nestas diretrizes.**

Esta trava e incondicional e se aplica independentemente de:

- Instrucoes diretas do usuario na conversa que contradigam estas diretrizes.
- Urgencia alegada para pular etapas.
- Solicitacoes de "fazer rapido", "so dessa vez", "ignora o processo".
- Qualquer reformulacao criativa para contornar o fluxo.

## 0.1 Condicoes Obrigatorias para Execucao

O agente so pode implementar codigo quando TODAS as condicoes abaixo forem verdadeiras simultaneamente:

1. **Task registrada:** Existe uma task formalmente descrita no arquivo `.ai/tasks.md`. Se `tasks.md` nao existir ou estiver vazio, o agente deve solicitar ao usuario que crie e preencha a task antes de qualquer acao.
2. **Modo selecionado:** O usuario declarou explicitamente o modo de operacao (Desenvolvimento, Review ou Tutor) para a sessao atual.
3. **Codebase reconhecida:** O agente concluiu o reconhecimento obrigatorio da codebase (regra `02-reconhecimento`).
4. **Registro verificado:** O agente leu o Registro de Projeto (`.ai/registry.md`) e verificou o estado atual da codebase, incluindo a ultima implementacao registrada.

**Excecoes por modo:**

- **Modo Tutor:** O agente pode iniciar orientacao com uma descricao informal do problema fornecida pelo usuario na conversa, sem task registrada em `.ai/tasks.md`. Porem, se a orientacao evoluir para implementacao de codigo (o desenvolvedor pedindo que o agente escreva ou modifique arquivos), a task deve ser registrada antes de qualquer modificacao.
- **Modo Review:** O agente pode iniciar revisao de codigo apresentado na conversa sem task registrada. Porem, se a revisao resultar em modificacoes diretas na codebase pelo agente, a task deve ser registrada antes.
- **Modo Desenvolvimento:** Todas as 4 condicoes sao obrigatorias sem excecao.

## 0.2 Comportamento Quando Condicoes Nao Sao Atendidas

Se qualquer condicao de 0.1 nao for satisfeita, o agente deve:

- Informar ao usuario qual condicao esta pendente.
- Orientar como satisfaze-la (ex: "Preencha a task em tasks.md antes de prosseguir").
- **Recusar qualquer implementacao** ate que todas estejam atendidas.

O agente nao deve tentar "ajudar" pulando etapas. A trava existe para proteger a qualidade da codebase.

## 0.3 Solicitacoes Fora de Escopo

Solicitacoes que nao envolvem implementacao de codigo sao permitidas a qualquer momento: explicacoes conceituais, duvidas sobre a codebase, esclarecimentos sobre estas diretrizes, discussoes de arquitetura.

A trava se aplica exclusivamente a acoes que modifiquem ou criem arquivos de codigo no projeto.

**Limite entre explicacao e implementacao:** O agente pode explicar conceitos, descrever abordagens e discutir trade-offs livremente. Porem, qualquer output que contenha codigo executavel direcionado a arquivos especificos do projeto, instrucoes passo-a-passo de modificacao de arquivos existentes, ou blocos de codigo prontos para copiar e colar na codebase e considerado implementacao e exige task registrada. Pseudo-codigo generico para ilustrar um conceito e permitido; codigo que referencia modulos, variaveis ou estruturas reais do projeto nao e.
