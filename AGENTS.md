# agr1model — AI Agent Guidelines

> **Mandatory flow.** Read ALL files in `.ai/rules/` and `.ai/registry.md` before any implementation.

## Project

- **Name:** agr1model
- **Stack:** JavaScript (Google Earth Engine)
- **Structure:** scripts/ndwi/, scripts/utils/, docs/, data/

## Required Reading

Before any implementation, read in order:

1. `.ai/rules/00-trava-seguranca.md` — Security lock
2. `.ai/rules/01-principios.md` — Core principles
3. `.ai/rules/02-reconhecimento.md` — Codebase reconnaissance
4. `.ai/rules/03-modos-operacao.md` — Operating modes
5. `.ai/rules/04-avaliacao-pos.md` — Post-implementation evaluation
6. `.ai/rules/05-convencoes.md` — Code conventions
7. `.ai/rules/06-crura.md` — CRURA workflow
8. `.ai/rules/07-integridade.md` — Integrity rules
9. `.ai/rules/08-registro-projeto.md` — Project registry
10. `.ai/rules/09-enforcement.md` — Automated enforcement
11. `.ai/rules/10-engenharia-agentica.md` — Agentic engineering
12. `.ai/rules/11-integracao-codex.md` — Codex integration
13. `.ai/rules/12-portfolio-publico.md` — Public portfolio
14. `.ai/registry.md` — Current project state

## Workflow Summary

1. Task registered in `.ai/tasks.md`
2. Mode declared (Development / Review / Tutor)
3. Codebase reconnaissance
4. Implementation following principles and conventions
5. Post-implementation evaluation
6. Update `.ai/registry.md`
7. CRURA — Change → Review → Upload → Review Again → Auto-Review

## Conventions

- **Commits:** `type(scope): subject` — no body, no co-authored-by
- **Branches:** `type/TASK-NNN-short-description`
- **Tasks:** complexity required (patch/minor/major)
- **Naming:** VAR Method (Data, Info, Manager, Handler, Service, Repository, Controller, Adapter, Mapper, Middleware, Provider, Hook)

## Critical Rules

- Never implement without a task registered in `.ai/tasks.md`
- Never invent APIs or methods — verify against official documentation
- Never modify code outside task scope — document unrelated issues, don't fix silently
- Always run post-implementation evaluation after every change
- Always update `.ai/registry.md` after every implementation
- Never accept AI output without review — vibe coding is prohibited

## Operating Modes

When starting a session, the user declares one of:

- **Development** — Agent implements code directly
- **Review** — Agent reviews AI-generated code critically
- **Tutor** — Agent guides without providing ready-made code

## GEE-Specific Rules

This project uses Google Earth Engine. Additional rules apply:

- Verify spectral bands against sensor documentation (Sentinel-2, Landsat)
- Validate temporal and spatial filters before execution
- Check reducer usage (mean vs median) based on analysis requirements
- Ensure export parameters (scale, CRS, region) match sensor specifications
