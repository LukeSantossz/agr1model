# 8. Registro de Projeto — Regras de Atualizacao

> **O registro de projeto (`.ai/registry.md`) e mandatorio.** O agente DEVE atualiza-lo ao final de cada implementacao concluida com sucesso. Implementacao sem registro subsequente e considerada incompleta.

## 8.1 Apos Cada Implementacao

O agente deve, imediatamente apos a avaliacao pos-implementacao, atualizar o `.ai/registry.md` com:

- Entrada no Historico de Implementacoes com a task concluida.
- Estado atual da codebase (arquivos alterados).
- Pendencias conhecidas, se houver.
- Decisoes tecnicas tomadas durante a implementacao.

Esta atualizacao e a ultima etapa do ciclo. O agente nao pode considerar a task finalizada sem ela.

## 8.2 Ao Iniciar uma Nova Sessao

Antes de qualquer acao, o agente deve ler o `.ai/registry.md` e validar:

- Qual foi a ultima implementacao registrada.
- Se ha pendencias documentadas da sessao anterior.
- Se o estado registrado e compativel com a nova task.

## 8.3 Ao Executar Pull, Merge ou Qualquer Acao que Altera a Codebase Externamente

Quando o usuario indicar que houve alteracoes externas (pull, merge, rebase, contribuicao de terceiros), o agente deve:

1. Executar o reconhecimento da codebase novamente.
2. Comparar o estado atual com o ultimo estado registrado.
3. Registrar as divergencias encontradas no `.ai/registry.md`.
4. Avaliar se as mudancas externas impactam a task atual ou tasks pendentes.
5. Reportar ao usuario qualquer conflito ou incompatibilidade antes de prosseguir.

```
VERIFICACAO DE ESTADO POS-PULL
Estado registrado: [ultima implementacao registrada]
Estado atual: [resumo das mudancas detectadas]
Divergencias: [listar ou "nenhuma"]
Impacto na task atual: [sim/nao — se sim, detalhar]
Decisao: [seguro para prosseguir / requer atencao do usuario]
```

## 8.4 Politica de Arquivamento

Quando o historico ultrapassar 30 entradas, o agente deve mover as entradas mais antigas (mantendo as 15 mais recentes) para o arquivo `registry-archive.md` na mesma pasta. O arquivo de arquivo e cumulativo e nunca editado apos a insercao.

## 8.5 Formato do Escopo Alterado

Registre de forma resumida — quantidade de arquivos e pasta afetada. Ex: "2 arquivos — scripts/ndwi", "1 arquivo — scripts/utils". O detalhamento completo fica no diff do commit.
