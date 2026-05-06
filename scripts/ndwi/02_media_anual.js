/**
 * SCRIPT 02 - MEDIA ANUAL DE NDWI PARA SAO PAULO
 *
 * Este script calcula a media anual do NDWI para cada ano de 2015 a 2025,
 * gerando uma ImageCollection com 11 imagens (uma por ano).
 *
 * A media anual reduz ruidos e permite comparacao temporal entre anos.
 *
 * Autor: agr1model
 * Data: 2026-05-05
 */

// ============================================================================
// IMPORTACAO DOS MODULOS
// ============================================================================

// Importa as funcoes utilitarias
var utils = require('users/luquinhas_gonzales/agr1model:scripts/utils/sentinel2_utils');

// ============================================================================
// CONFIGURACOES
// ============================================================================

// Anos para analise (2017 a 2025 = 9 anos)
// NOTA: Sentinel-2 SR Harmonized disponivel apenas a partir de 2017-03-28
// Referencia: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED
var ANO_INICIO = 2017;
var ANO_FIM = 2025;

// Lista de anos para iteracao
var listaAnos = ee.List.sequence(ANO_INICIO, ANO_FIM);

// Percentual maximo de cobertura de nuvens
var MAX_NUVENS = 20;

// Sistema de coordenadas para exportacao
var CRS = 'EPSG:4326';

// ============================================================================
// CARREGAMENTO DA AREA DE ESTUDO
// ============================================================================

// Carrega o limite do estado de Sao Paulo
var limiteSP = utils.carregarLimiteSP();

// Extrai a geometria para uso nos filtros e recortes
var geometriaSP = limiteSP.geometry();

// Imprime informacoes iniciais
print('=== MEDIA ANUAL NDWI - SAO PAULO ===');
print('Periodo:', ANO_INICIO, 'a', ANO_FIM);
print('Total de anos:', listaAnos.size());

// ============================================================================
// FUNCAO: Calcular media anual de NDWI
// ============================================================================

/**
 * Calcula a media anual do NDWI para um ano especifico
 *
 * @param {Number} ano - Ano para calcular a media (ex: 2020)
 * @return {ee.Image} - Imagem com a media do NDWI para o ano
 */
var calcularMediaAnual = function(ano) {
  // Converte o ano para numero inteiro do Earth Engine
  ano = ee.Number(ano).toInt();

  // Define a data de inicio do ano
  // Para 2017, comeca em marco (quando Sentinel-2 SR Harmonized iniciou)
  var mesInicio = ee.Algorithms.If(ano.eq(2017), 3, 1);
  var diaInicio = ee.Algorithms.If(ano.eq(2017), 28, 1);
  var dataInicio = ee.Date.fromYMD(ano, mesInicio, diaInicio);

  // Define a data de fim do ano (1 de janeiro do proximo ano - filterDate e exclusivo)
  var dataFim = ee.Date.fromYMD(ano.add(1), 1, 1);

  // Obtem a colecao Sentinel-2 filtrada para o ano
  var colecaoAno = utils.obterColecaoS2(dataInicio, dataFim, geometriaSP, MAX_NUVENS);

  // Aplica o processamento em cada imagem (mascara de nuvens + NDWI)
  var ndwiAno = colecaoAno.map(utils.processarImagemNDWI);

  // Recorta para o limite de SP
  var ndwiAnoSP = ndwiAno.map(function(image) {
    return image.clip(geometriaSP);
  });

  // Calcula a media de todas as imagens do ano
  // mean() calcula a media pixel a pixel
  var mediaAnual = ndwiAnoSP.mean();

  // Adiciona metadados importantes a imagem resultante
  // NOTA: Nao usar getInfo() dentro de funcoes mapeadas (server-side)
  // O ano e salvo como propriedade para consulta posterior
  mediaAnual = mediaAnual
    .set('ano', ano)                                    // Ano da composicao
    .set('system:time_start', dataInicio.millis())     // Timestamp de inicio
    .set('num_imagens', ndwiAnoSP.size())              // Quantidade de imagens usadas
    .rename('NDWI');                                    // Nome padronizado da banda

  return mediaAnual;
};

// ============================================================================
// GERACAO DAS MEDIAS ANUAIS
// ============================================================================

print('=== PROCESSANDO MEDIAS ANUAIS ===');

// Aplica a funcao de media anual para cada ano da lista
// map() aplica a funcao a cada elemento da lista
var mediasAnuais = listaAnos.map(calcularMediaAnual);

// Converte a lista de imagens em ImageCollection
var colecaoMediasAnuais = ee.ImageCollection.fromImages(mediasAnuais);

// Imprime informacoes sobre a colecao gerada
print('Colecao de medias anuais:', colecaoMediasAnuais);
print('Numero de imagens anuais:', colecaoMediasAnuais.size());

// ============================================================================
// ESTATISTICAS POR ANO
// ============================================================================

print('=== ESTATISTICAS POR ANO ===');

