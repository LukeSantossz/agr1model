/**
 * SENTINEL-2 UTILITIES
 * Funcoes utilitarias para processamento de imagens Sentinel-2 no Google Earth Engine
 *
 * Autor: agr1model
 * Data: 2026-05-05
 *
 * NOTA: Sentinel-2 SR Harmonized disponivel a partir de 2017-03-28
 * Referencia: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED
 */

// ============================================================================
// CONFIGURACOES GLOBAIS
// ============================================================================

// Asset ID base do projeto no GEE
var ASSET_BASE = 'users/luquinhas_gonzales/agr1model/';

// Colecao Sentinel-2 Surface Reflectance Harmonizada
// Disponivel a partir de 2017-03-28
var S2_COLLECTION = 'COPERNICUS/S2_SR_HARMONIZED';

// Limiar maximo de cobertura de nuvens (percentual)
var MAX_CLOUD_PROBABILITY = 20;

// Sistema de coordenadas padrao para exportacao
var CRS_PADRAO = 'EPSG:4326';

// ============================================================================
// FUNCAO: Mascara de Nuvens usando banda SCL (Scene Classification Layer)
// ============================================================================

/**
 * Aplica mascara de nuvens em uma imagem Sentinel-2 usando a banda SCL
 * A banda SCL e mais confiavel que QA60, especialmente apos 2022-01-25
 *
 * Valores SCL a mascarar:
 * - 3: Cloud shadows (sombras de nuvens)
 * - 8: Cloud medium probability (nuvens probabilidade media)
 * - 9: Cloud high probability (nuvens probabilidade alta)
 * - 10: Thin cirrus (cirrus finos)
 *
 * Referencia: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR_HARMONIZED
 *
 * @param {ee.Image} image - Imagem Sentinel-2 com banda SCL
 * @return {ee.Image} - Imagem com pixels de nuvem mascarados
 */
var mascaraNuvensSCL = function(image) {
  // Seleciona a banda SCL (Scene Classification Layer)
  var scl = image.select('SCL');

  // Define os valores de SCL que representam nuvens e sombras
  // 3 = Cloud shadows, 8 = Cloud medium prob, 9 = Cloud high prob, 10 = Thin cirrus
  var valoresNuvem = [3, 8, 9, 10];

  // Cria mascara onde o pixel NAO e nenhum dos valores de nuvem
  // neq() retorna true quando o valor e diferente
  // Encadeia todas as condicoes com and()
  var mask = scl.neq(3)   // Nao e sombra de nuvem
    .and(scl.neq(8))      // Nao e nuvem probabilidade media
    .and(scl.neq(9))      // Nao e nuvem probabilidade alta
    .and(scl.neq(10));    // Nao e cirrus fino

  // Aplica a mascara na imagem e retorna
  // updateMask mantem apenas pixels onde mask = true
  return image.updateMask(mask);
};

// Alias para compatibilidade com codigo antigo
var mascaraNuvensQA60 = mascaraNuvensSCL;

// ============================================================================
// FUNCAO: Calculo do NDWI (Normalized Difference Water Index)
// ============================================================================

/**
 * Calcula o NDWI para uma imagem Sentinel-2
 * NDWI = (Green - NIR) / (Green + NIR)
 *
 * Valores de NDWI:
 * - Positivos (> 0): indicam presenca de agua
 * - Proximos de 0: solo exposto ou vegetacao seca
 * - Negativos (< 0): vegetacao verde
 *
 * Bandas Sentinel-2 utilizadas:
 * - B3 (Green): 560 nm - banda verde
 * - B8 (NIR): 842 nm - infravermelho proximo
 *
 * @param {ee.Image} image - Imagem Sentinel-2 com bandas B3 e B8
 * @return {ee.Image} - Imagem com banda NDWI adicionada
 */
var calcularNDWI = function(image) {
  // Seleciona a banda verde (B3) - 560 nm
  var green = image.select('B3');

  // Seleciona a banda NIR (B8) - 842 nm
  var nir = image.select('B8');

  // Calcula NDWI usando a formula normalizada
  // normalizedDifference calcula (banda1 - banda2) / (banda1 + banda2)
  var ndwi = image.normalizedDifference(['B3', 'B8'])
    .rename('NDWI');  // Renomeia a banda resultante para 'NDWI'

  // Adiciona a banda NDWI a imagem original e copia as propriedades
  return image.addBands(ndwi);
};

// ============================================================================
// FUNCAO: Selecionar apenas banda NDWI
// ============================================================================

/**
 * Seleciona apenas a banda NDWI de uma imagem
 * Util para criar colecoes mais leves contendo apenas o indice
 *
 * @param {ee.Image} image - Imagem com banda NDWI
 * @return {ee.Image} - Imagem contendo apenas a banda NDWI
 */
var selecionarNDWI = function(image) {
  // Seleciona apenas a banda NDWI
  // copyProperties mantem metadados importantes como data e sistema
  return image.select('NDWI')
    .copyProperties(image, ['system:time_start', 'system:index']);
};

