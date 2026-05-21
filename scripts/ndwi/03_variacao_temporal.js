/**
 * SCRIPT 03 - VARIACAO TEMPORAL DO NDWI (2017 vs 2025)
 *
 * Este script calcula a diferenca de NDWI entre 2017 e 2025 para identificar
 * regioes que tiveram incremento ou decremento no indice de agua.
 *
 * Variacao = NDWI_2025 - NDWI_2017
 * - Valores positivos: AUMENTO de agua (ganho hidrico)
 * - Valores negativos: REDUCAO de agua (perda hidrica)
 * - Valores proximos de zero: estabilidade
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

// Anos de comparacao
// NOTA: Sentinel-2 SR Harmonized disponivel apenas a partir de 2017-03-28
var ANO_INICIAL = 2017;  // Ano base (inicio do periodo)
var ANO_FINAL = 2025;    // Ano de comparacao (fim do periodo)

// Limiares para classificacao de mudanca
// Valores em unidades de NDWI (variando de -2 a +2)
var LIMIAR_INCREMENTO = 0.05;   // Acima disso = incremento significativo
var LIMIAR_DECREMENTO = -0.05;  // Abaixo disso = decremento significativo

// Percentual maximo de nuvens
var MAX_NUVENS = 20;

// Sistema de coordenadas para exportacao
var CRS = 'EPSG:4326';

// ============================================================================
// CARREGAMENTO DA AREA DE ESTUDO
// ============================================================================

// Carrega o limite do estado de Sao Paulo
var limiteSP = utils.carregarLimiteSP();
// Simplifica a geometria para reduzir consumo de memoria (tolerancia de 1000m)
var geometriaSP = limiteSP.geometry().simplify({maxError: 1000});

// Imprime informacoes iniciais
print('=== VARIACAO TEMPORAL NDWI ===');
print('Comparacao:', ANO_INICIAL, 'vs', ANO_FINAL);
print('Limiar de mudanca:', LIMIAR_INCREMENTO);

// ============================================================================
// FUNCAO: Calcular media anual do NDWI
// ============================================================================

/**
 * Calcula a media anual do NDWI para um ano especifico
 * (Mesma funcao do script 02, replicada para independencia)
 *
 * @param {Number} ano - Ano para calcular
 * @return {ee.Image} - Imagem com media do NDWI
 */
var calcularMediaAnual = function (ano) {
  // Define datas de inicio e fim
  // Para 2017, comeca em marco (quando Sentinel-2 SR Harmonized iniciou)
  var mesInicio = (ano === 2017) ? 3 : 1;
  var diaInicio = (ano === 2017) ? 28 : 1;
  var dataInicio = ee.Date.fromYMD(ano, mesInicio, diaInicio);
  // Data final exclusiva (1 de janeiro do proximo ano)
  var dataFim = ee.Date.fromYMD(ano + 1, 1, 1);

  // Obtem e processa a colecao
  var colecao = utils.obterColecaoS2(dataInicio, dataFim, geometriaSP, MAX_NUVENS)
    .map(utils.processarImagemNDWI)
    .map(function (img) { return img.clip(geometriaSP); });

  // Calcula a media e adiciona metadados
  return colecao.mean()
    .set('ano', ano)
    .rename('NDWI');
};

// ============================================================================
// CALCULO DAS MEDIAS ANUAIS
// ============================================================================

print('=== CALCULANDO MEDIAS ANUAIS ===');

// Calcula a media de NDWI para o ano inicial (2017)
var ndwi2017 = calcularMediaAnual(ANO_INICIAL);
print('NDWI 2017 calculado');

// Calcula a media de NDWI para o ano final (2025)
var ndwi2025 = calcularMediaAnual(ANO_FINAL);
print('NDWI 2025 calculado');

// ============================================================================
// CALCULO DA VARIACAO
// ============================================================================

print('=== CALCULANDO VARIACAO ===');

// Calcula a diferenca: NDWI_2025 - NDWI_2017
// Valores positivos = aumento de agua
// Valores negativos = reducao de agua
var variacao = ndwi2025.subtract(ndwi2017).rename('variacao_NDWI');

print('Variacao calculada (2025 - 2017)');

// ============================================================================
// CLASSIFICACAO DA VARIACAO
// ============================================================================

print('=== CLASSIFICANDO MUDANCAS ===');

/**
 * Classificacao das mudancas:
 * 1 = Incremento significativo (> +0.05)
 * 2 = Estavel (-0.05 a +0.05)
 * 3 = Decremento significativo (< -0.05)
 */

