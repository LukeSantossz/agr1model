# Contributing to agr1model

Thank you for your interest in contributing. This document outlines our development workflow and explains how to work with AI-assisted IDEs in this project.

## Table of Contents

- [Development Workflow](#development-workflow)
- [AI-Assisted Development](#ai-assisted-development)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)

## Development Workflow

This project follows a structured workflow defined in `.ai/rules/`. Every contribution must adhere to these rules.

### 1. Register a Task

Before any implementation, create a task in `.ai/tasks.md`:

```markdown
### TASK-NNN
- **Status:** pendente
- **Modo:** desenvolvimento
- **Complexidade:** patch | minor | major
- **Data de criação:** YYYY-MM-DD

#### Objetivo
[Clear, one-sentence description of what needs to be done]

#### Critérios de Aceite
- [ ] [Verifiable criterion 1]
- [ ] [Verifiable criterion 2]
```

### 2. Create a Branch

Branch naming follows the pattern: `type/TASK-NNN-short-description`

```bash
git checkout -b feat/TASK-042-add-cloud-masking
```

### 3. Implement

Follow the principles in `.ai/rules/01-principios.md`:

- Think before coding — expose assumptions and trade-offs
- Simplicity first — minimal code that solves the problem
- Surgical changes — touch only what's necessary

### 4. Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(ndwi): add cloud masking for Sentinel-2"
```

**Rules:**
- Subject line only — no body, no footer
- No `Co-authored-by` trailers
- Imperative mood ("add" not "added")

### 5. Create Pull Request

Use the template in `.ai/pr-template.md`. Every PR must include:

- Context and motivation
- List of changes
- Testing instructions
- Self-review checklist

## AI-Assisted Development

This project is configured for multiple AI-powered IDEs. Each tool reads project-specific rules to ensure consistent behavior.

### Supported IDEs

| IDE | Configuration File | How to Use |
|-----|-------------------|------------|
| **Claude Code** | `CLAUDE.md` | Open terminal, run `claude` in project root |
| **OpenAI Codex** | `AGENTS.md` | Open terminal, run `codex` in project root |
| **Cursor** | `.cursorrules` | Open project in Cursor — rules load automatically |
| **Windsurf** | `.windsurfrules` | Open project in Windsurf — rules load automatically |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Works in VS Code/JetBrains with Copilot extension |

### AI Agent Rules

All AI agents must follow the rules in `.ai/rules/`:

| Rule | Purpose |
|------|---------|
| `00-trava-seguranca.md` | Security lock — no code without registered task |
| `01-principios.md` | Core principles — simplicity, surgical changes |
| `02-reconhecimento.md` | Codebase reconnaissance before implementation |
| `03-modos-operacao.md` | Operating modes (Development, Review, Tutor) |
| `04-avaliacao-pos.md` | Post-implementation evaluation protocol |
| `05-convencoes.md` | Code conventions (VAR Method, Conventional Commits) |
| `06-crura.md` | CRURA workflow (Change → Review → Upload → Review Again → Auto-Review) |
| `07-integridade.md` | Integrity rules — what agents must never do |
| `08-registro-projeto.md` | Project registry update rules |
| `09-enforcement.md` | Automated enforcement via git hooks |
| `10-engenharia-agentica.md` | Agentic engineering methodology |
| `11-integracao-codex.md` | Claude Code + Codex integration |
| `12-portfolio-publico.md` | Public portfolio standards |

### Operating Modes

When starting a session, declare your operating mode:

- **Development** — Agent implements code directly
- **Review** — Agent reviews AI-generated code critically
- **Tutor** — Agent guides without providing ready-made code

### Critical Rules for AI Agents

1. **Never implement without a registered task** in `.ai/tasks.md`
2. **Never invent APIs or methods** — verify against official documentation
3. **Never modify code outside task scope** — document unrelated issues, don't fix silently
4. **Always run post-implementation evaluation** after every change
5. **Always update `.ai/registry.md`** after every implementation

### Setting Up Claude Code

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Navigate to project
cd agr1model

# Start session
claude

# Declare mode when prompted
> Modo: desenvolvimento
```

### Setting Up OpenAI Codex

```bash
# Install Codex CLI
npm install -g @openai/codex

# Navigate to project
cd agr1model

# Start session (reads AGENTS.md automatically)
codex

# Or start in full-auto mode
codex --approval-mode full-auto
```

**Configuration options** in `.codex/config.toml`:

```toml
model = "codex-1"
approval_mode = "suggest"
```

### Setting Up Cursor

1. Install [Cursor](https://cursor.sh/)
2. Open the project folder
3. `.cursorrules` loads automatically
4. Use Cmd/Ctrl+K for AI assistance

### Setting Up Windsurf

1. Install [Windsurf](https://codeium.com/windsurf)
2. Open the project folder
3. `.windsurfrules` loads automatically
4. AI follows project conventions

### Setting Up GitHub Copilot

1. Install GitHub Copilot extension in VS Code or JetBrains
2. Open the project
3. Copilot reads `.github/copilot-instructions.md`
4. Suggestions follow project patterns

## Commit Conventions

### Types

| Type | When to Use |
|------|-------------|
| `feat` | New functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting (no logic change) |
| `refactor` | Code refactoring |
| `perf` | Performance improvement |
| `test` | Tests |
| `chore` | Build, tools, configuration |
| `build` | Dependencies or build system |
| `ci` | CI configuration |
| `revert` | Revert a previous commit |

### Examples

```bash
# Good
git commit -m "feat(ndwi): add temporal filtering for dry season"
git commit -m "fix(utils): handle empty collection in export function"
git commit -m "docs: update README with architecture diagram"

# Bad
git commit -m "update code"
git commit -m "fix bug"
git commit -m "WIP"
```

## Pull Request Process

1. **Push your branch**
   ```bash
   git push -u origin feat/TASK-042-add-cloud-masking
   ```

2. **Create PR** using the template in `.ai/pr-template.md`

3. **Self-review** in the "Files Changed" tab before requesting review

4. **Address feedback** with additional commits (no force-push)

5. **Merge** after approval (squash or merge commit, depending on PR size)

## Questions?

If you have questions about the contribution process or AI tooling setup, open an issue with the `question` label.