// Calcula estatisticas de cada ano
var estatisticasAnuais = listaAnos.map(function(ano) {
  ano = ee.Number(ano).toInt();

  // Filtra a imagem do ano especifico
  var imagemAno = colecaoMediasAnuais
    .filter(ee.Filter.eq('ano', ano))
    .first();

  // Calcula estatisticas da imagem
  // NOTA: Usando nome de banda padronizado 'NDWI' (sem getInfo)
  var stats = imagemAno.reduceRegion({
    reducer: ee.Reducer.mean()          // Calcula a media
      .combine(ee.Reducer.stdDev(), '', true)   // Adiciona desvio padrao
      .combine(ee.Reducer.minMax(), '', true),  // Adiciona min e max
    geometry: geometriaSP,
    scale: 100,                          // Escala de 100m para calculo rapido
    maxPixels: 1e13,
    bestEffort: true                     // Usa melhor esforco se ultrapassar limite
  });

  // Retorna como Feature para visualizacao em tabela
  // Usando chaves padronizadas sem getInfo() (server-side)
  return ee.Feature(null, {
    'ano': ano,
    'ndwi_media': stats.get('NDWI_mean'),
    'ndwi_desvio': stats.get('NDWI_stdDev'),
    'ndwi_min': stats.get('NDWI_min'),
    'ndwi_max': stats.get('NDWI_max')
  });
});

// Cria FeatureCollection com estatisticas
var tabelaEstatisticas = ee.FeatureCollection(estatisticasAnuais);
print('Estatisticas anuais:', tabelaEstatisticas);

// ============================================================================
// GRAFICO DE SERIE TEMPORAL
// ============================================================================

print('=== SERIE TEMPORAL ===');

// Cria grafico de linha mostrando evolucao do NDWI medio ao longo dos anos
var graficoSerieTemporal = ui.Chart.feature.byFeature({
  features: tabelaEstatisticas,
  xProperty: 'ano',
  yProperties: ['ndwi_media']
})
.setChartType('LineChart')
.setOptions({
  title: 'Evolucao do NDWI Medio - Sao Paulo (2017-2025)',
  hAxis: {
    title: 'Ano',
    format: '####'                       // Formato sem separador de milhar
  },
  vAxis: {
    title: 'NDWI Medio',
    viewWindow: {min: -0.5, max: 0.5}   // Limites do eixo Y
  },
  lineWidth: 2,
  pointSize: 5,
  colors: ['#4575b4'],                   // Cor azul para a linha
  legend: {position: 'none'}
});

// Exibe o grafico no console
print(graficoSerieTemporal);

// ============================================================================
// VISUALIZACAO NO MAPA
// ============================================================================

print('=== VISUALIZACAO NO MAPA ===');

// Centraliza o mapa em Sao Paulo
Map.centerObject(geometriaSP, 7);

// Adiciona o limite do estado
Map.addLayer(limiteSP, {color: 'black'}, 'Limite SP', true, 0.5);

// Parametros de visualizacao para NDWI
var visParams = utils.visParamsNDWI();

// Adiciona a media de cada ano como camada no mapa
// Apenas alguns anos sao adicionados para nao poluir o mapa
var anosVisualizacao = [2017, 2019, 2021, 2023, 2025];

anosVisualizacao.forEach(function(ano) {
  // Filtra a imagem do ano
  var imagemAno = colecaoMediasAnuais
    .filter(ee.Filter.eq('ano', ano))
    .first();

  // Adiciona ao mapa (camadas de anos antigos iniciam desligadas)
  var visivel = (ano === 2025);  // Apenas 2025 visivel por padrao
  Map.addLayer(imagemAno, visParams, 'NDWI Media ' + ano, visivel);
});

// ============================================================================
// IMAGEM MULTIBANDA COM TODOS OS ANOS
// ============================================================================

print('=== IMAGEM MULTIBANDA ===');

// Cria uma unica imagem com uma banda para cada ano
// Util para analises temporais e exportacao
var ndwiMultibanda = colecaoMediasAnuais.toBands();

// Renomeia as bandas para nomes mais claros
var nomesBandas = listaAnos.map(function(ano) {
  return ee.String('NDWI_').cat(ee.Number(ano).toInt().format());
});
ndwiMultibanda = ndwiMultibanda.rename(nomesBandas);

print('Imagem multibanda:', ndwiMultibanda);
print('Bandas:', ndwiMultibanda.bandNames());

// ============================================================================
// EXPORTACAO DAS MEDIAS ANUAIS
// ============================================================================

print('=== EXPORTACAO ===');

// Exporta a imagem multibanda para o Google Drive
Export.image.toDrive({
  image: ndwiMultibanda,
  description: 'NDWI_SP_Medias_Anuais_2017_2025',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_medias_anuais',
  region: geometriaSP,
  scale: 100,                            // 100m para arquivo menor
  crs: CRS,                              // Sistema de coordenadas explicito
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Exporta tambem a tabela de estatisticas
Export.table.toDrive({
  collection: tabelaEstatisticas,
  description: 'NDWI_SP_Estatisticas_Anuais',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_estatisticas',
  fileFormat: 'CSV'
});

print('Tarefas de exportacao configuradas. Execute na aba Tasks.');

// ============================================================================
// EXPORTACAO PARA OUTROS SCRIPTS
// ============================================================================

// Exporta variaveis para uso em scripts subsequentes
exports.colecaoMediasAnuais = colecaoMediasAnuais;
exports.ndwiMultibanda = ndwiMultibanda;
exports.tabelaEstatisticas = tabelaEstatisticas;
exports.listaAnos = listaAnos;
exports.limiteSP = limiteSP;
exports.geometriaSP = geometriaSP;
