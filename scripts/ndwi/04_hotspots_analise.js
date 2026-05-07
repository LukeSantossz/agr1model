/**
 * SCRIPT 04 - HOTSPOTS E ANALISE REGIONAL DE NDWI
 *
 * Este script identifica:
 * 1. Regioes com valores de NDWI muito maiores que outras (hotspots de agua)
 * 2. Regioes que se destacaram por aumento de agua nos ultimos 10 anos
 * 3. Regioes que se destacaram por reducao de agua nos ultimos 10 anos
 *
 * A analise e feita por municipio de Sao Paulo.
 *
 * Autor: agr1model
 * Data: 2026-05-05
 */

// ============================================================================
// IMPORTACAO DOS MODULOS
// ============================================================================

// Importa as funcoes utilitarias
var utils = require('users/luquinhas_gonzales/agrimodel:scripts/utils/sentinel2_utils');

// ============================================================================
// CONFIGURACOES
// ============================================================================

// Anos de analise
// NOTA: Sentinel-2 SR Harmonized disponivel apenas a partir de 2017-03-28
var ANO_INICIAL = 2017;
var ANO_FINAL = 2025;

// Percentis para identificacao de hotspots
var PERCENTIL_ALTO = 90;    // Top 10% = hotspots de agua
var PERCENTIL_BAIXO = 10;   // Bottom 10% = areas mais secas

// Limiar de variacao significativa
var LIMIAR_VARIACAO = 0.1;  // 0.1 unidades de NDWI

// Maximo de nuvens
var MAX_NUVENS = 20;

// Sistema de coordenadas para exportacao
var CRS = 'EPSG:4326';

// ============================================================================
// CARREGAMENTO DA AREA DE ESTUDO
// ============================================================================

// Carrega limites de SP
var limiteSP = utils.carregarLimiteSP();
// Simplifica a geometria para reduzir consumo de memoria (tolerancia de 1000m)
var geometriaSP = limiteSP.geometry().simplify({maxError: 1000});

// Carrega municipios de SP para analise regional
var municipiosSP = utils.carregarMunicipiosSP();

// Imprime informacoes
print('=== HOTSPOTS E ANALISE REGIONAL ===');
print('Numero de municipios:', municipiosSP.size());

// ============================================================================
// FUNCAO: Calcular media anual
// ============================================================================

var calcularMediaAnual = function(ano) {
  // Para 2017, comeca em marco (quando Sentinel-2 SR Harmonized iniciou)
  var mesInicio = (ano === 2017) ? 3 : 1;
  var diaInicio = (ano === 2017) ? 28 : 1;
  var dataInicio = ee.Date.fromYMD(ano, mesInicio, diaInicio);
  // Data final exclusiva (1 de janeiro do proximo ano)
  var dataFim = ee.Date.fromYMD(ano + 1, 1, 1);

  var colecao = utils.obterColecaoS2(dataInicio, dataFim, geometriaSP, MAX_NUVENS)
    .map(utils.processarImagemNDWI)
    .map(function(img) { return img.clip(geometriaSP); });

  return colecao.mean().rename('NDWI');
};

// ============================================================================
// CALCULO DAS IMAGENS BASE
// ============================================================================

print('=== CALCULANDO IMAGENS BASE ===');

// NDWI 2015, 2025 e media geral
var ndwi2015 = calcularMediaAnual(ANO_INICIAL);
var ndwi2025 = calcularMediaAnual(ANO_FINAL);

// Media de todos os anos (2015-2025) para analise de hotspots
var listaAnos = ee.List.sequence(ANO_INICIAL, ANO_FINAL);
var todasMedias = listaAnos.map(function(ano) {
  return calcularMediaAnual(ee.Number(ano).toInt());
});
var ndwiMediaGeral = ee.ImageCollection.fromImages(todasMedias).mean().rename('NDWI');

// Variacao temporal
var variacao = ndwi2025.subtract(ndwi2015).rename('variacao');

print('Imagens calculadas');

// ============================================================================
// IDENTIFICACAO DE HOTSPOTS (PERCENTIS)
// ============================================================================

print('=== IDENTIFICANDO HOTSPOTS ===');

