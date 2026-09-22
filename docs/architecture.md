# Arquitectura

## Diagrama de despliegue

```
Usuario
  │
  ▼
Cloudflare (CDN + WAF + Turnstile)
  │
  ▼
Next.js App (Node, standalone)
  ├── PostgreSQL (Drizzle ORM)
  ├── Cloudflare R2
  │     ├── public-media        (imágenes, media pública)
  │     ├── private-submissions (envíos ciudadanos, acceso firmado)
  │     ├── processed-media     (derivados Sharp)
  │     └── archives            (documentos históricos)
  └── Sentry + OpenTelemetry
```

## Módulos

- **`src/app`** — rutas públicas y API routes
- **`src/components`** — UI editorial, CSS Modules, sin dependencias de cliente salvo necesidad
- **`src/server`** — acceso a datos; siempre server-side
- **`src/db`** — esquema Drizzle, cliente, migraciones, seed
- **`src/features`** (FASE 2+) — módulos de dominio: cms, submissions, moderation
- **`src/lib`** — utilidades puras compartidas

## Decisiones

- **Server Components por defecto**: el contenido se renderiza en servidor; el JS de cliente se limita a lo imprescindible.
- **Tipos de dominio desacoplados** (`src/types/editorial.ts`): la UI consume `ArticleCardData`/`ArticleDetailData`, no filas Drizzle. Facilita el fallback a demo y futuros cambios de esquema.
- **Fallback a demo**: si `DATABASE_URL` no está definida, `src/server/articles.ts` devuelve contenido de demostración marcado `isDemo: true`.
- **URLs limpias**: `/{categoria}/{slug}` para artículos; `/documentos/{slug}` para el repositorio.
