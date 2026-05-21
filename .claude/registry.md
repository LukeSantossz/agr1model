# Registro de Projeto — Estado e Histórico

> Este arquivo contém o estado atual e histórico do projeto. É atualizado pelo agente ao final de cada implementação.
> As **regras** sobre como atualizar este registro estão em `.claude/rules/08-registro-projeto.md`.

---

## Informações do Projeto

- **Nome:** agr1model
- **Stack:** JavaScript (Google Earth Engine) + Python (análise estatística/correlação)
- **Repositório:** LukeSantossz/agr1model
- **Estrutura:** Scripts GEE para NDWI — scripts/ndwi/, scripts/utils/, docs/, data/

## Histórico de Implementações

> Registro de conclusões. Cada entrada representa uma task finalizada. O agente adiciona uma nova linha após cada task concluída. Nunca remova entradas anteriores.

| # | Data | Task | Complexidade | Escopo Alterado | Resultado | Observações |
|---|------|------|--------------|-----------------|-----------|-------------|
| 21 | 2026-05-20 | TASK-019 | minor | 2 arquivos — docs/ndwi-formulacao.md, registry.md | aprovado | Documenta formulação NDWI (McFeeters) e justifica a escolha |
| 20 | 2026-05-20 | TASK-027 | minor | 3 arquivos — CLAUDE.md, registry.md, tasks.md | aprovado | Adota Python na stack; resolve decisão pendente das TASK-023/024 |
| 19 | 2026-05-20 | TASK-018 | minor | 2 arquivos — tasks.md, registry.md | aprovado | Mapeia backlog do Notion (TASK-019–026) e remove tasks_notion.md |
| 18 | 2026-05-20 | TASK-017 | minor | 2 arquivos — scripts 04 + utils | aprovado | Renomeia ndwi2015/2025 → inicial/final; remove alias morto mascaraNuvensQA60 |
| 17 | 2026-05-20 | TASK-016 | minor | 4 arquivos — tasks.md + scripts 01/02/03 | aprovado | Reconcilia datas (2017) e máscara (SCL) com a implementação |
| 16 | 2026-05-20 | TASK-015 | minor | 5 arquivos — configs de agentes | aprovado | Atualiza refs .ai → .claude (migração TASK-012 incompleta) |
| 15 | 2026-05-20 | TASK-014 | minor | 2 arquivos — .claude/tasks.md, registry.md | aprovado | Restaura TASK-001–010 e corrige caminhos de enforcement na TASK-000 |
| 14 | 2026-05-20 | TASK-013 | patch | 1 arquivo — README.md | aprovado | Corrige referência .ai → .claude na estrutura |
| 13 | 2026-05-10 | TASK-012 | minor | 34 arquivos — .claude/, CLAUDE.md | aprovado | Migração framework v1.1.0, commit e5a72fe |
| 12 | 2026-05-06 | TASK-000 | major | 5 arquivos — .ai/hooks/, .ai/enforcement.conf | aprovado | Git hooks enforcement implementado |
| 11 | 2026-05-06 | TASK-011 | minor | 2 arquivos — .ai/tasks.md, .ai/registry.md | aprovado | Correcoes organizacionais auditoria |
| 10 | 2026-05-06 | TASK-010 | minor | 6 arquivos — scripts/, shape_files/, README.md | aprovado | GEE paths fix, memory optimization |
| 9 | 2026-05-05 | TASK-009 | minor | 1 arquivo — scripts/ndwi/04_hotspots_analise.js | aprovado | Ranking municipios, hotspots P90 |
| 8 | 2026-05-05 | TASK-008 | minor | 1 arquivo — scripts/ndwi/03_variacao_temporal.js | aprovado | Variacao 2015-2025, histograma |
| 7 | 2026-05-05 | TASK-007 | minor | 1 arquivo — scripts/ndwi/02_media_anual.js | aprovado | Serie temporal, graficos |
| 6 | 2026-05-05 | TASK-006 | major | 2 arquivos — scripts/ndwi/, scripts/utils/ | aprovado | Pipeline NDWI Sentinel-2 |
| 5 | 2026-05-05 | TASK-005 | patch | 1 arquivo — docs/gee-assets-setup.md | aprovado | Setup GEE Assets |
| 4 | 2026-05-05 | TASK-004 | minor | 2 arquivos — AGENTS.md, CONTRIBUTING.md | aprovado | Checklist agêntico: aplicado |
| 3 | 2026-05-05 | TASK-003 | minor | 1 arquivo — CONTRIBUTING.md | aprovado | Checklist agêntico: aplicado |
| 2 | 2026-05-05 | TASK-002 | minor | 1 arquivo — README.md | aprovado | Checklist agêntico: aplicado |
| 1 | 2026-05-05 | TASK-001 | major | 16 arquivos — .ai/rules/, .ai/ | aprovado | Checklist agêntico: aplicado |