// Calcula os percentis do NDWI medio
var percentis = ndwiMediaGeral.reduceRegion({
  reducer: ee.Reducer.percentile([PERCENTIL_BAIXO, PERCENTIL_ALTO]),
  geometry: geometriaSP,
  scale: 100,
  maxPixels: 1e13,
  bestEffort: true
});

// Extrai valores dos percentis
var valorP10 = ee.Number(percentis.get('NDWI_p10'));
var valorP90 = ee.Number(percentis.get('NDWI_p90'));

print('Percentil 10 (areas secas):', valorP10);
print('Percentil 90 (hotspots agua):', valorP90);

// Cria mascara de hotspots (top 10% de NDWI)
// Essas sao as regioes com mais presenca de agua
var hotspots = ndwiMediaGeral.gte(valorP90).rename('hotspots');

// Cria mascara de areas secas (bottom 10% de NDWI)
var areaSecas = ndwiMediaGeral.lte(valorP10).rename('areas_secas');

// ============================================================================
// IDENTIFICACAO DE MUDANCAS SIGNIFICATIVAS
// ============================================================================

print('=== IDENTIFICANDO MUDANCAS SIGNIFICATIVAS ===');

// Regioes com maior GANHO de agua (variacao > limiar)
var ganhoAgua = variacao.gt(LIMIAR_VARIACAO).rename('ganho_agua');

// Regioes com maior PERDA de agua (variacao < -limiar)
var perdaAgua = variacao.lt(-LIMIAR_VARIACAO).rename('perda_agua');

// Conta pixels
var pixelsGanho = ganhoAgua.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometriaSP,
  scale: 100,
  maxPixels: 1e13
});

var pixelsPerda = perdaAgua.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometriaSP,
  scale: 100,
  maxPixels: 1e13
});

print('Pixels com ganho significativo de agua:', pixelsGanho);
print('Pixels com perda significativa de agua:', pixelsPerda);

// ============================================================================
// ANALISE POR MUNICIPIO
// ============================================================================

print('=== ANALISE POR MUNICIPIO ===');

/**
 * Analise por municipio usando reduceRegions (mais eficiente que reduceRegion em map)
 * reduceRegions processa todos os municipios de uma vez, evitando timeout/memoria
 */

// Combina todas as bandas necessarias em uma unica imagem
var imagemAnalise = ndwiMediaGeral.rename('NDWI_media')
  .addBands(variacao.rename('variacao'))
  .addBands(hotspots.multiply(ee.Image.pixelArea()).rename('area_hotspot'));

// Usa reduceRegions para calcular estatisticas de todos os municipios de uma vez
// Isso e muito mais eficiente que chamar reduceRegion para cada municipio
var municipiosAnalisados = imagemAnalise.reduceRegions({
  collection: municipiosSP,
  reducer: ee.Reducer.mean()              // Media do NDWI e variacao
    .combine(ee.Reducer.stdDev(), '', true)   // Desvio padrao
    .combine(ee.Reducer.sum(), '', true),     // Soma para area de hotspot
  scale: 100,
  tileScale: 4                            // Aumenta paralelismo para evitar timeout
});

// Adiciona calculos derivados (percentual de hotspot)
municipiosAnalisados = municipiosAnalisados.map(function(feature) {
  var areaTotal = feature.geometry().area();
  var areaHotspot = ee.Number(feature.get('area_hotspot_sum')).multiply(0.0001); // Converte para proporcao
  var pctHotspot = areaHotspot.divide(areaTotal).multiply(100);

  return feature.set({
    'ndwi_media': feature.get('NDWI_media_mean'),
    'ndwi_desvio': feature.get('NDWI_media_stdDev'),
    'variacao_media': feature.get('variacao_mean'),
    'variacao_desvio': feature.get('variacao_stdDev'),
    'area_total_m2': areaTotal,
    'pct_hotspot': pctHotspot
  });
});

print('Analise por municipio concluida (usando reduceRegions)');

// ============================================================================
// RANKING DE MUNICIPIOS
// ============================================================================

print('=== RANKING DE MUNICIPIOS ===');

// Top 10 municipios com maior NDWI medio (mais agua)
var topNDWI = municipiosAnalisados
  .sort('ndwi_media', false)  // false = ordem decrescente
  .limit(10);

