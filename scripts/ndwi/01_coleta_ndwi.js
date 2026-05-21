/**
 * SCRIPT 01 - COLETA E CALCULO DE NDWI PARA SAO PAULO
 *
 * Este script coleta imagens Sentinel-2 de 2017 a 2025 para o estado de SP,
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
var utils = require('users/luquinhas_gonzales/agrimodel:scripts/utils/sentinel2_utils');

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
// Simplifica a geometria para reduzir consumo de memoria (tolerancia de 1000m)
var geometriaSP = limiteSP.geometry().simplify({maxError: 1000});

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
// 1. Mascara de nuvens usando banda SCL
// 2. Calculo do NDWI (Green - NIR) / (Green + NIR)
// 3. Selecao apenas da banda NDWI
// NOTA: Nao fazemos clip() aqui para economizar memoria - o clip sera feito apenas na visualizacao
var colecaoNDWI_SP = colecaoS2.map(utils.processarImagemNDWI);

print('Colecao NDWI processada (sem clip para economizar memoria)');

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

// OTIMIZACAO: Processa apenas 2024 para visualizacao (evita erro de memoria)
// Para analise completa, use os scripts de exportacao
// Limita a 50 imagens para reduzir consumo de memoria
var colecao2024 = colecaoNDWI_SP
  .filterDate('2024-01-01', '2024-12-31')
  .limit(50);

// Calcula a mediana de 2024 para visualizacao
// Escala de 500m para visualizacao (reduz memoria significativamente)
var ndwi2024 = colecao2024.median()
  .clip(geometriaSP)
  .reproject({crs: 'EPSG:4326', scale: 500});

// Adiciona a imagem ao mapa com paleta de cores
Map.addLayer(ndwi2024, utils.visParamsNDWI(), 'NDWI 2024 (mediana)');

// Para comparacao, processa 2020 (limitado a 50 imagens)
var colecao2020 = colecaoNDWI_SP
  .filterDate('2020-01-01', '2020-12-31')
  .limit(50);
var ndwi2020 = colecao2020.median()
  .clip(geometriaSP)
  .reproject({crs: 'EPSG:4326', scale: 500});

Map.addLayer(ndwi2020, utils.visParamsNDWI(), 'NDWI 2020 (mediana)', false);

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

// Exporta a mediana do NDWI de 2024 como exemplo
// Esta imagem pode ser usada para validacao inicial
// NOTA: A exportacao funciona mesmo com grandes volumes pois e processada no servidor
Export.image.toDrive({
  image: colecao2024.median().clip(geometriaSP),  // Imagem a exportar (resolucao nativa)
  description: 'NDWI_SP_Mediana_2024',             // Nome da tarefa
  folder: 'GEE_NDWI_SP',                           // Pasta no Google Drive
  fileNamePrefix: 'NDWI_SP_mediana_2024',          // Prefixo do arquivo
  region: geometriaSP,                             // Regiao de exportacao
  scale: 100,                                      // Escala em metros (100m para arquivo menor)
  crs: CRS,                                        // Sistema de coordenadas explicito
  maxPixels: 1e13,                                 // Numero maximo de pixels
  fileFormat: 'GeoTIFF'                            // Formato do arquivo
});

print('=== EXPORTACAO CONFIGURADA ===');
print('Execute a tarefa "NDWI_SP_Mediana_2024" na aba Tasks para baixar o arquivo.');

// ============================================================================
// VARIAVEIS EXPORTADAS PARA OUTROS SCRIPTS
// ============================================================================

// Exporta variaveis para uso em scripts subsequentes
exports.colecaoNDWI_SP = colecaoNDWI_SP;
exports.limiteSP = limiteSP;
exports.geometriaSP = geometriaSP;
exports.DATA_INICIO = DATA_INICIO;
exports.DATA_FIM = DATA_FIM;
