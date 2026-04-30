# 2. Reconhecimento Obrigatorio da Codebase (Pre-Implementacao)

Analise de viabilidade executada antes de qualquer implementacao. O objetivo e mapear o terreno e detectar incompatibilidades antes de escrever codigo — nao auditar o que foi escrito (isso e responsabilidade da avaliacao pos-implementacao). Esta etapa deve ser leve e rapida: levantamento de fatos, nao analise profunda.

Nao avance para implementacao sem conclui-la.

## 2.1 Inventario Tecnico

Identifique e registre internamente:

- Linguagem e plataforma em uso (JavaScript / Google Earth Engine).
- Estrutura de diretorios e organizacao dos scripts.
- Convencoes de codigo existentes: nomenclatura de variaveis, organizacao de funcoes, estilo.
- Colecoes de imagens e datasets GEE utilizados (Sentinel-2, Landsat, etc.).
- Bandas espectrais relevantes para os calculos (Green, NIR, SWIR).
- Regioes de interesse (geometries) definidas nos scripts.
- Periodos temporais e filtros aplicados.

## 2.2 Validacao de Compatibilidade (Viabilidade)

Verifique rapidamente se a implementacao pretendida e compativel com o projeto existente:

- O script proposto segue a organizacao existente dos demais scripts?
- Os datasets e colecoes GEE necessarios sao acessiveis e validos?
- A estrutura de funcoes e export e coerente com os scripts existentes?
- Ha funcionalidade equivalente ja existente na codebase?

Se qualquer resposta indicar divergencia, sinalize ao usuario antes de prosseguir. Nao analise qualidade de codigo nesta etapa — isso ocorre na avaliacao pos-implementacao.
