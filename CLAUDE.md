# agr1model — Diretrizes para Agentes de IA

> **Fluxo mandatorio.** Leia TODOS os arquivos em `.ai/rules/` e `.ai/registry.md` antes de qualquer implementacao.

## Projeto

- **Nome:** agr1model
- **Stack:** JavaScript (Google Earth Engine)
- **Estrutura:** scripts/ndwi/, scripts/utils/, docs/, data/

## Instrucoes Obrigatorias

Antes de qualquer implementacao, leia na ordem:

1. `.ai/rules/00-trava-seguranca.md`
2. `.ai/rules/01-principios.md`
3. `.ai/rules/02-reconhecimento.md`
4. `.ai/rules/03-modos-operacao.md`
5. `.ai/rules/04-avaliacao-pos.md`
6. `.ai/rules/05-convencoes.md`
7. `.ai/rules/06-crura.md`
8. `.ai/rules/07-integridade.md`
9. `.ai/rules/08-registro-projeto.md`
10. `.ai/rules/09-enforcement.md`
11. `.ai/registry.md` — estado atual do projeto

## Fluxo Resumido

1. Task registrada em `.ai/tasks.md`
2. Modo declarado (Desenvolvimento / Review / Tutor)
3. Reconhecimento da codebase
4. Implementacao seguindo principios e convencoes
5. Avaliacao pos-implementacao
6. Atualizacao do `.ai/registry.md`
7. CRURA — Change -> Review -> Upload -> Review Again -> Auto-Revisao

## Convencoes

- **Commits:** `type(scope): subject` — sem body, sem co-authored-by
- **Branches:** `type/TASK-NNN-descricao-curta`
- **Tasks:** complexidade obrigatoria (patch/minor/major)
- **Nomenclatura:** VAR Method (Data, Info, Collection, Image, Geometry, Filter, Reducer, Chart, Params)
