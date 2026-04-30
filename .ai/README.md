# Configuracao de IA — agr1model

Esta pasta contem todas as diretrizes que governam agentes de IA neste projeto.

## Estrutura

```
.ai/
├── rules/                        # Regras detalhadas de operacao
│   ├── 00-trava-seguranca.md     # Condicoes obrigatorias
│   ├── 01-principios.md          # Principios fundamentais
│   ├── 02-reconhecimento.md      # Inventario tecnico pre-implementacao
│   ├── 03-modos-operacao.md      # Desenvolvimento, Review, Tutor
│   ├── 04-avaliacao-pos.md       # Protocolo pos-implementacao
│   ├── 05-convencoes.md          # VAR Method, Conventional Commits, branches
│   ├── 06-crura.md               # Fluxo CRURA + checklist + reversao
│   ├── 07-integridade.md         # 12 regras inviolaveis
│   ├── 08-registro-projeto.md    # Regras de atualizacao do registry
│   └── 09-enforcement.md         # Hooks git automatizados
├── registry.md                   # Estado do projeto + historico (mutavel)
├── tasks.md                      # Registro de tasks (mutavel)
└── README.md                     # Este arquivo
```

## Pontos de Entrada por Provedor

Os arquivos abaixo ficam na raiz do repositorio (exigencia de cada ferramenta) e apontam para esta pasta:

| Provedor | Arquivo |
|----------|---------|
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursorrules` |
| Windsurf | `.windsurfrules` |
