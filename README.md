# agr1model

Estudo de indices NDWI (Normalized Difference Water Index) para modelagem computacional climatica.

Este repositorio reune scripts JavaScript utilizados no [Google Earth Engine (GEE)](https://earthengine.google.com/) para testes e validacoes de tasks relacionadas a analise de recursos hidricos e variaveis climaticas.

## Estrutura do Projeto

```
agr1model/
├── .ai/                         # Configuracao centralizada para agentes de IA
│   ├── rules/                   # Regras detalhadas de operacao (00..09)
│   ├── registry.md              # Estado e historico do projeto
│   └── tasks.md                 # Registro de tasks
├── scripts/
│   ├── ndwi/                    # Scripts GEE para calculo e analise de NDWI
│   └── utils/                   # Funcoes auxiliares e utilitarios reutilizaveis
├── docs/                        # Documentacao, referencias e notas tecnicas
├── data/                        # Dados de entrada, amostras e resultados exportados
├── CLAUDE.md                    # Ponto de entrada — Claude Code
├── .cursorrules                 # Ponto de entrada — Cursor
├── .windsurfrules               # Ponto de entrada — Windsurf
├── .github/copilot-instructions.md  # Ponto de entrada — GitHub Copilot
├── LICENSE
└── README.md
```

## Como Usar

1. Acesse o [Google Earth Engine Code Editor](https://code.earthengine.google.com/).
2. Copie o conteudo do script `.js` desejado da pasta `scripts/`.
3. Cole no editor do GEE e execute.

## Requisitos

- Conta ativa no [Google Earth Engine](https://signup.earthengine.google.com/).

## Licenca

Este projeto esta licenciado sob os termos do arquivo [LICENSE](LICENSE).