## Estado da Codebase

> Atualizado a cada implementação ou verificação pós-pull. Reflete o snapshot mais recente do projeto.

- **Última atualização:** 2026-05-20
- **Último responsável:** Claude Code (Opus 4.7)
- **Branch ativa:** docs/TASK-019-formulacao-ndwi
- **Última task concluída:** TASK-019
- **Backlog ativo:** TASK-020 a TASK-026 (pendentes; TASK-019 concluída)

## Pendências Conhecidas

- [nenhuma registrada]

## Rastreabilidade Notion → .claude

> Mapa do backlog do Notion (board AGR, extração 2026-05-20) para as tasks deste projeto. Preservado na TASK-018 antes da remoção do `tasks_notion.md` (fonte). "Concluída" = entregue no código; "Pendente" = aguardando implementação.

| Notion | Descrição | Equivalente .claude | Status |
|--------|-----------|---------------------|--------|
| AGR-T3 | Obter imagens NDWI da série | TASK-006 | Concluída |
| AGR-T4 | Formulação NDWI (McFeeters × Gao) | TASK-019 | Concluída |
| AGR-T5 | Shapefile de municípios SP no GEE | TASK-005 + TASK-010 | Concluída |
| AGR-T6 | Composição de média anual | TASK-007 | Concluída |
| AGR-T7 | Delta NDWI por município | TASK-008 + TASK-009 | Concluída |
| AGR-T8 | Análise interpretativa (3 perguntas) | TASK-020 | Pendente (dados existem) |
| AGR-T9 | Melhorar paletas + legenda | TASK-021 | Pendente |
| AGR-T10 | NDWI via Landsat (2005-2015) | TASK-022 | Pendente |
| AGR-T11 | Correlação NDWI × precipitação | TASK-023 | Pendente |
| AGR-T12 | Diferença estatística entre anos | TASK-024 | Pendente |
| AGR-T13 | Outros índices espectrais | TASK-025 | Pendente |
| AGR-T14 | Revisão de literatura La Niña | TASK-026 | Pendente |

## Decisões Técnicas Relevantes

> Decisões tomadas durante implementações que afetam futuras tasks. Inclua justificativa breve.

- **Formulação do NDWI = McFeeters (1996) (TASK-019):** Adotada a fórmula (Green − NIR)/(Green + NIR) — alvo: água superficial, coerente com o objetivo do projeto e com resolução de 10 m (B3/B8). A formulação de Gao (1996), voltada à umidade da vegetação, fica para avaliação futura (TASK-025). Detalhes e justificativa em `docs/ndwi-formulacao.md`.

- **Adoção de Python na stack (2026-05-20, TASK-027):** Python autorizado pelo usuário para análise estatística/correlação (TASK-023 correlação com precipitação; TASK-024 ANOVA/Kruskal-Wallis), que não são viáveis nativamente no GEE. Stack passa a ser JavaScript (GEE) + Python. Dependências previstas: pandas, scipy, statsmodels, matplotlib. Resolve a "decisão de stack pendente" das TASK-023/024.

- **Migração .ai/ → .claude/ v1.1.0:** Framework atualizado para v1.1.0. Regras 10-12 consolidadas: engenharia agêntica integrada em 01/03, guias Codex e Portfólio extraídos para `.claude/guides/`. Templates movidos para `.claude/templates/`.

- **Sincronização .ai/rules/ com .claude_config/rules/:** As regras em `.claude/rules/` agora refletem a metodologia genérica (não específica GEE). Commits em inglês seguindo Conventional Commits.

- **Otimização de memória GEE:** Para evitar erro "User memory limit exceeded", os scripts usam: (1) geometria simplificada com maxError 1000m, (2) escala de 500m para visualização no mapa, (3) limite de 50 imagens por ano, (4) clip apenas no resultado final. Exportações mantêm resolução de 100m.

- **Git hooks enforcement:** Hooks implementados em `.claude/hooks/` validam automaticamente: (1) commit-msg: formato Conventional Commits, sem body, sem co-authorship; (2) pre-commit: detecta debug statements; (3) pre-push: valida nomenclatura de branch e task ativa; (4) post-merge: sinaliza necessidade de verificação pós-pull.

## Padrões Recorrentes Observados

| Padrão | Frequência | Impacto | Ação Corretiva |
|--------|------------|---------|----------------|
| — | — | — | — |

---

## Notas de Sessão

> Espaço para anotações pontuais sobre contextos que influenciam futuras sessões.

[nenhuma nota registrada]