// Cria imagem classificada
// where() aplica condicoes para reclassificar pixels
var classificacao = ee.Image(2)  // Inicia com valor 2 (estavel)
  .where(variacao.gt(LIMIAR_INCREMENTO), 1)   // Se > 0.05, classe 1 (incremento)
  .where(variacao.lt(LIMIAR_DECREMENTO), 3)   // Se < -0.05, classe 3 (decremento)
  .rename('classe_mudanca')
  .clip(geometriaSP);

// Define nomes das classes para referencia
var nomesClasses = {
  1: 'Incremento (ganho de agua)',
  2: 'Estavel',
  3: 'Decremento (perda de agua)'
};

print('Classes de mudanca definidas');

// ============================================================================
// CALCULO DE AREAS POR CLASSE
// ============================================================================

print('=== ESTATISTICAS DE AREA ===');

// Calcula a area de cada classe de mudanca
// pixelArea() retorna a area de cada pixel em m2
var areasPorClasse = ee.Image.pixelArea()
  .addBands(classificacao)
  .reduceRegion({
    reducer: ee.Reducer.sum().group({
      groupField: 1,              // Agrupa pela banda de classificacao
      groupName: 'classe'
    }),
    geometry: geometriaSP,
    scale: 100,                   // 100m para calculo mais rapido
    maxPixels: 1e13,
    bestEffort: true
  });

print('Areas por classe (m2):', areasPorClasse);

// Calcula area total do estado para percentuais
var areaTotal = geometriaSP.area();
print('Area total SP (m2):', areaTotal);

// Cria tabela formatada com areas
var tabelaAreas = ee.FeatureCollection([
  ee.Feature(null, {
    'classe': 1,
    'descricao': 'Incremento (ganho de agua)',
    'cor': 'azul'
  }),
  ee.Feature(null, {
    'classe': 2,
    'descricao': 'Estavel',
    'cor': 'amarelo'
  }),
  ee.Feature(null, {
    'classe': 3,
    'descricao': 'Decremento (perda de agua)',
    'cor': 'vermelho'
  })
]);

// ============================================================================
// ESTATISTICAS DE VARIACAO
// ============================================================================

print('=== ESTATISTICAS DE VARIACAO ===');

// Calcula estatisticas gerais da variacao
var statsVariacao = variacao.reduceRegion({
  reducer: ee.Reducer.mean()
    .combine(ee.Reducer.stdDev(), '', true)
    .combine(ee.Reducer.minMax(), '', true)
    .combine(ee.Reducer.percentile([10, 25, 50, 75, 90]), '', true),
  geometry: geometriaSP,
  scale: 100,
  maxPixels: 1e13,
  bestEffort: true
});

print('Estatisticas da variacao:', statsVariacao);

// ============================================================================
// RESPOSTA: HOUVE AUMENTO OU REDUCAO GERAL?
// ============================================================================

print('=== ANALISE GERAL ===');

// Calcula a media geral da variacao
var mediaVariacao = variacao.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: geometriaSP,
  scale: 100,
  maxPixels: 1e13
}).get('variacao_NDWI');

// Interpreta o resultado
// Se media > 0: tendencia de aumento de agua
// Se media < 0: tendencia de reducao de agua
print('Media da variacao NDWI:', mediaVariacao);
print('');
print('INTERPRETACAO:');
print('Se valor POSITIVO: Houve AUMENTO geral no indice de agua em SP');
print('Se valor NEGATIVO: Houve REDUCAO geral no indice de agua em SP');
print('Se valor proximo de ZERO: O estado permaneceu relativamente estavel');

// ============================================================================
// HISTOGRAMA DA VARIACAO
// ============================================================================

print('=== HISTOGRAMA DE VARIACAO ===');

// Cria histograma mostrando distribuicao das mudancas
var histograma = ui.Chart.image.histogram({
  image: variacao,
  region: geometriaSP,
  scale: 500,                     // Escala maior para processamento rapido
  maxBuckets: 50,                 // Numero de intervalos no histograma
  maxPixels: 1e9
})
  .setOptions({
    title: 'Distribuicao da Variacao de NDWI (2017-2025)',
    hAxis: {
      title: 'Variacao NDWI (2025 - 2017)',
      viewWindow: { min: -0.5, max: 0.5 }
    },
    vAxis: { title: 'Frequencia (pixels)' },
    colors: ['#2166ac'],
    legend: { position: 'none' }
  });

print(histograma);

// ============================================================================
// VISUALIZACAO NO MAPA
// ============================================================================

print('=== VISUALIZACAO NO MAPA ===');

// Centraliza o mapa em Sao Paulo
Map.centerObject(geometriaSP, 7);

// Adiciona limite do estado
Map.addLayer(limiteSP, { color: 'black' }, 'Limite SP', true, 0.5);

