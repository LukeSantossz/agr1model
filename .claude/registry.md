# Registro de Projeto — Estado e Histórico

> Este arquivo contém o estado atual e histórico do projeto. É atualizado pelo agente ao final de cada implementação.
> As **regras** sobre como atualizar este registro estão em `.claude/rules/08-registro-projeto.md`.

---

## Informações do Projeto

- **Nome:** agr1model
- **Stack:** JavaScript (Google Earth Engine)
- **Repositório:** LukeSantossz/agr1model
- **Estrutura:** Scripts GEE para NDWI — scripts/ndwi/, scripts/utils/, docs/, data/

## Histórico de Implementações

> Registro de conclusões. Cada entrada representa uma task finalizada. O agente adiciona uma nova linha após cada task concluída. Nunca remova entradas anteriores.

| # | Data | Task | Complexidade | Escopo Alterado | Resultado | Observações |
|---|------|------|--------------|-----------------|-----------|-------------|
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
- **Branch ativa:** docs/TASK-016-reconcilia-criterios-ndwi
- **Última task concluída:** TASK-016

## Pendências Conhecidas

- **TASK-017 (proposta):** identificadores enganosos remanescentes (não-funcionais), detectados na TASK-016 — requerem refatoração: (1) `scripts/ndwi/04_hotspots_analise.js` usa `ndwi2015`/`ndwi2025` e comentários "2015", embora calcule a partir de `ANO_INICIAL` (2017); (2) `scripts/utils/sentinel2_utils.js` mantém o alias `mascaraNuvensQA60` apontando para a máscara SCL (compatibilidade) — nome sugere QA60.

## Decisões Técnicas Relevantes

> Decisões tomadas durante implementações que afetam futuras tasks. Inclua justificativa breve.

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
