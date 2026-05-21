# agr1model — AI Agent Guidelines

> **Mandatory flow.** Read ALL files in `.claude/rules/` and `.claude/registry.md` before any implementation.

## Project

- **Name:** agr1model
- **Stack:** JavaScript (Google Earth Engine)
- **Structure:** scripts/ndwi/, scripts/utils/, docs/, data/

## Required Reading

Before any implementation, read in order:

1. `.claude/rules/00-trava-seguranca.md` — Security lock
2. `.claude/rules/01-principios.md` — Core principles
3. `.claude/rules/02-reconhecimento.md` — Codebase reconnaissance
4. `.claude/rules/03-modos-operacao.md` — Operating modes
5. `.claude/rules/04-avaliacao-pos.md` — Post-implementation evaluation
6. `.claude/rules/05-convencoes.md` — Code conventions
7. `.claude/rules/06-crura.md` — CRURA workflow
8. `.claude/rules/07-integridade.md` — Integrity rules
9. `.claude/rules/08-registro-projeto.md` — Project registry
10. `.claude/rules/09-enforcement.md` — Automated enforcement
11. `.claude/guides/guia-codex.md` — Codex integration guide
12. `.claude/guides/guia-portfolio.md` — Public portfolio guide
13. `.claude/registry.md` — Current project state

## Workflow Summary

1. Task registered in `.claude/tasks.md`
2. Mode declared (Development / Review / Tutor)
3. Codebase reconnaissance
4. Implementation following principles and conventions
5. Post-implementation evaluation
6. Update `.claude/registry.md`
7. CRURA — Change → Review → Upload → Review Again → Auto-Review

## Conventions

- **Commits:** `type(scope): subject` — no body, no co-authored-by
- **Branches:** `type/TASK-NNN-short-description`
- **Tasks:** complexity required (patch/minor/major)
- **Naming:** VAR Method (Data, Info, Manager, Handler, Service, Repository, Controller, Adapter, Mapper, Middleware, Provider, Hook)

## Critical Rules

- Never implement without a task registered in `.claude/tasks.md`
- Never invent APIs or methods — verify against official documentation
- Never modify code outside task scope — document unrelated issues, don't fix silently
- Always run post-implementation evaluation after every change
- Always update `.claude/registry.md` after every implementation
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