print('Top 10 municipios - Maior NDWI medio (mais agua):');
print(topNDWI.select(['NM_MUN', 'ndwi_media', 'pct_hotspot']));

// Top 10 municipios com maior GANHO de agua
var topGanho = municipiosAnalisados
  .sort('variacao_media', false)
  .limit(10);

print('Top 10 municipios - Maior GANHO de agua (2017-2025):');
print(topGanho.select(['NM_MUN', 'variacao_media']));

// Top 10 municipios com maior PERDA de agua
var topPerda = municipiosAnalisados
  .sort('variacao_media', true)  // true = ordem crescente (mais negativo primeiro)
  .limit(10);

print('Top 10 municipios - Maior PERDA de agua (2017-2025):');
print(topPerda.select(['NM_MUN', 'variacao_media']));

// ============================================================================
// GRAFICOS
// ============================================================================

print('=== GRAFICOS ===');

// Grafico: Distribuicao do NDWI medio por municipio
var graficoNDWI = ui.Chart.feature.histogram({
  features: municipiosAnalisados,
  property: 'ndwi_media',
  maxBuckets: 30
})
.setOptions({
  title: 'Distribuicao do NDWI Medio por Municipio',
  hAxis: {title: 'NDWI Medio'},
  vAxis: {title: 'Numero de Municipios'},
  colors: ['#4575b4'],
  legend: {position: 'none'}
});

print(graficoNDWI);

// Grafico: Distribuicao da variacao por municipio
var graficoVariacao = ui.Chart.feature.histogram({
  features: municipiosAnalisados,
  property: 'variacao_media',
  maxBuckets: 30
})
.setOptions({
  title: 'Distribuicao da Variacao de NDWI por Municipio (2017-2025)',
  hAxis: {title: 'Variacao Media'},
  vAxis: {title: 'Numero de Municipios'},
  colors: ['#2166ac'],
  legend: {position: 'none'}
});

print(graficoVariacao);

// Grafico de dispersao: NDWI medio vs Variacao
var graficoDispersao = ui.Chart.feature.byFeature({
  features: municipiosAnalisados.limit(100),  // Limita para performance
  xProperty: 'ndwi_media',
  yProperties: ['variacao_media']
})
.setChartType('ScatterChart')
.setOptions({
  title: 'NDWI Medio vs Variacao por Municipio',
  hAxis: {title: 'NDWI Medio (2017-2025)'},
  vAxis: {title: 'Variacao (2025 - 2017)'},
  pointSize: 3,
  colors: ['#4575b4'],
  legend: {position: 'none'},
  trendlines: {0: {color: 'red', lineWidth: 2}}  // Linha de tendencia
});

print(graficoDispersao);

// ============================================================================
// VISUALIZACAO NO MAPA
// ============================================================================

print('=== VISUALIZACAO NO MAPA ===');

// Centraliza o mapa
Map.centerObject(geometriaSP, 7);

// Parametros de visualizacao
var visNDWI = utils.visParamsNDWI();

// Adiciona camadas base
Map.addLayer(limiteSP, {color: 'black'}, 'Limite SP', true, 0.3);

// Reproject para reduzir consumo de memoria (escala 100m)
var ndwiMediaGeralVis = ndwiMediaGeral.reproject({crs: 'EPSG:4326', scale: 100});
var hotspotsVis = hotspots.reproject({crs: 'EPSG:4326', scale: 100});
var areaSecasVis = areaSecas.reproject({crs: 'EPSG:4326', scale: 100});
var ganhoAguaVis = ganhoAgua.reproject({crs: 'EPSG:4326', scale: 100});
var perdaAguaVis = perdaAgua.reproject({crs: 'EPSG:4326', scale: 100});
var variacaoVis = variacao.reproject({crs: 'EPSG:4326', scale: 100});

// NDWI medio com paleta
Map.addLayer(ndwiMediaGeralVis, visNDWI, 'NDWI Medio (2017-2025)', false);

// Hotspots de agua (top 10%)
Map.addLayer(hotspotsVis.selfMask(), {palette: ['#0571b0']}, 'Hotspots de Agua (Top 10%)', true);

// Areas secas (bottom 10%)
Map.addLayer(areaSecasVis.selfMask(), {palette: ['#ca0020']}, 'Areas Mais Secas (Bottom 10%)', false);

