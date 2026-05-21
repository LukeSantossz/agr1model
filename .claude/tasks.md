# TASKS.md — Registro de Tasks para Implementação

> **Este arquivo é o ponto de entrada obrigatório para qualquer implementação.**
> Nenhum agente de IA pode modificar a codebase sem uma task formalmente registrada aqui.
> Consulte `.claude/rules/00-trava-seguranca.md` para as regras completas.

---

## Como Usar

1. Identifique a complexidade da task (patch, minor, major).
2. Para **patch**: use o mini-template (seção abaixo). Para **minor/major**: use o template completo.
3. Adicione a task preenchida na seção "Tasks Ativas".
4. Inicie a sessão com o agente informando o modo de operação desejado (Desenvolvimento, Review ou Tutor).
5. Ao concluir, mova a task para "Tasks Concluídas" com o resultado preenchido.

---

## Mini-Template (Patch)

```markdown
### TASK-[NNN] | patch
- **Status:** pendente | em andamento | concluída
- **Objetivo:** [uma frase — ex: Renomear `userData` para `userProfileData` em `auth.ts`]
- **Arquivo(s):** [listar]
```

---

## Template Completo (Minor / Major)

```markdown
### TASK-[NNN]
- **Status:** pendente | em andamento | concluída | descartada | revertida
- **Modo:** desenvolvimento | review | tutor
- **Complexidade:** minor | major
- **Data de criação:** [YYYY-MM-DD]

#### Objetivo (!obrigatório)
[Descreva de forma direta o que precisa ser feito. Uma frase clara.
Teste: se alguém ler apenas esta linha, entende o que será entregue?]

#### Contexto (!obrigatório)
[Por que essa mudança é necessária? Qual problema resolve?
Se houver link de issue, PR, ou card de projeto, inclua aqui.]

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** [listar os arquivos ou áreas que serão tocados]
- **Dependências necessárias:** [novas dependências ou "nenhuma"]
- **Impacto em funcionalidades existentes:** [descrever ou "nenhum"]

#### Critérios de Aceite (!obrigatório)
[Liste as entregas concretas que definem a task como concluída.
Cada critério deve ser verificável — sim ou não, passou ou não passou.]
- [ ] [Critério 1]
- [ ] [Critério 2]
- [ ] [Critério 3]

#### Restrições (opcional)
[Limitações técnicas, de tempo, de escopo, ou decisões já tomadas que o agente deve respeitar.]

#### Referências (opcional)
[Links de documentação, PRs anteriores, issues relacionadas, artigos técnicos relevantes.]

#### Log de Andamento (atualizado pelo agente)
> Registro cronológico do progresso da task. O agente adiciona uma entrada a cada sessão.

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** [YYYY-MM-DD]
- **Branch:** [nome da branch utilizada]
- **Commit(s):** [hash ou mensagem]
- **Avaliação pós-implementação:** [aprovado / aprovado com ressalvas / reprovado]
- **Observações:** [notas relevantes para futuras tasks]
```

### Classificação de Complexidade

| Nível | Quando usar | Exemplos |
|-------|-------------|----------|
| **patch** | Mudança trivial, sem risco de efeito colateral | Renomear variável, corrigir typo, ajustar espaçamento, remover import não utilizado |
| **minor** | Mudança localizada em um módulo, risco baixo | Implementar função isolada, corrigir bug em um arquivo, adicionar teste |
| **major** | Mudança estrutural, múltiplos arquivos, risco de impacto em cascata | Nova feature com múltiplos módulos, refatoração arquitetural, migração de dependência |

---

## Tasks Ativas

> Tasks em andamento ou pendentes de implementação. O agente só pode trabalhar em tasks listadas aqui.
> **Regra de ordenação:** A primeira task listada é a task ativa. O agente trabalha nela até conclusão, descarte ou bloqueio explícito pelo usuário.
>
> **Origem:** Backlog importado do Notion (AGR-T*) na TASK-018. Mapa de rastreabilidade em `registry.md`.

### TASK-020
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Produzir relatório de análise interpretativa respondendo às 3 perguntas de pesquisa do projeto sobre a variação do NDWI em SP.

