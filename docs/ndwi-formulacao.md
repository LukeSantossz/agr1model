# Formulação do NDWI — Decisão Técnica

> Documento de decisão (TASK-019). Registra a definição do NDWI, as duas formulações consagradas na literatura e a justificativa da formulação adotada neste projeto.

## 1. O que é o NDWI

O NDWI (*Normalized Difference Water Index*) é um índice espectral normalizado, com valores no intervalo `[-1, 1]`, usado em sensoriamento remoto para realçar a presença de água. Por ser uma razão normalizada entre duas bandas, atenua efeitos de iluminação e maximiza o contraste entre a água e os demais alvos.

Existem **duas formulações distintas**, ambas publicadas em 1996 e ambas chamadas "NDWI", mas com propósitos e bandas diferentes. A escolha entre elas define quais bandas o pipeline usa e o que o índice efetivamente mede.

## 2. As duas formulações

### 2.1 McFeeters (1996) — água superficial

```
NDWI = (Green − NIR) / (Green + NIR)
```

- **Objetivo:** delinear corpos d'água abertos (lagos, rios, reservatórios).
- **Princípio:** a água reflete relativamente mais no verde e absorve fortemente no NIR; vegetação e solo fazem o oposto. A razão normalizada realça a água e suprime vegetação/solo.
- **Interpretação:** valores positivos → água; próximos de 0 → solo exposto/vegetação seca; negativos → vegetação verde.
- **Bandas Sentinel-2:** B3 (Green, ~560 nm) e B8 (NIR, ~842 nm) — ambas a 10 m.

### 2.2 Gao (1996) — umidade da vegetação

```
NDWI = (NIR − SWIR) / (NIR + SWIR)
```

- **Objetivo:** estimar o conteúdo de água líquida na **vegetação** (não corpos d'água).
- **Princípio:** o SWIR é sensível à absorção pela água presente nas folhas; a razão NIR/SWIR reflete o status hídrico do dossel.
- **Bandas originais:** Gao definiu o índice com NIR em **0,86 µm** e SWIR em **1,24 µm**. O Sentinel-2 **não possui banda em 1,24 µm**, então implementações o aproximam com B8A (NIR) e B11 (SWIR1, ~1610 nm) — uma variante próxima de índices como LSWI/NDII, limitada a 20 m pela resolução do SWIR.
- **Observação:** distinto do MNDWI (Xu, 2006), que usa Green − SWIR.

## 3. Comparação

| Critério | McFeeters (1996) | Gao (1996) |
|----------|------------------|------------|
| Mede | Água superficial (corpos d'água) | Água na vegetação (umidade do dossel) |
| Fórmula | (Green − NIR)/(Green + NIR) | (NIR − SWIR)/(NIR + SWIR) |
| Bandas (originais) | Green, NIR | NIR 0,86 µm, SWIR 1,24 µm |
| Bandas Sentinel-2 | B3, B8 (10 m) | B8A, B11 (20 m) — aproximação, sem banda em 1,24 µm |
| Uso típico | Mapeamento e dinâmica de água superficial | Estresse hídrico/agrícola da vegetação |

## 4. Formulação adotada

**Adotada: McFeeters (1996).**

Justificativa:

- O objetivo do projeto é **monitorar a disponibilidade hídrica superficial** em São Paulo (corpos d'água, dinâmica de seca) — exatamente o alvo do índice de McFeeters.
- Usa B3 e B8, ambas a **10 m**, melhor que os 20 m da formulação de Gao (limitada pelo SWIR), favorecendo a delimitação de margens e corpos d'água menores.
- A formulação de Gao mede umidade da vegetação, que não é o objeto deste projeto. Sua avaliação como índice complementar fica para a TASK-025 (índices espectrais complementares).

## 5. Implementação no projeto

A formulação está em `scripts/utils/sentinel2_utils.js`, função `calcularNDWI`:

```javascript
var ndwi = image.normalizedDifference(['B3', 'B8']).rename('NDWI');
// (B3 - B8) / (B3 + B8) = (Green - NIR) / (Green + NIR) = McFeeters (1996)
```

`ee.Image.normalizedDifference(['B3','B8'])` calcula `(B3 − B8) / (B3 + B8)`, equivalente à fórmula de McFeeters.

## 6. Referências

- McFeeters, S. K. (1996). The use of the Normalized Difference Water Index (NDWI) in the delineation of open water features. *International Journal of Remote Sensing*, 17(7), 1425–1432. https://doi.org/10.1080/01431169608948714
- Gao, B.-C. (1996). NDWI — A normalized difference water index for remote sensing of vegetation liquid water from space. *Remote Sensing of Environment*, 58(3), 257–266. https://doi.org/10.1016/S0034-4257(96)00067-3
- Xu, H. (2006). Modification of normalised difference water index (MNDWI) to enhance open water features in remotely sensed imagery. *International Journal of Remote Sensing*, 27(14), 3025–3033. https://doi.org/10.1080/01431160600589179
