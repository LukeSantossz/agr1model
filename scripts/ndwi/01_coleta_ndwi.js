/**
 * SCRIPT 01 - COLETA E CALCULO DE NDWI PARA SAO PAULO
 *
 * Este script coleta imagens Sentinel-2 de 2015 a 2025 para o estado de SP,
 * aplica mascara de nuvens e calcula o NDWI (Normalized Difference Water Index).
 *
 * NDWI = (Green - NIR) / (Green + NIR)
 * - Valores positivos indicam presenca de agua
 * - Valores negativos indicam vegetacao
 *
 * Autor: agr1model
 * Data: 2026-05-05
 */

// ============================================================================
// IMPORTACAO DO MODULO DE UTILIDADES
// ============================================================================

// Importa as funcoes utilitarias do modulo sentinel2_utils
// NOTA: No GEE Code Editor, ajuste o caminho conforme sua estrutura de repositorio
var utils = require('users/luquinhas_gonzales/agr1model:scripts/utils/sentinel2_utils');

// ============================================================================
// CONFIGURACOES DO PROJETO
// ============================================================================

// Data inicial da analise
// NOTA: Sentinel-2 SR Harmonized disponivel apenas a partir de 2017-03-28
// Referencia: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED
var DATA_INICIO = '2017-03-28';

// Data final da analise (exclusiva, entao usamos 2026-01-01 para incluir 31/12/2025)
var DATA_FIM = '2026-01-01';

// Percentual maximo de nuvens por cena
var MAX_NUVENS = 20;

// Sistema de coordenadas para exportacao
var CRS = 'EPSG:4326';

// ============================================================================
// CARREGAMENTO DA AREA DE ESTUDO
// ============================================================================

// Carrega o shapefile do limite do estado de Sao Paulo
// Este asset deve ter sido previamente carregado no GEE (ver docs/gee-assets-setup.md)
var limiteSP = utils.carregarLimiteSP();

// Extrai a geometria do limite de SP para usar nos filtros
// geometry() converte o FeatureCollection em um objeto Geometry
var geometriaSP = limiteSP.geometry();

// Imprime informacoes sobre a area de estudo no console
print('=== AREA DE ESTUDO ===');
print('Limite SP:', limiteSP);

// Calcula a area total em km2
var areaKm2 = geometriaSP.area().divide(1e6);  // Converte m2 para km2
print('Area total (km2):', areaKm2);

// ============================================================================
// COLETA DAS IMAGENS SENTINEL-2
// ============================================================================

print('=== COLETA SENTINEL-2 ===');
print('Periodo:', DATA_INICIO, 'a', DATA_FIM);
print('Maximo de nuvens:', MAX_NUVENS, '%');

// Obtem a colecao Sentinel-2 filtrada por data, area e nuvens
var colecaoS2 = utils.obterColecaoS2(DATA_INICIO, DATA_FIM, geometriaSP, MAX_NUVENS);

// Conta o numero de imagens disponiveis antes do processamento
var numImagensOriginal = colecaoS2.size();
print('Imagens Sentinel-2 encontradas:', numImagensOriginal);

// ============================================================================
// PROCESSAMENTO: MASCARA DE NUVENS E CALCULO DO NDWI
// ============================================================================

print('=== PROCESSAMENTO ===');

// Aplica o pipeline de processamento em cada imagem da colecao:
// 1. Mascara de nuvens usando banda QA60
// 2. Calculo do NDWI (Green - NIR) / (Green + NIR)
// 3. Selecao apenas da banda NDWI
var colecaoNDWI = colecaoS2.map(utils.processarImagemNDWI);

// Recorta todas as imagens para o limite de SP
// Isso reduz o tamanho dos dados e garante que so temos pixels dentro de SP
var colecaoNDWI_SP = colecaoNDWI.map(function(image) {
  // clip() recorta a imagem usando a geometria fornecida
  return image.clip(geometriaSP);
});

print('Colecao NDWI processada:', colecaoNDWI_SP);

// ============================================================================
// ESTATISTICAS DA COLECAO
// ============================================================================

print('=== ESTATISTICAS ===');

// Calcula estatisticas por ano para entender a distribuicao temporal
// NOTA: Sentinel-2 SR Harmonized disponivel a partir de 2017
var anos = ee.List.sequence(2017, 2025);  // Lista de anos de 2017 a 2025

