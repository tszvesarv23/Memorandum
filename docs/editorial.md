# Modelo editorial

## Tipos de contenido

| Tipo | Descripción |
|------|-------------|
| `NEWS` | Noticia: hechos verificados |
| `ANALYSIS` | Análisis: interpretación con datos |
| `OPINION` | Opinión: posición argumentada, siempre etiquetada |
| `INVESTIGATION` | Investigación propia |
| `FEATURE` | Reportaje / perfil |
| `CHRONICLE` | Crónica |
| `TIMELINE` | Cronología estructurada |
| `DOCUMENT` | Documento del repositorio |
| `HISTORICAL` | Contenido de Historia / Revisión |
| `CITIZEN` | Contenido derivado de envío ciudadano verificado |

## Estados

`DRAFT → REVIEW → SCHEDULED → PUBLISHED → ARCHIVED`

Cada cambio genera una `article_revision` con autor, nota y fecha.

## Reglas

- La opinión nunca se presenta como información objetiva.
- Las fuentes se listan al pie; las oficiales se marcan.
- Las correcciones sustantivas son visibles, nunca silenciosas.
- El contenido de demostración lleva `isDemo: true` y se muestra como tal.
