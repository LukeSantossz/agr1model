# agr1model — Diretrizes para Agentes de IA

> **Fluxo mandatorio.** Leia TODOS os arquivos em `.claude/rules/` e `.claude/registry.md` antes de qualquer implementacao.

## Projeto

- **Nome:** agr1model
- **Stack:** JavaScript (Google Earth Engine)
- **Estrutura:** scripts/ndwi/, scripts/utils/, docs/, data/

## Instrucoes Obrigatorias

Antes de qualquer implementacao, leia na ordem:

1. `.claude/rules/00-trava-seguranca.md`
2. `.claude/rules/01-principios.md`
3. `.claude/rules/02-reconhecimento.md`
4. `.claude/rules/03-modos-operacao.md`
5. `.claude/rules/04-avaliacao-pos.md`
6. `.claude/rules/05-convencoes.md`
7. `.claude/rules/06-crura.md`
8. `.claude/rules/07-integridade.md`
9. `.claude/rules/08-registro-projeto.md`
10. `.claude/rules/09-enforcement.md`
11. `.claude/registry.md` — estado atual do projeto

## Fluxo Resumido

1. Task registrada em `.claude/tasks.md`
2. Modo declarado (Desenvolvimento / Review / Tutor)
3. Reconhecimento da codebase
4. Implementacao seguindo principios e convencoes
5. Avaliacao pos-implementacao
6. Atualizacao do `.claude/registry.md`
7. CRURA — Change -> Review -> Upload -> Review Again -> Auto-Revisao

## Convencoes

- **Commits:** `type(scope): subject` — sem body, sem co-authored-by
- **Branches:** `type/TASK-NNN-descricao-curta`
- **Tasks:** complexidade obrigatoria (patch/minor/major)
- **Nomenclatura:** VAR Method (Data, Info, Collection, Image, Geometry, Filter, Reducer, Chart, Params)

## Regras Criticas

- Nunca implemente sem task registrada em `.claude/tasks.md`
- Nunca invente APIs ou metodos GEE — verifique na documentacao oficial
- Nunca use bandas espectrais sem confirmar no catalogo do sensor
- Sempre execute avaliacao pos-implementacao apos cada mudanca
- Sempre atualize `.claude/registry.md` apos cada implementacao