// Para cada ano, conta quantas imagens estao disponiveis
var imagensPorAno = anos.map(function(ano) {
  // Converte o ano para inteiro
  ano = ee.Number(ano).toInt();

  // Define as datas de inicio e fim do ano
  var inicioAno = ee.Date.fromYMD(ano, 1, 1);
  var fimAno = ee.Date.fromYMD(ano, 12, 31);

  // Filtra a colecao para o ano especifico
  var imagensAno = colecaoNDWI_SP.filterDate(inicioAno, fimAno);

  // Retorna um dicionario com ano e contagem
  return ee.Feature(null, {
    'ano': ano,
    'num_imagens': imagensAno.size()
  });
});

// Converte para FeatureCollection para visualizacao
var estatisticasAnuais = ee.FeatureCollection(imagensPorAno);
print('Imagens por ano:', estatisticasAnuais);

// ============================================================================
// VISUALIZACAO NO MAPA
// ============================================================================

print('=== VISUALIZACAO ===');

// Centraliza o mapa no estado de Sao Paulo com zoom nivel 7
Map.centerObject(geometriaSP, 7);

// Adiciona o limite do estado como camada de referencia
Map.addLayer(limiteSP, {color: 'black'}, 'Limite SP', true, 0.5);

// Calcula a mediana de todas as imagens NDWI para visualizacao
// A mediana e mais robusta que a media para lidar com outliers
var ndwiMediana = colecaoNDWI_SP.median();

// Adiciona a imagem de mediana ao mapa com paleta de cores
Map.addLayer(ndwiMediana, utils.visParamsNDWI(), 'NDWI Mediana (2017-2025)');

// Adiciona uma imagem mais recente para comparacao
// Filtra para o ultimo ano disponivel
var ndwiRecente = colecaoNDWI_SP
  .filterDate('2024-01-01', '2024-12-31')
  .median();

Map.addLayer(ndwiRecente, utils.visParamsNDWI(), 'NDWI 2024 (mediana)', false);

// Adiciona legenda como texto no console
print('LEGENDA NDWI:');
print('  Azul escuro (1.0): Agua profunda');
print('  Azul claro (0.5): Agua rasa');
print('  Amarelo (0.0): Solo/vegetacao seca');
print('  Vermelho (-0.5 a -1.0): Vegetacao verde');

// ============================================================================
// EXPORTACAO DA COLECAO NDWI (OPCIONAL)
// ============================================================================

// Para exportar a colecao completa como asset, descomente o codigo abaixo
// ATENCAO: Isso pode levar muito tempo devido ao grande volume de dados

/*
// Funcao para exportar uma imagem individual
var exportarImagem = function(image, index) {
  // Obtem a data da imagem para nomear o arquivo
  var data = ee.Date(image.get('system:time_start')).format('YYYY-MM-dd');

  Export.image.toAsset({
    image: image,
    description: 'NDWI_SP_' + index,
    assetId: 'users/luquinhas_gonzales/agr1model/ndwi/NDWI_SP_' + index,
    region: geometriaSP,
    scale: 10,  // Resolucao de 10 metros (nativa do Sentinel-2)
    maxPixels: 1e13
  });
};
*/

// ============================================================================
// EXPORTACAO DE UMA IMAGEM COMPOSITA DE EXEMPLO
// ============================================================================

// Exporta a mediana do NDWI como exemplo
// Esta imagem pode ser usada para validacao inicial
Export.image.toDrive({
  image: ndwiMediana,                           // Imagem a exportar
  description: 'NDWI_SP_Mediana_2017_2025',    // Nome da tarefa
  folder: 'GEE_NDWI_SP',                        // Pasta no Google Drive
  fileNamePrefix: 'NDWI_SP_mediana',            // Prefixo do arquivo
  region: geometriaSP,                          // Regiao de exportacao
  scale: 100,                                   // Escala em metros (100m para arquivo menor)
  crs: CRS,                                     // Sistema de coordenadas explicito
  maxPixels: 1e13,                              // Numero maximo de pixels
  fileFormat: 'GeoTIFF'                         // Formato do arquivo
});

print('=== EXPORTACAO CONFIGURADA ===');
print('Execute a tarefa "NDWI_SP_Mediana_2015_2025" na aba Tasks para baixar o arquivo.');

// ============================================================================
// VARIAVEIS EXPORTADAS PARA OUTROS SCRIPTS
// ============================================================================

// Exporta variaveis para uso em scripts subsequentes
exports.colecaoNDWI_SP = colecaoNDWI_SP;
exports.limiteSP = limiteSP;
exports.geometriaSP = geometriaSP;
exports.DATA_INICIO = DATA_INICIO;
exports.DATA_FIM = DATA_FIM;
