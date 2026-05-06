# Setup dos Assets no Google Earth Engine

Este documento descreve como fazer upload dos shapefiles de Sao Paulo para o Google Earth Engine.

## Nota sobre Periodo de Dados

Os scripts utilizam **Sentinel-2 SR Harmonized** (`COPERNICUS/S2_SR_HARMONIZED`), que esta disponivel apenas a partir de **2017-03-28**. Por isso, as analises temporais cobrem o periodo **2017-2025** (8 anos).

Referencia: [Sentinel-2 SR Harmonized Catalog](https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED)

## Arquivos Disponiveis

| Arquivo | Descricao | Asset ID |
|---------|-----------|----------|
| SP_UF_2024.zip | Limite do estado de SP | `users/luquinhas_gonzales/agr1model/SP_UF_2024` |
| SP_Municipios_2024.zip | Limites dos municipios | `users/luquinhas_gonzales/agr1model/SP_Municipios_2024` |
| SP_RG_Imediatas_2024.zip | Regioes geograficas imediatas | `users/luquinhas_gonzales/agr1model/SP_RG_Imediatas_2024` |
| SP_RG_Intermediarias_2024.zip | Regioes geograficas intermediarias | `users/luquinhas_gonzales/agr1model/SP_RG_Intermediarias_2024` |

## Instrucoes de Upload

### 1. Extrair os Arquivos ZIP

Cada arquivo .zip contem os seguintes componentes do shapefile:
- `.shp` - geometria
- `.shx` - indice espacial
- `.dbf` - atributos
- `.prj` - sistema de coordenadas

Extraia todos os arquivos de cada .zip em uma pasta local.

### 2. Acessar o GEE Code Editor

1. Acesse [code.earthengine.google.com](https://code.earthengine.google.com)
2. No painel esquerdo, clique na aba **Assets**
3. Navegue ate a pasta `users/luquinhas_gonzales/agr1model`
   - Se a pasta nao existir, crie-a clicando em **NEW** > **Folder**

### 3. Upload dos Shapefiles

Para cada shapefile:

1. Clique em **NEW** > **Shape files (.shp, .shx, .dbf, .prj)**
2. Selecione TODOS os arquivos do shapefile extraido (.shp, .shx, .dbf, .prj)
3. Defina o Asset ID conforme a tabela acima
4. Clique em **UPLOAD**
5. Aguarde o processamento (visivel na aba **Tasks**)

### 4. Verificar Upload

Apos o upload, verifique se os assets estao disponiveis:

```javascript
// Verificar se os assets foram carregados corretamente
var spUF = ee.FeatureCollection('users/luquinhas_gonzales/agr1model/SP_UF_2024');
var spMunicipios = ee.FeatureCollection('users/luquinhas_gonzales/agr1model/SP_Municipios_2024');

// Imprimir informacoes
print('SP UF:', spUF.first());
print('SP Municipios - total:', spMunicipios.size());

// Visualizar no mapa
Map.centerObject(spUF, 7);
Map.addLayer(spUF, {color: 'blue'}, 'Limite SP');
Map.addLayer(spMunicipios, {color: 'gray'}, 'Municipios SP');
```

## Asset ID Base

Todos os scripts deste projeto utilizam o seguinte prefixo para assets:

```
users/luquinhas_gonzales/agr1model/
```

## Resolucao de Problemas

### Erro "Asset not found"
- Verifique se o asset foi processado completamente (aba Tasks)
- Confirme se o Asset ID esta correto (case-sensitive)
- Verifique se o asset e publico ou se voce tem permissao de acesso

### Erro no upload
- Certifique-se de selecionar TODOS os arquivos do shapefile (.shp, .shx, .dbf, .prj)
- O arquivo .prj deve conter um sistema de coordenadas valido (EPSG:4326 ou SIRGAS 2000)
