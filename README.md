# Memorandum

Plataforma editorial digital independiente centrada en **Ceuta**, con cobertura de **España** y los principales acontecimientos **internacionales**, y una sección dedicada de **Historia / Revisión** trabajada con fuentes primarias.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** strict
- **PostgreSQL** + **Drizzle ORM**
- **Zod** para validación
- **CSS Modules** + CSS moderno con variables propias (sin Tailwind ni Bootstrap)
- **Tiptap** para edición de contenido (FASE 2)
- **Sharp** para procesamiento de imágenes
- **Cloudflare R2** (S3-compatible) para almacenamiento
- **Docker** para desarrollo y producción
- **pnpm**, **Vitest**, **Playwright**, **ESLint**, **Prettier**

## Inicio rápido

```bash
# 1. Instalar dependencias
pnpm install

# 2. Configurar entorno
cp .env.example .env

# 3. Levantar PostgreSQL (Docker)
docker compose up -d db

# 4. Migraciones y seed
pnpm db:push
pnpm db:seed

# 5. Desarrollo
pnpm dev
```

Sin `DATABASE_URL`, la aplicación funciona con **contenido de demostración** (marcado como tal en la UI).

## Estructura

```
src/
  app/          # Rutas App Router (portada, secciones, artículo, buzón…)
  components/   # Componentes editoriales con CSS Modules
  config/       # Configuración del sitio y navegación
  db/           # Esquema Drizzle, cliente, seed
  lib/          # Utilidades (formato de fechas…)
  server/       # Capa de acceso a datos + contenido demo
  styles/       # Sistema de diseño: tokens, reset, tipografía, utilidades
  types/        # Tipos de dominio desacoplados del esquema
```

## Identidad editorial

- Tipografía: **Newsreader** (titulares y cuerpo) + **Inter** (UI y metadatos)
- Paleta sobria mediterránea: fondo papel, tinta, acento terracota
- Filetes editoriales finos, mucho espacio en blanco, fotografía grande
- Animaciones discretas, respeto a `prefers-reduced-motion`
- La opinión siempre etiquetada; las fuentes siempre visibles

## Fases

| Fase | Contenido | Estado |
|------|-----------|--------|
| 1 | Scaffolding, design system, esquema DB, portada, navegación | ✅ En curso |
| 2 | CMS admin (Tiptap), autenticación, RBAC | Pendiente |
| 3 | Artículos completos, documentos, cronologías, archivo | Pendiente |
| 4 | Buzón ciudadano (uploads firmados, sanitización, cola de revisión) | Pendiente |
| 5 | Moderación, foro, comentarios | Pendiente |
| 6 | SEO avanzado, rendimiento, accesibilidad WCAG 2.2 AA | Pendiente |
| 7 | Seguridad, auditoría, tests, despliegue | Pendiente |

## Seguridad y privacidad

- Sin trackers publicitarios ni Google Analytics
- Buzón sin registro; contacto siempre voluntario
- Metadatos de archivos sanitizados antes de almacenar
- Buckets separados: `public-media` / `private-submissions`
- IPs de remitentes con hash y retención mínima
- Cabeceras de seguridad en `next.config.ts`

## Licencia

Código del proyecto: pendiente de definir. Contenido editorial: © Memorandum.