#### Contexto (!obrigatório)
Os scripts já geram os dados (rankings municipais, histogramas, gráficos de variação 2017-2025), mas não há relatório consolidando as respostas. Perguntas: (1) houve aumento/redução geral do índice de água em SP no período? (2) há regiões com NDWI muito maior/menor? (3) houve regiões com aumento/decremento expressivo nos últimos anos? Origem: Notion AGR-T8.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** docs/analise-interpretativa-ndwi.md (novo)
- **Dependências necessárias:** TASK-026 (referencial La Niña como apoio); usa saídas de TASK-008 e TASK-009 (concluídas)
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [ ] As 3 perguntas respondidas com base nos dados gerados pelos scripts
- [ ] Regiões de destaque (positivo e negativo) identificadas e nomeadas
- [ ] Análise documentada como relatório/nota técnica no repositório

#### Restrições (opcional)
Basear-se nas saídas existentes; não reimplementar análise.

#### Referências (opcional)
Notion AGR-T8; scripts 03_variacao_temporal.js e 04_hotspots_analise.js.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-021
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Melhorar as paletas de cores e adicionar legenda na visualização do NDWI no GEE.

#### Contexto (!obrigatório)
A visualização atual usa `visParamsNDWI` básico, sem legenda. Ajustar faixa de valores, paleta divergente e legenda torna a representação mais clara e alinhada a convenções de sensoriamento remoto. Origem: Notion AGR-T9 (Sprint 2, Improvement).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts de visualização (`Map.addLayer`/`visParams`) — ex. 02_media_anual.js, 04_hotspots_analise.js; scripts/utils/sentinel2_utils.js (`visParamsNDWI`)
- **Dependências necessárias:** TASK-007 (concluída)
- **Impacto em funcionalidades existentes:** apenas visual; sem mudança de cálculo

#### Critérios de Aceite (!obrigatório)
- [ ] Paleta de cores atualizada com justificativa da escolha
- [ ] Faixa de valores (min/max) ajustada de forma representativa
- [ ] Legenda visível e legível no mapa GEE (`ui.Panel`)
- [ ] Script versionado

#### Restrições (opcional)
Não alterar a lógica de cálculo do NDWI.

#### Referências (opcional)
Notion AGR-T9; GEE Community Catalog (paletas de referência).

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-022
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Verificar o comportamento do NDWI na década anterior (2005-2015) usando Landsat, para comparar com a série Sentinel-2.

#### Contexto (!obrigatório)
Avaliar se as anomalias do NDWI (2017-2025, Sentinel-2) são tendência de longo prazo ou restritas à última década, usando Landsat 5/7/8 conforme disponibilidade. Origem: Notion AGR-T10 (Sprint 2).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/05_ndwi_landsat_2005_2015.js (novo)
- **Dependências necessárias:** GEE — LANDSAT/LT05/C02/T1_L2, LANDSAT/LE07/C02/T1_L2, LANDSAT/LC08/C02/T1_L2; TASK-007 (método de composição anual)
- **Impacto em funcionalidades existentes:** nenhum (script independente)

#### Critérios de Aceite (!obrigatório)
- [ ] Script GEE funcional para Landsat no período 2005-2015
- [ ] NDWI calculado com as bandas corretas do sensor escolhido
- [ ] Composições anuais geradas pelo mesmo método de TASK-007
- [ ] Comparação visual/numérica com a série Sentinel-2 documentada
- [ ] Script versionado

#### Restrições (opcional)
Preferir L5 até 2012 e L8 a partir de 2013 (L7 com falha SLC pós-2003); documentar diferença de resolução (30m Landsat vs 10m Sentinel-2).

#### Referências (opcional)
Notion AGR-T10.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-023
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Verificar correlação estatística entre o NDWI médio anual e a precipitação acumulada (CHIRPS) para SP no período.

#### Contexto (!obrigatório)
Validar o NDWI como proxy de variação hídrica superficial em resposta à pluviometria. Origem: Notion AGR-T11 (Sprint 2).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** analysis/correlation_ndwi_precip.py (novo) OU script GEE equivalente (ver Restrições)
- **Dependências necessárias:** GEE — UCSB-CHG/CHIRPS/DAILY; Python — pandas, scipy.stats (se via Python); TASK-008 (séries NDWI)
- **Impacto em funcionalidades existentes:** introduz dimensão de análise estatística

#### Critérios de Aceite (!obrigatório)
- [ ] Série de precipitação extraída para o mesmo período e área do NDWI
- [ ] Correlação implementada com justificativa do teste (Pearson/Spearman conforme normalidade)
- [ ] Resultado documentado (coeficiente, p-valor, scatter plot)
- [ ] Script versionado

