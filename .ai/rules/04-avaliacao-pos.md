# 4. Protocolo de Avaliacao Pos-Implementacao

Apos cada implementacao concluida, o agente executa obrigatoriamente esta verificacao antes de apresentar o resultado ao usuario. Este protocolo e automatico e nao requer solicitacao.

## 4.0 Nivel de Cerimonia por Complexidade

A profundidade da avaliacao e proporcional a complexidade da task, conforme classificada em `.ai/tasks.md`:

- **Patch** (renomear variavel, corrigir typo, ajustar parametro, remover codigo morto): Verificacao rapida — apenas 4.1 (conformidade) e 4.3 (impacto) em formato resumido. Relatorio em uma linha.
- **Minor** (implementar funcao isolada, corrigir bug localizado, adicionar novo filtro): Verificacao padrao — todas as subsecoes (4.1 a 4.4) aplicadas.
- **Major** (novo script completo, refatoracao de multiplos arquivos, novo indice espectral): Verificacao completa — todas as subsecoes com atencao redobrada em 4.3 (impacto no escopo). O agente deve listar explicitamente todos os scripts que interagem com o codigo alterado.

## 4.1 Verificacao de Conformidade

Compare o que foi produzido contra o que foi solicitado:

- Todos os requisitos explicitos foram atendidos?
- Ha criterios de aceite definidos? Todos foram cobertos?
- O codigo implementa exatamente o que foi pedido — nem mais, nem menos?
- Alguma premissa foi assumida sem validacao com o usuario?

## 4.2 Verificacao de Qualidade

Avalie o codigo produzido contra os padroes do projeto:

- Segue as convencoes de nomenclatura do projeto?
- Segue a organizacao e padroes ja estabelecidos nos demais scripts?
- As bandas espectrais utilizadas sao corretas para o indice calculado?
- Filtros temporais e espaciais estao corretos?
- Nao ha variaveis nao utilizadas, print() residuais, ou comentarios desnecessarios?
- A complexidade e proporcional ao problema?

## 4.3 Verificacao de Impacto no Escopo

Analise se a implementacao introduz conflitos com o restante da codebase:

- A mudanca altera o comportamento de scripts existentes?
- Ha funcoes utilitarias compartilhadas que dependem do trecho alterado e que podem quebrar?
- Existe duplicacao de logica com codigo ja existente em outros scripts?
- Os parametros de export (escala, CRS, regiao) sao consistentes com os demais scripts?

Se qualquer conflito for identificado, reporte ao usuario com a seguinte estrutura:

```
CONFLITO DETECTADO
- Arquivo(s) afetado(s): [listar]
- Natureza do conflito: [descrever]
- Impacto potencial: [descrever]
- Recomendacao: [acao sugerida]
```

## 4.4 Relatorio de Avaliacao

Ao concluir a verificacao, apresente um resumo compacto:

```
AVALIACAO POS-IMPLEMENTACAO
- Conformidade: [ok / pendencias listadas]
- Qualidade: [ok / pontos de atencao listados]
- Impacto no escopo: [ok / conflitos listados]
- Decisao: [pronto para commit / requer ajustes]
```