// ============================================================================
// FUNCAO: Pipeline completo de processamento
// ============================================================================

/**
 * Aplica o pipeline completo de processamento em uma imagem Sentinel-2
 * 1. Mascara de nuvens usando SCL (mais confiavel que QA60)
 * 2. Calculo do NDWI
 * 3. Selecao da banda NDWI
 *
 * @param {ee.Image} image - Imagem Sentinel-2 bruta
 * @return {ee.Image} - Imagem processada contendo apenas NDWI
 */
var processarImagemNDWI = function(image) {
  // Aplica mascara de nuvens usando SCL (Scene Classification Layer)
  var semNuvens = mascaraNuvensSCL(image);

  // Calcula o NDWI
  var comNDWI = calcularNDWI(semNuvens);

  // Retorna apenas a banda NDWI com metadados
  return selecionarNDWI(comNDWI);
};

// ============================================================================
// FUNCAO: Carregar shapefile do estado de SP
// ============================================================================

/**
 * Carrega o shapefile do limite do estado de Sao Paulo
 *
 * @return {ee.FeatureCollection} - FeatureCollection com o limite de SP
 */
var carregarLimiteSP = function() {
  // Carrega o asset do limite do estado de SP
  return ee.FeatureCollection(ASSET_BASE + 'SP_UF_2024');
};

/**
 * Carrega o shapefile dos municipios de Sao Paulo
 *
 * @return {ee.FeatureCollection} - FeatureCollection com os municipios de SP
 */
var carregarMunicipiosSP = function() {
  // Carrega o asset dos municipios de SP
  return ee.FeatureCollection(ASSET_BASE + 'SP_Municipios_2024');
};

// ============================================================================
// FUNCAO: Obter colecao Sentinel-2 filtrada
// ============================================================================

/**
 * Obtem a colecao Sentinel-2 filtrada por data, area e nuvens
 *
 * @param {String} dataInicio - Data inicial no formato 'YYYY-MM-DD'
 * @param {String} dataFim - Data final no formato 'YYYY-MM-DD'
 * @param {ee.Geometry} geometria - Geometria para filtro espacial
 * @param {Number} maxNuvens - Percentual maximo de cobertura de nuvens (opcional)
 * @return {ee.ImageCollection} - Colecao filtrada
 */
var obterColecaoS2 = function(dataInicio, dataFim, geometria, maxNuvens) {
  // Usa valor padrao se maxNuvens nao for fornecido
  maxNuvens = maxNuvens || MAX_CLOUD_PROBABILITY;

  // Carrega a colecao Sentinel-2 SR Harmonizada
  var colecao = ee.ImageCollection(S2_COLLECTION)
    // Filtra por intervalo de datas
    .filterDate(dataInicio, dataFim)
    // Filtra por intersecao com a geometria
    .filterBounds(geometria)
    // Filtra por cobertura de nuvens na metadata
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', maxNuvens));

  return colecao;
};

// ============================================================================
// FUNCAO: Parametros de visualizacao do NDWI
// ============================================================================

/**
 * Retorna parametros de visualizacao padrao para NDWI
 * Paleta de cores: vermelho (seco) -> amarelo -> azul (agua)
 *
 * @return {Object} - Objeto com parametros de visualizacao
 */
var visParamsNDWI = function() {
  return {
    min: -1,      // Valor minimo do NDWI (vegetacao densa)
    max: 1,       // Valor maximo do NDWI (agua)
    palette: [
      '#d73027',  // Vermelho escuro - vegetacao muito verde
      '#f46d43',  // Laranja - vegetacao
      '#fdae61',  // Laranja claro - vegetacao moderada
      '#fee090',  // Amarelo claro - solo/vegetacao seca
      '#e0f3f8',  // Azul muito claro - umidade
      '#abd9e9',  // Azul claro - agua rasa
      '#74add1',  // Azul medio - agua
      '#4575b4',  // Azul escuro - agua profunda
      '#313695'   // Azul muito escuro - agua muito profunda
    ]
  };
};

// ============================================================================
// EXPORTACAO DAS FUNCOES
// ============================================================================

// Exporta todas as funcoes para uso em outros scripts
exports.mascaraNuvensSCL = mascaraNuvensSCL;
exports.mascaraNuvensQA60 = mascaraNuvensQA60;  // Alias para compatibilidade
exports.calcularNDWI = calcularNDWI;
exports.selecionarNDWI = selecionarNDWI;
exports.processarImagemNDWI = processarImagemNDWI;
exports.carregarLimiteSP = carregarLimiteSP;
exports.carregarMunicipiosSP = carregarMunicipiosSP;
exports.obterColecaoS2 = obterColecaoS2;
exports.visParamsNDWI = visParamsNDWI;

// Exporta constantes
exports.ASSET_BASE = ASSET_BASE;
exports.S2_COLLECTION = S2_COLLECTION;
exports.MAX_CLOUD_PROBABILITY = MAX_CLOUD_PROBABILITY;
exports.CRS_PADRAO = CRS_PADRAO;