#### Restrições (opcional)
Stack Python autorizada (2026-05-20, TASK-027) — usar pandas/scipy. A alternativa em GEE (`ee.Reducer.pearsonsCorrelation`) permanece válida se preferir evitar dependência local. Série curta (n≈9) limita poder estatístico; considerar análise com lag.

#### Referências (opcional)
Notion AGR-T11; CHIRPS Daily.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-024
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Verificar se existe diferença estatística significativa nos valores médios de NDWI entre os anos analisados.

#### Contexto (!obrigatório)
Validar formalmente se a variação temporal observada constitui sinal estatístico real ou flutuação dentro da variabilidade esperada. Origem: Notion AGR-T12 (Sprint 2).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** analysis/ndwi_anova.py (novo)
- **Dependências necessárias:** Python — scipy.stats, statsmodels, matplotlib/seaborn; TASK-007 (médias anuais)
- **Impacto em funcionalidades existentes:** introduz dimensão de análise estatística

#### Critérios de Aceite (!obrigatório)
- [ ] Teste estatístico implementado com escolha justificada (ANOVA ou Kruskal-Wallis)
- [ ] p-valor calculado e interpretado
- [ ] Post-hoc executado se significativo (Tukey HSD ou Dunn + Bonferroni)
- [ ] Visualização dos grupos (boxplot)
- [ ] Resultado documentado e versionado

#### Restrições (opcional)
Stack Python autorizada (2026-05-20, TASK-027) — usar scipy/statsmodels (ANOVA/Kruskal-Wallis não são nativos do GEE). Independência entre anos questionável em série temporal — documentar como limitação.

#### Referências (opcional)
Notion AGR-T12.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-025
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Avaliar índices espectrais complementares ao NDWI e implementar ao menos um no GEE.

#### Contexto (!obrigatório)
Task exploratória que subsidia decisões futuras sobre expansão do pipeline analítico para monitoramento hídrico/agrícola. Origem: Notion AGR-T13 (Sprint 2).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** docs/indices-espectrais.md (novo); scripts/ndwi/06_indices_complementares.js (novo)
- **Dependências necessárias:** GEE — Sentinel-2 SR; TASK-006 (pipeline base)
- **Impacto em funcionalidades existentes:** nenhum (script independente)

#### Critérios de Aceite (!obrigatório)
- [ ] Ao menos 3 índices avaliados com justificativa (ex.: NDVI, EVI, LSWI, MNDWI, SAVI)
- [ ] Ao menos 1 índice adicional implementado no GEE
- [ ] Comparação visual com o NDWI documentada
- [ ] Documento de decisão registrado

#### Restrições (opcional)
Limitar a no máximo 5 índices; priorizar os que usam bandas já disponíveis no Sentinel-2.

#### Referências (opcional)
Notion AGR-T13.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

### TASK-026
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Levantar e confirmar com literatura científica o comportamento da La Niña e seus impactos agrícolas em SP, correlacionando com a série NDWI.

#### Contexto (!obrigatório)
Fornecer embasamento científico para a análise interpretativa (TASK-020), correlacionando anos de La Niña da literatura com anos de maior variação no NDWI. Origem: Notion AGR-T14 (Sprint 2).

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** docs/la-nina-sp-literatura.md (novo)
- **Dependências necessárias:** nenhuma (apoia TASK-020)
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [ ] Ao menos 3 artigos relevantes identificados e resumidos
- [ ] Correlação entre comportamento La Niña e padrões NDWI documentada (anos específicos)
- [ ] Resumo com referências completas (autor, ano, título, DOI) registrado

#### Restrições (opcional)
Priorizar SciELO e repositórios de acesso aberto; ao menos uma referência peer-reviewed.

#### Referências (opcional)
Notion AGR-T14.

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| —    | —      | —              | —               |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** —
- **Branch:** —
- **Commit(s):** —
- **Avaliação pós-implementação:** —
- **Observações:** —

---

## Tasks Concluídas

> Tasks finalizadas. Movidas para cá após conclusão e atualização do Registro de Projeto (`registry.md`). Nunca remova entradas — o histórico é cumulativo.

### TASK-019
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-20

#### Objetivo (!obrigatório)
Pesquisar e documentar a formulação do NDWI (McFeeters 1996 × Gao 1996) e justificar a adotada no projeto.