// Ganho significativo de agua
Map.addLayer(ganhoAguaVis.selfMask(), {palette: ['#1a9850']}, 'Ganho Significativo de Agua', false);

// Perda significativa de agua
Map.addLayer(perdaAguaVis.selfMask(), {palette: ['#d73027']}, 'Perda Significativa de Agua', false);

// Variacao com paleta divergente
var visVariacao = {
  min: -0.3,
  max: 0.3,
  palette: ['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf',
            '#e0f3f8', '#abd9e9', '#74add1', '#4575b4']
};
Map.addLayer(variacaoVis, visVariacao, 'Variacao NDWI', false);

// Municipios coloridos por NDWI medio
// Cria imagem a partir dos municipios
var municipiosNDWI = municipiosAnalisados.reduceToImage({
  properties: ['ndwi_media'],
  reducer: ee.Reducer.first()
}).reproject({crs: 'EPSG:4326', scale: 100});

Map.addLayer(municipiosNDWI.clip(geometriaSP), visNDWI, 'NDWI por Municipio', false);

// Municipios coloridos por variacao
var municipiosVariacao = municipiosAnalisados.reduceToImage({
  properties: ['variacao_media'],
  reducer: ee.Reducer.first()
}).reproject({crs: 'EPSG:4326', scale: 100});

Map.addLayer(municipiosVariacao.clip(geometriaSP), visVariacao, 'Variacao por Municipio', false);

// ============================================================================
// RESUMO DAS RESPOSTAS
// ============================================================================

print('');
print('========================================');
print('RESUMO DAS ANALISES (2017-2025)');
print('========================================');
print('');
print('NOTA: Periodo 2017-2025 (Sentinel-2 SR Harmonized');
print('      disponivel apenas a partir de 2017-03-28)');
print('');
print('1. HA REGIOES COM NDWI MUITO MAIOR QUE OUTRAS?');
print('   SIM - Os hotspots (areas azuis no mapa) representam');
print('   o top 10% de presenca de agua em SP.');
print('   Percentil 90 do NDWI:', valorP90);
print('');
print('2. HOUVE REGIOES COM DESTAQUE POR AUMENTO DE AGUA?');
print('   Consulte "Top 10 municipios - Maior GANHO" acima.');
print('   Areas verdes no mapa indicam ganho significativo (>0.1).');
print('');
print('3. HOUVE REGIOES COM DESTAQUE POR REDUCAO DE AGUA?');
print('   Consulte "Top 10 municipios - Maior PERDA" acima.');
print('   Areas vermelhas no mapa indicam perda significativa (<-0.1).');
print('');
print('========================================');

// ============================================================================
// EXPORTACAO
// ============================================================================

print('=== EXPORTACAO ===');

// Exporta tabela de municipios com estatisticas
Export.table.toDrive({
  collection: municipiosAnalisados,
  description: 'NDWI_SP_Analise_Municipios',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_municipios',
  fileFormat: 'CSV'
});

// Exporta mapa de hotspots
Export.image.toDrive({
  image: hotspots.selfMask().toInt(),
  description: 'NDWI_SP_Hotspots',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_hotspots',
  region: geometriaSP,
  scale: 100,
  crs: CRS,                       // Sistema de coordenadas explicito
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Exporta mapa de ganho/perda combinado
var ganhoPerdaMapa = ee.Image(0)
  .where(ganhoAgua, 1)
  .where(perdaAgua, -1)
  .rename('ganho_perda')
  .clip(geometriaSP);

Export.image.toDrive({
  image: ganhoPerdaMapa,
  description: 'NDWI_SP_Ganho_Perda',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_ganho_perda',
  region: geometriaSP,
  scale: 100,
  crs: CRS,                       // Sistema de coordenadas explicito
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

print('Tarefas de exportacao configuradas. Execute na aba Tasks.');

// ============================================================================
// EXPORTACAO PARA OUTROS SCRIPTS
// ============================================================================

exports.municipiosAnalisados = municipiosAnalisados;
exports.hotspots = hotspots;
exports.ganhoAgua = ganhoAgua;
exports.perdaAgua = perdaAgua;
exports.ndwiMediaGeral = ndwiMediaGeral;
exports.variacao = variacao;
