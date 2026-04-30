# 5. Convencoes de Codigo

## 5.1 Nomenclatura — VAR Method

O VAR Method e complementar as convencoes ja existentes no projeto, nao substituto. Se o projeto ja possui padroes de nomenclatura estabelecidos, eles tem precedencia. Os sufixos abaixo se aplicam quando nao ha convencao previa ou quando a convencao existente nao cobre o caso.

**Sufixos primarios:**

| Sufixo | Significado | Uso |
|--------|-------------|-----|
| `Data` | Dados brutos | Informacoes cruas, colecoes de imagens, valores de pixels. Ex: `ndwiData`, `precipitationData` |
| `Info` | Metadados | Dados processados, resumos descritivos, configuracao. Ex: `sensorInfo`, `regionInfo` |
| `Collection` | Colecao | Colecoes de imagens GEE. Ex: `sentinelCollection`, `landsatCollection` |
| `Image` | Imagem | Imagens individuais ou composites. Ex: `ndwiImage`, `medianImage` |

**Sufixos estendidos (aplicar conforme necessidade):**

| Sufixo | Significado | Uso |
|--------|-------------|-----|
| `Geometry` | Geometria | Regioes de interesse, pontos, poligonos. Ex: `studyAreaGeometry` |
| `Filter` | Filtro | Filtros temporais, espaciais ou por propriedade. Ex: `dateFilter`, `cloudFilter` |
| `Reducer` | Redutor | Operacoes de reducao sobre colecoes. Ex: `meanReducer`, `medianReducer` |
| `Chart` | Grafico | Series temporais e visualizacoes. Ex: `ndwiChart`, `timeSeriesChart` |
| `Params` | Parametros | Parametros de visualizacao ou exportacao. Ex: `visParams`, `exportParams` |

## 5.2 Commits — Conventional Commits

Estrutura obrigatoria: `!type(?scope): !subject`

- **type:** o tipo da alteracao (ver tabela abaixo).
- **scope:** o contexto da mudanca (opcional, entre parenteses).
- **subject:** mensagem descritiva no imperativo. Teste: "Se aplicado, este commit ira... [subject]".

| Tipo | Quando usar |
|------|-------------|
| `feat` | Novo script ou funcionalidade para analise |
| `fix` | Correcao de bug em script existente |
| `docs` | Alteracoes apenas na documentacao |
| `style` | Formatacao, espacos (sem mudar logica) |
| `refactor` | Refatoracao de codigo (sem corrigir bugs ou criar features) |
| `perf` | Melhoria de performance em processamento GEE |
| `test` | Criacao ou ajuste de scripts de validacao |
| `chore` | Alteracoes de organizacao ou configuracao |

Exemplos: `feat(ndwi): adiciona calculo NDWI para Sentinel-2`, `fix(filter): corrige intervalo temporal no filtro de datas`.

**Restricoes obrigatorias de commit:**

- **Sem body/description:** O commit contem APENAS a linha de subject. Nunca adicione corpo, rodape, paragrafos explicativos ou qualquer texto alem da primeira linha.
- **Sem Co-authored-by:** Nunca inclua trailers de co-autoria (`Co-authored-by`, `Signed-off-by`, etc.).
- **Formato final do comando:** `git commit -m "type(scope): subject"` — nada alem disso.

## 5.3 Branches — Nomenclatura

Toda branch de trabalho segue o formato: `type/TASK-NNN-descricao-curta`

- **type:** o mesmo tipo do Conventional Commits (feat, fix, refactor, etc.).
- **TASK-NNN:** referencia direta a task registrada em `.ai/tasks.md`.
- **descricao-curta:** 2 a 4 palavras separadas por hifen, descrevendo o escopo.

Exemplos: `feat/TASK-001-ndwi-sentinel2`, `fix/TASK-005-filtro-nuvens`, `refactor/TASK-010-funcoes-utils`.

O agente deve sugerir o nome da branch ao iniciar uma task, seguindo esta convencao.