#### Critérios de Aceite (!obrigatório)
- [x] Definição formal do NDWI documentada
- [x] Diferenças entre Gao (1996) e McFeeters (1996) documentadas
- [x] Formulação adotada (McFeeters) justificada para o contexto de água superficial
- [x] Bandas Sentinel-2 correspondentes identificadas (B3 Green, B8 NIR)

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-20 | 1 | Criado docs/ndwi-formulacao.md; fórmulas e DOIs verificados (web) | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-20
- **Branch:** docs/TASK-019-formulacao-ndwi
- **Commit(s):** ver PR
- **Avaliação pós-implementação:** aprovado
- **Observações:** McFeeters confirmado no código (`normalizedDifference(['B3','B8'])`); documentada a nuance de que Gao usa 0,86/1,24 µm e o Sentinel-2 não tem banda em 1,24 µm

---

### TASK-027 | minor
- **Status:** concluída
- **Objetivo:** Registrar a adoção de Python na stack do projeto e resolver a decisão pendente das TASK-023/024
- **Arquivo(s):** CLAUDE.md, .claude/registry.md, .claude/tasks.md
- **Branch:** chore/TASK-027-adota-python-stack
- **Resultado:** aprovado — Python autorizado pelo usuário (2026-05-20); stack passa a JS/GEE + Python; flags "DECISÃO DE STACK PENDENTE" removidos das TASK-023/024; deps previstas pandas/scipy/statsmodels/matplotlib

### TASK-018 | minor
- **Status:** concluída
- **Objetivo:** Mapear o backlog do Notion (8 tasks pendentes) em tasks.md e remover a fonte tasks_notion.md
- **Arquivo(s):** .claude/tasks.md, .claude/registry.md, tasks_notion.md (removido)
- **Branch:** docs/TASK-018-mapeia-backlog-notion
- **Resultado:** aprovado — TASK-019 a TASK-026 criadas em "Tasks Ativas" conforme template; rastreabilidade Notion → .claude registrada no registry; AGR-T3/T5/T6/T7 já cobertas por TASK-005/006/007/008/009/010, logo só as faltantes foram mapeadas; tasks_notion.md (untracked) removido

### TASK-017 | minor
- **Status:** concluída
- **Objetivo:** Renomear identificadores enganosos detectados na TASK-016 — `ndwi2015`/`ndwi2025` em 04_hotspots e remover alias morto `mascaraNuvensQA60`
- **Arquivo(s):** scripts/ndwi/04_hotspots_analise.js, scripts/utils/sentinel2_utils.js
- **Branch:** refactor/TASK-017-renomeia-identificadores
- **Resultado:** aprovado — `ndwiInicial`/`ndwiFinal` (espelham ANO_INICIAL/ANO_FINAL); alias `mascaraNuvensQA60` removido (sem consumidores). 03_variacao_temporal revisado: `ndwi2017`/`ndwi2025` mantidos (nomes corretos, não enganosos). Comportamento preservado (renomes locais + remoção de código morto)

### TASK-016 | minor
- **Status:** concluída
- **Objetivo:** Reconciliar critérios de aceite das TASK-006/007/008 e docstrings dos scripts 01/02/03 com a implementação real (datas 2017+, máscara SCL)
- **Arquivo(s):** .claude/tasks.md, scripts/ndwi/01_coleta_ndwi.js, scripts/ndwi/02_media_anual.js, scripts/ndwi/03_variacao_temporal.js
- **Branch:** docs/TASK-016-reconcilia-criterios-ndwi
- **Resultado:** aprovado — datas 2015→2017 e QA60→SCL alinhadas ao código real; pendência registrada: variável `ndwi2015` em 04_hotspots requer refatoração (proposta TASK-017)

### TASK-015 | minor
- **Status:** concluída
- **Objetivo:** Atualizar referências `.ai/` para `.claude/` nos pontos de entrada de agentes (migração TASK-012 incompleta)
- **Arquivo(s):** .cursorrules, .windsurfrules, .github/copilot-instructions.md, AGENTS.md, CONTRIBUTING.md
- **Branch:** fix/TASK-015-atualiza-refs-claude
- **Resultado:** aprovado — 75 refs corrigidas; `.ai/pr-template.md` → `.claude/templates/pr-template.md`; regras 10-12 (extintas) remapeadas para `.claude/guides/` (codex, portfolio), regra 10 integrada em 01/03

### TASK-014 | minor
- **Status:** concluída
- **Objetivo:** Restaurar entradas TASK-001 a TASK-010 no tasks.md (perdidas na migração TASK-012) e corrigir caminhos de enforcement na TASK-000
- **Arquivo(s):** .claude/tasks.md, .claude/registry.md
- **Branch:** docs/TASK-014-restaura-tasks-001-010
- **Resultado:** aprovado — 10 entradas restauradas verbatim do histórico git (e5a72fe~1); TASK-000 atualizada de `.ai/hooks`/`.ai/enforcement.conf` para `.claude/`

