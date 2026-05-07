# TASKS.md — Registro de Tasks para Implementação

> **Este arquivo é o ponto de entrada obrigatório para qualquer implementação.**
> Nenhum agente de IA pode modificar a codebase sem uma task formalmente registrada aqui.
> Consulte `.ai/rules/00-trava-seguranca.md` para as regras completas.

---

## Como Usar

1. Copie o template da Seção "Template de Task" abaixo.
2. Preencha todos os campos obrigatórios (marcados com `!`).
3. Adicione a task preenchida na Seção "Tasks Ativas".
4. Inicie a sessão com o agente informando o modo de operação desejado (Desenvolvimento, Review ou Tutor).
5. Ao concluir, mova a task para "Tasks Concluídas" com o resultado preenchido.

---

## Template de Task

```markdown
### TASK-[NNN]
- **Status:** pendente | em andamento | concluída | descartada | revertida
- **Modo:** desenvolvimento | review | tutor
- **Complexidade:** patch | minor | major
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
[Limitações técnicas, de tempo, de escopo, ou decisões já tomadas que o agente deve respeitar.
Ex: "Não alterar o módulo X", "Manter compatibilidade com a versão Y", "Não adicionar dependências novas".]

#### Referências (opcional)
[Links de documentação, PRs anteriores, issues relacionadas, artigos técnicos relevantes.]

#### Log de Andamento (atualizado pelo agente)
> Registro cronológico do progresso da task. O agente adiciona uma entrada a cada sessão em que a task for trabalhada, incluindo sessões onde houve travamento ou interrupção. Nunca remova entradas anteriores.

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

A complexidade determina o nível de cerimônia na avaliação pós-implementação (ver `.ai/rules/04-avaliacao-pos.md`):

| Nível | Quando usar | Exemplos |
|-------|-------------|----------|
| **patch** | Mudança trivial, sem risco de efeito colateral | Renomear variável, corrigir typo, ajustar espaçamento, remover import não utilizado |
| **minor** | Mudança localizada em um módulo, risco baixo | Implementar função isolada, corrigir bug em um arquivo, adicionar teste |
| **major** | Mudança estrutural, múltiplos arquivos, risco de impacto em cascata | Nova feature com múltiplos módulos, refatoração arquitetural, migração de dependência |

---

## Tasks Ativas

> Tasks em andamento ou pendentes de implementação. O agente só pode trabalhar em tasks listadas aqui.
> **Regra de ordenação:** A primeira task listada é a task ativa. O agente trabalha nela até conclusão, descarte ou bloqueio explícito pelo usuário. Para mudar a prioridade, o usuário reordena as tasks nesta seção.

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
- **Branch:** main
- **Commit(s):** pendente
- **Avaliação pós-implementação:** aprovado
- **Observações:** Documentação completa com Asset IDs e instruções de upload

---

### TASK-006
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** major
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script GEE que coleta imagens Sentinel-2 (2015-2025) para SP e calcula NDWI para cada cena.

#### Contexto (!obrigatório)
Base do projeto de análise temporal de NDWI. O script deve filtrar a coleção Sentinel-2, aplicar máscara de nuvens, calcular NDWI usando bandas Green (B3) e NIR (B8), e recortar para a área de SP usando o shapefile carregado.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/01_coleta_ndwi.js (novo), scripts/utils/sentinel2_utils.js (novo)
- **Dependências necessárias:** Asset SP_UF_2024 no GEE
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Script carrega shapefile de SP do GEE Assets
- [x] Filtra Sentinel-2 por data (2015-06-01 a 2025-12-31) e área
- [x] Aplica máscara de nuvens usando banda QA60
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
- **Branch:** main
- **Commit(s):** pendente
- **Avaliação pós-implementação:** aprovado
- **Observações:** Modulo utils com funcoes reutilizaveis. Script 01 com pipeline completo.

---

### TASK-007
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script que gera imagens de média anual de NDWI para cada ano (2015-2025).

#### Contexto (!obrigatório)
Para análise temporal, é necessário agregar as imagens NDWI em composições anuais usando a média. Isso reduz ruído e permite comparação entre anos.

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/02_media_anual.js (novo)
- **Dependências necessárias:** Script 01_coleta_ndwi.js
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Gera uma imagem de média NDWI para cada ano (2015-2025)
- [x] Cria ImageCollection com as 11 imagens anuais
- [x] Visualização no mapa com paleta de cores apropriada
- [x] Exporta imagens anuais como Assets ou Drive
- [x] Comentários em PT-BR explicando cada linha

#### Log de Andamento (atualizado pelo agente)

| Data | Sessão | Ação Realizada | Status ao Final |
|------|--------|----------------|-----------------|
| 2026-05-05 | 1 | Criado 02_media_anual.js com grafico temporal | concluída |

#### Resultado (preenchido ao concluir)
- **Data de conclusão:** 2026-05-05
- **Branch:** main
- **Commit(s):** pendente
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui grafico de serie temporal e estatisticas por ano

---

### TASK-008
- **Status:** concluída
- **Modo:** desenvolvimento
- **Complexidade:** minor
- **Data de criação:** 2026-05-05

#### Objetivo (!obrigatório)
Criar script que calcula diferença de NDWI entre 2015 e 2025, identificando incremento/decremento.

#### Contexto (!obrigatório)
Análise de variação temporal para responder: "Houve aumento ou redução no índice de água para SP no período analisado?" e "Quais regiões tiveram incremento ou decremento?"

#### Escopo Técnico (!obrigatório)
- **Arquivos/módulos envolvidos:** scripts/ndwi/03_variacao_temporal.js (novo)
- **Dependências necessárias:** Script 02_media_anual.js
- **Impacto em funcionalidades existentes:** nenhum

#### Critérios de Aceite (!obrigatório)
- [x] Calcula diferença: NDWI_2025 - NDWI_2015
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
- **Branch:** main
- **Commit(s):** pendente
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui classificacao em 3 classes e histograma de variacao

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
- **Branch:** main
- **Commit(s):** pendente
- **Avaliação pós-implementação:** aprovado
- **Observações:** Inclui ranking top 10 municipios, graficos e exportacao CSV

---

## Tasks Concluídas

> Tasks finalizadas. Movidas para cá após conclusão e atualização do Registro de Projeto (`registry.md`). Nunca remova entradas — o histórico é cumulativo.

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

## Tasks Descartadas

> Tasks que foram canceladas ou substituídas antes da implementação. Registre o motivo.

[nenhuma task descartada]

---

## Regras de Preenchimento

1. **O campo Objetivo deve caber em uma frase.** Se não cabe, a task é grande demais — quebre em subtasks.
2. **Uma task deve ser completável em uma sessão de desenvolvimento.** Se a estimativa de implementação excede uma sessão, ou se a task afeta mais de 10 arquivos, ela deve ser decomposta em subtasks independentes. Cada subtask recebe seu próprio TASK-NNN e segue o fluxo completo. O campo Contexto da subtask deve referenciar a task mãe.
3. **Critérios de Aceite são obrigatórios e verificáveis.** "Funcionar corretamente" não é critério. "Retornar status 200 para inputs válidos e 400 para inputs inválidos" é.
4. **Escopo Técnico deve listar arquivos concretos.** "Algumas telas" não serve. "src/screens/LoginScreen.tsx, src/services/authService.ts" serve.
5. **Uma task por implementação.** Se durante o desenvolvimento surgir necessidade de outra mudança fora do escopo, registre uma nova task — não expanda a atual.
6. **Tasks não são retroativas.** Código já implementado sem task registrada deve ser revisado (Modo Review) e documentado antes de prosseguir com novas tasks.
7. **O resultado é preenchido pelo agente** ao final da implementação, junto com a atualização do Registro de Projeto.
8. **Complexidade é obrigatória.** Toda task deve ser classificada como `patch`, `minor` ou `major`. Na dúvida, classifique para cima (minor em vez de patch, major em vez de minor). A classificação determina o nível de cerimônia da avaliação pós-implementação.
9. **A ordem na seção Tasks Ativas define prioridade.** A primeira task é a ativa. O agente não pula para a segunda sem que a primeira esteja concluída, descartada ou explicitamente pausada pelo usuário.
10. **O Log de Andamento é obrigatório para tasks `minor` e `major`.** O agente registra uma entrada a cada sessão em que trabalhar na task, incluindo interrupções e travamentos. Tasks `patch` podem omitir o log. O log captura o progresso intermediário; a conclusão final é registrada no Resultado da task e no Histórico de Implementações do `registry.md`.
11. **Tasks revertidas não são deletadas.** Ao reverter uma implementação, a task original recebe status `revertida` com nota explicativa, e uma nova task `fix` ou `revert` é criada referenciando a original.