// Parametros de visualizacao para o NDWI
var visNDWI = utils.visParamsNDWI();

// Reproject para reduzir consumo de memoria
var ndwi2017Vis = ndwi2017.reproject({ crs: 'EPSG:4326', scale: 500 });
var ndwi2025Vis = ndwi2025.reproject({ crs: 'EPSG:4326', scale: 500 });

// Adiciona NDWI de 2017
Map.addLayer(ndwi2017Vis, visNDWI, 'NDWI 2017', false);

// Adiciona NDWI de 2025
Map.addLayer(ndwi2025Vis, visNDWI, 'NDWI 2025', false);

// Parametros de visualizacao para variacao (escala divergente)
// Azul = aumento de agua, Vermelho = reducao de agua
var visVariacao = {
  min: -0.3,                      // Valor minimo de variacao exibido
  max: 0.3,                       // Valor maximo de variacao exibido
  palette: [
    '#d73027',  // Vermelho escuro - grande reducao
    '#f46d43',  // Laranja - reducao moderada
    '#fdae61',  // Laranja claro - pequena reducao
    '#fee090',  // Amarelo claro - reducao minima
    '#ffffbf',  // Amarelo - estavel
    '#e0f3f8',  // Azul muito claro - aumento minimo
    '#abd9e9',  // Azul claro - pequeno aumento
    '#74add1',  // Azul - aumento moderado
    '#4575b4'   // Azul escuro - grande aumento
  ]
};

// Adiciona mapa de variacao (com reproject para reduzir memoria)
var variacaoVis = variacao.reproject({ crs: 'EPSG:4326', scale: 500 });
Map.addLayer(variacaoVis, visVariacao, 'Variacao NDWI (2025-2017)', true);

// Parametros para mapa de classificacao
var visClassificacao = {
  min: 1,
  max: 3,
  palette: [
    '#2166ac',  // Azul - incremento
    '#f7f7f7',  // Cinza claro - estavel
    '#b2182b'   // Vermelho - decremento
  ]
};

// Adiciona mapa de classificacao (com reproject para reduzir memoria)
var classificacaoVis = classificacao.reproject({ crs: 'EPSG:4326', scale: 500 });
Map.addLayer(classificacaoVis, visClassificacao, 'Classificacao de Mudanca', false);

// ============================================================================
// LEGENDA
// ============================================================================

print('LEGENDA - VARIACAO:');
print('  Azul escuro: Grande aumento de agua (+0.3 ou mais)');
print('  Azul claro: Aumento moderado (+0.1 a +0.3)');
print('  Amarelo: Estavel (-0.1 a +0.1)');
print('  Laranja: Reducao moderada (-0.1 a -0.3)');
print('  Vermelho: Grande reducao (-0.3 ou menos)');
print('');
print('LEGENDA - CLASSIFICACAO:');
print('  Azul: Incremento (ganho de agua > +0.05)');
print('  Cinza: Estavel (-0.05 a +0.05)');
print('  Vermelho: Decremento (perda de agua < -0.05)');

// ============================================================================
// EXPORTACAO
// ============================================================================

print('=== EXPORTACAO ===');

// Exporta mapa de variacao
Export.image.toDrive({
  image: variacao,
  description: 'NDWI_SP_Variacao_2017_2025',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_variacao',
  region: geometriaSP,
  scale: 100,
  crs: CRS,                       // Sistema de coordenadas explicito
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Exporta mapa de classificacao
Export.image.toDrive({
  image: classificacao,
  description: 'NDWI_SP_Classificacao_Mudanca',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_classificacao',
  region: geometriaSP,
  scale: 100,
  crs: CRS,                       // Sistema de coordenadas explicito
  maxPixels: 1e13,
  fileFormat: 'GeoTIFF'
});

// Combina NDWI 2017, 2025 e variacao em uma imagem
var imagemCombinada = ndwi2017.rename('NDWI_2017')
  .addBands(ndwi2025.rename('NDWI_2025'))
  .addBands(variacao);

// Exporta imagem combinada
Export.image.toDrive({
  image: imagemCombinada,
  description: 'NDWI_SP_Comparacao_2017_2025',
  folder: 'GEE_NDWI_SP',
  fileNamePrefix: 'NDWI_SP_comparacao',
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

exports.ndwi2017 = ndwi2017;
exports.ndwi2025 = ndwi2025;
exports.variacao = variacao;
exports.classificacao = classificacao;
exports.limiteSP = limiteSP;
exports.geometriaSP = geometriaSP;
exports.LIMIAR_INCREMENTO = LIMIAR_INCREMENTO;
exports.LIMIAR_DECREMENTO = LIMIAR_DECREMENTO;