### TASK-013 | patch
- **Status:** concluída
- **Objetivo:** Corrigir referência `.ai/` para `.claude/` na estrutura do README após migração do framework
- **Arquivo(s):** README.md
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Resultado:** aprovado — estrutura do projeto no README reflete o diretório `.claude/` (alinhado à TASK-012)

### TASK-012
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-10

#### Objetivo (!obrigatório)
Migrar framework de desenvolvimento de `.ai/` para `.claude/` versão 1.1.0.

#### Contexto (!obrigatório)
Nova versão do framework consolida regras 10-12 em guias separados, reorganiza templates e atualiza estrutura de diretórios.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .claude/, CLAUDE.md, .ai/ (remoção)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] VERSION contém "1.1.0"
- [x] Pasta guides/ criada com guia-codex.md e guia-portfolio.md
- [x] Pasta templates/ criada com pr-template.md e issue-template.md
- [x] Rules contém apenas 00-09 (10 arquivos)
- [x] Contexto do projeto preservado em registry.md
- [x] Base de conhecimento configurada no CLAUDE.md
- [x] .ai/ removida
- [x] .claude_update/ removida

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-10 | 1 | Migração completa para v1.1.0 | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-10
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** e5a72fe
- **Avaliação pós-implementação:** aprovado
- **Observações:** Migração de .ai/ para .claude/ v1.1.0 concluída

---

### TASK-011
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-06

#### Objetivo (!obrigatório)
Corrigir não-conformidades organizacionais identificadas na auditoria de conformidade.

#### Contexto (!obrigatório)
Auditoria de conformidade identificou: (1) tasks concluídas na seção errada, (2) commits não vinculados nas tasks 005-009, (3) TASK-000 inexistente, (4) git hooks não instalados. Esta task corrige os itens organizacionais; TASK-000 trata dos hooks.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .ai/tasks.md, .ai/registry.md
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] TASK-005 a TASK-010 movidas para seção "Tasks Concluídas"
- [x] Commits atualizados nas tasks 005-009 com hashes reais
- [x] TASK-000 criada para implementação de hooks
- [x] Registry atualizado com entrada TASK-011

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-06 | 1 | Correcoes organizacionais, movimentacao de tasks | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-06
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 6146817
- **Avaliação pós-implementação:** aprovado
- **Observações:** Tasks reorganizadas, commits vinculados, TASK-000 implementada

---

### TASK-000
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-06

#### Objetivo (!obrigatório)
Implementar git hooks de enforcement automatizado conforme regra 09.

#### Contexto (!obrigatório)
A regra 09-enforcement.md define hooks obrigatórios (commit-msg, pre-commit, pre-push, post-merge) para validação automática do fluxo. Esta task deveria ser a primeira do projeto mas foi identificada como ausente na auditoria.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** .claude/hooks/commit-msg, .claude/hooks/pre-commit, .claude/hooks/pre-push, .claude/hooks/post-merge, .claude/enforcement.conf
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** valida commits, branches e escopo automaticamente

#### Critérios de Aceite (!obrigatório)
- [x] Diretório .claude/hooks/ criado
- [x] Hook commit-msg valida formato Conventional Commits
- [x] Hook pre-commit detecta console.log/print/debugger
- [x] Hook pre-push valida nome de branch e task ativa
- [x] Hook post-merge sinaliza necessidade de verificação pós-pull
- [x] git config core.hooksPath configurado para .claude/hooks
- [x] enforcement.conf criado com patterns por linguagem

#### Restrições (opcional)
- Hooks em bash puro, stack-agnóstico
- Não-bloqueante em caso de dúvida (warning em vez de erro)

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-06 | 1 | Hooks criados e configurados | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-06
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 106d2ce
- **Avaliação pós-implementação:** aprovado
- **Observações:** 4 hooks bash implementados, enforcement.conf criado, core.hooksPath configurado (hooks migrados para .claude/hooks na TASK-012)

---

### TASK-010
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-06

#### Objetivo (!obrigatório)
Corrigir paths para GEE Code Editor e otimizar scripts para evitar erro de memoria.

#### Contexto (!obrigatório)
Scripts originais usavam path `agr1model` mas repositorio GEE usa `agrimodel`. Alem disso, o processamento de SP inteiro causava erro "User memory limit exceeded" no GEE.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/*.js, scripts/utils/sentinel2_utils.js, shape_files/, README.md
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** scripts agora compativeis com GEE Code Editor

#### Critérios de Aceite (!obrigatório)
- [x] Paths ajustados de agr1model para agrimodel
- [x] ASSET_BASE ajustado para users/luquinhas_gonzales/
- [x] Geometria simplificada com maxError 1000m
- [x] Escala de visualizacao aumentada para 500m
- [x] Limite de imagens para processamento (50 por ano)
- [x] Shapefiles adicionados ao repositorio
- [x] Badges de stack no README

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-06 | 1 | Ajustados paths, otimizacoes memoria, shapefiles | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-06
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** f4fa801, e2a3f46, 51603cd
- **Avaliação pós-implementação:** aprovado
- **Observações:** Escala 500m para visualizacao, 100m para exportacao

---

### TASK-009
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script que identifica regiões com valores extremos e mudanças significativas no período.

#### Contexto (!obrigatório)
Análise de hotspots para responder: "Há regiões que se destacam com valores muito maiores?" e "Houve regiões que se destacaram por aumento do decremento nos últimos 10 anos?"

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/04_hotspots_analise.js (novo)
- **Dependências necessárias:** Scripts 02 e 03
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Identifica regiões com NDWI médio acima do percentil 90 (hotspots de água)
- [x] Identifica regiões com maior variação positiva (ganho de água)
- [x] Identifica regiões com maior variação negativa (perda de água)
- [x] Análise por município ou região geográfica de SP
- [x] Gera gráficos/charts comparativos
- [x] Comentários em PT-BR explicando cada linha

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado 04_hotspots_analise.js com ranking de municipios | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** a2fffae
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui ranking top 10 municipios, graficos e exportacao CSV

---

### TASK-008
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script que calcula diferença de NDWI entre 2017 e 2025, identificando incremento/decremento.

#### Contexto (!obrigatório)
Análise de variação temporal para responder: "Houve aumento ou redução no índice de água para SP no período analisado?" e "Quais regiões tiveram incremento ou decremento?"

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/03_variacao_temporal.js (novo)
- **Dependências necessárias:** Script 02_media_anual.js
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Calcula diferença: NDWI_2025 - NDWI_2017
- [x] Classifica pixels em: incremento (>0), estável (~0), decremento (<0)
- [x] Gera estatísticas de área para cada classe
- [x] Visualização com cores divergentes (azul=aumento, vermelho=redução)
- [x] Responde se houve aumento ou redução geral no estado
- [x] Comentários em PT-BR explicando cada linha

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado 03_variacao_temporal.js com histograma | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 1d83049
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui classificacao em 3 classes e histograma de variacao. Critérios reconciliados na TASK-016: comparação real 2017 vs 2025 (S2_SR_HARMONIZED inicia em 2017).

---

### TASK-007
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script que gera imagens de média anual de NDWI para cada ano (2017-2025).

#### Contexto (!obrigatório)
Para análise temporal, é necessário agregar as imagens NDWI em composições anuais usando a média. Isso reduz ruído e permite comparação entre anos.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/02_media_anual.js (novo)
- **Dependências necessárias:** Script 01_coleta_ndwi.js
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Gera uma imagem de média NDWI para cada ano (2017-2025)
- [x] Cria ImageCollection com as 9 imagens anuais
- [x] Visualização no mapa com paleta de cores apropriada
- [x] Exporta imagens anuais como Assets ou Drive
- [x] Comentários em PT-BR explicando cada linha

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado 02_media_anual.js com grafico temporal | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 62c834a
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui grafico de serie temporal e estatisticas por ano. Critérios reconciliados na TASK-016: 9 composições anuais (2017-2025), pois S2_SR_HARMONIZED inicia em 2017.

---

### TASK-006
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script GEE que coleta imagens Sentinel-2 (2017-2025) para SP e calcula NDWI para cada cena.

#### Contexto (!obrigatório)
Base do projeto de análise temporal de NDWI. O script deve filtrar a coleção Sentinel-2, aplicar máscara de nuvens, calcular NDWI usando bandas Green (B3) e NIR (B8), e recortar para a área de SP usando o shapefile carregado.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/01_coleta_ndwi.js (novo), scripts/utils/sentinel2_utils.js (novo)
- **Dependências necessárias:** Asset SP_UF_2024 no GEE
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Script carrega shapefile de SP do GEE Assets
- [x] Filtra Sentinel-2 por data (2017-03-28 a 2025-12-31) e área
- [x] Aplica máscara de nuvens usando banda SCL
- [x] Calcula NDWI = (Green - NIR) / (Green + NIR)
- [x] Exporta coleção de imagens NDWI recortadas para SP
- [x] Comentários em PT-BR explicando cada linha

#### Restrições (opcional)
- Usar Sentinel-2 Surface Reflectance (COPERNICUS/S2_SR_HARMONIZED)
- Comentários obrigatórios em português

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criados sentinel2_utils.js e 01_coleta_ndwi.js | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** dc3ad5d, b2987bb
- **Avaliação pós-implementação:** aprovado
- **Observações:** Modulo utils com funcoes reutilizaveis. Script 01 com pipeline completo. Critérios reconciliados na TASK-016: intervalo real 2017-03-28→2025 (S2_SR_HARMONIZED disponível a partir de 2017-03-28) e máscara SCL (mais confiável que QA60).

---

### TASK-005
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** patch
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar documentação de setup para upload dos shapefiles de SP para GEE Assets.

#### Contexto (!obrigatório)
Os shapefiles do estado de São Paulo (SP_UF_2024.zip, SP_Municipios_2024.zip, etc.) precisam ser carregados como Assets no GEE para serem utilizados nos scripts de análise NDWI.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** docs/gee-assets-setup.md (novo)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Documentação criada com instruções de upload para GEE
- [x] Asset IDs documentados para uso nos scripts
- [x] Instruções para extração dos .zip e upload via Code Editor

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado docs/gee-assets-setup.md | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** feat/TASK-005-009-ndwi-analysis
- **Commit(s):** 429689d
- **Avaliação pós-implementação:** aprovado
- **Observações:** Documentação completa com Asset IDs e instruções de upload

---

### TASK-004
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Adicionar configuração para OpenAI Codex no projeto, similar aos arquivos existentes para outros agentes de IA.

#### Contexto (!obrigatório)
O projeto possui pontos de entrada para Claude Code, Cursor, Windsurf e GitHub Copilot, mas faltava a configuração para o OpenAI Codex CLI.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** AGENTS.md (novo), CONTRIBUTING.md (atualização)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] AGENTS.md criado com instruções para Codex
- [x] CONTRIBUTING.md atualizado com Codex na tabela de IDEs
- [x] Estrutura consistente com os demais arquivos de configuração

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | AGENTS.md criado, CONTRIBUTING.md atualizado | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** chore/TASK-004-codex-config
- **Commit(s):** dfa13b2, 2f91dbf
- **Avaliação pós-implementação:** aprovado
- **Observações:** Codex agora suportado via AGENTS.md. Checklist agêntico: aplicado.

---

### TASK-003
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar CONTRIBUTING.md com orientações de contribuição e instruções para uso de IDEs com IA.

#### Contexto (!obrigatório)
O projeto possui múltiplos pontos de entrada para agentes de IA mas não havia documentação consolidada para contribuidores.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** CONTRIBUTING.md (novo)
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] CONTRIBUTING.md criado em inglês
- [x] Seção de configuração por IDE (Claude Code, Cursor, Windsurf, GitHub Copilot)
- [x] Referência às regras em .ai/rules/
- [x] Instruções de workflow (task → branch → commit → PR)

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | CONTRIBUTING.md criado com guias de IDE | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** docs/TASK-003-contributing-guide
- **Commit(s):** 543cb1b
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui setup para Claude Code, Cursor, Windsurf, GitHub Copilot. Checklist agêntico: aplicado.

---

### TASK-002
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Padronizar o README.md conforme modelo da regra 12 (Portfólio Público) — em inglês, com contexto de negócio, diagrama de arquitetura, decisões de engenharia e instruções de execução.

#### Contexto (!obrigatório)
O README atual estava em português e não seguia a estrutura definida na regra 12.2. Para repositórios públicos, o README deve comunicar valor para leitores externos.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** README.md
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] README em inglês
- [x] Seção de contexto de negócio (por que o projeto existe)
- [x] Diagrama de arquitetura em Mermaid
- [x] Seção de decisões de engenharia
- [x] Instruções de execução claras

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | README reescrito seguindo regra 12.2 | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** docs/TASK-002-readme-portfolio
- **Commit(s):** 5f69523
- **Avaliação pós-implementação:** aprovado
- **Observações:** README agora em inglês com estrutura de portfólio. Checklist agêntico: aplicado.

---

### TASK-001
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Sincronizar `.ai/rules/` com o estado atualizado de `.claude_config/rules/`, garantindo que a metodologia reflita a versão mais recente.

#### Contexto (!obrigatório)
Auditoria identificou divergências significativas entre as duas pastas:
- 3 arquivos ausentes em `.ai/rules/` (regras 10, 11, 12)
- Diferenças de acentuação (ASCII vs UTF-8)
- Caminhos de arquivos divergentes (`.ai/` vs raiz)
- Conteúdo específico GEE vs conteúdo genérico
- Seções e tipos de commit ausentes

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** Todos os arquivos em `.ai/rules/` (00 a 09) + criação de 10, 11, 12
- **Dependências necessárias:** nenhuma
- **Impacto em funcionalidades existentes:** Atualiza regras operacionais do agente

#### Critérios de Aceite (!obrigatório)
- [x] Arquivos 10, 11, 12 criados em `.ai/rules/`
- [x] Todos os arquivos 00-09 atualizados com conteúdo de `.claude_config/rules/`
- [x] Acentuação UTF-8 aplicada em todos os arquivos
- [x] Caminhos atualizados para padrão sem prefixo `.ai/`
- [x] VAR Method atualizado com sufixos genéricos
- [x] Tipos de commit build, ci, revert adicionados
- [x] Seção 6.3 Templates adicionada em 06-crura.md
- [x] Commits atômicos seguindo Conventional Commits em inglês

#### Restrições (opcional)
- Commits em inglês
- Mensagens seguindo Conventional Commits
- Um commit por arquivo ou grupo lógico

#### Referências (opcional)
- Auditoria realizada nesta sessão

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado tasks.md, iniciando sincronização | em andamento |
| 2026-05-05 | 1 | Sincronização completa, 7 commits atômicos realizados | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** refactor/TASK-001-sync-ai-rules
- **Commit(s):** 01a3f29, c2c0c47, 1df471f, b286771, 3f1ecca, 8271213, 124d1b7
- **Avaliação pós-implementação:** aprovado
- **Observações:** Sincronização bem-sucedida. 13 arquivos de regras atualizados/criados + 2 templates + registry. Checklist agêntico: aplicado.

---
---

## Tasks Descartadas

> Tasks que foram canceladas ou substituídas antes da implementação. Registre o motivo.

[nenhuma task descartada]

---

## Política de Arquivamento

Quando a seção "Tasks Concluídas" ultrapassar **20 entradas**, o agente deve:

1. Mover as tasks mais antigas (mantendo as 10 mais recentes) para `.claude/tasks-archive.md`.
2. O arquivo de arquivo é cumulativo — nunca editar entradas já arquivadas.
3. Ao buscar histórico de tasks, consultar ambos os arquivos se necessário.
4. Tasks descartadas e revertidas também contam para o limite e são arquivadas junto.

Isso garante que o agente carregue apenas o histórico recente em contexto, sem perder rastreabilidade.

---

## Regras de Preenchimento

1. **O campo Objetivo deve caber em uma frase.** Se não cabe, a task é grande demais — quebre em subtasks.
2. **Uma task deve ser completável em uma sessão de desenvolvimento.** Se a estimativa excede uma sessão ou afeta mais de 10 arquivos, decompor em subtasks independentes. Cada subtask recebe seu próprio TASK-NNN.
3. **Critérios de Aceite são obrigatórios e verificáveis.** "Funcionar corretamente" não é critério. "Retornar status 200 para inputs válidos e 400 para inputs inválidos" é.
4. **Escopo Técnico deve listar arquivos concretos.** "Algumas telas" não serve. "src/screens/LoginScreen.tsx, src/services/authService.ts" serve.
5. **Uma task por implementação.** Se surgir necessidade fora do escopo, registre nova task.
6. **Tasks não são retroativas.** Código já implementado sem task deve ser revisado (Modo Review).
7. **O resultado é preenchido pelo agente** ao final da implementação.
8. **Complexidade é obrigatória.** Na dúvida, classifique para cima.
9. **A ordem na seção Tasks Ativas define prioridade.** A primeira é a ativa.
10. **O Log de Andamento é obrigatório para `minor` e `major`.** Tasks `patch` podem omitir.
11. **Tasks revertidas não são deletadas.** Recebem status `revertida` com nota.
