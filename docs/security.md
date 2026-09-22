# Seguridad y privacidad

## Principios

- **Minimización de datos**: no pedir lo que no se necesita.
- **Privacy by design**: la privacidad es un requisito de diseño, no un añadido.
- **Least privilege**: cada componente accede solo a lo imprescindible.
- **Sin trackers**: ni Google Analytics ni redes publicitarias.

## Buzón ciudadano (FASE 4)

- Sin registro ni cuenta.
- Contacto siempre voluntario.
- Uploads mediante URLs firmadas de corta duración hacia `private-submissions`.
- Antivirus (ClamAV) y validación de tipo MIME real en servidor.
- Sanitización de metadatos (EXIF, GPS, autor del documento) en las copias de trabajo.
- IP del remitente almacenada con hash + sal, retención mínima.
- Rate limiting por IP y Turnstile anti-bot.
- Nada se publica automáticamente: revisión humana obligatoria.
- No se promete anonimato absoluto: se comunica honestamente.

## Autenticación y RBAC (FASE 2)

- Roles: `ADMIN`, `EDITOR`, `AUTHOR`, `REVIEWER`.
- Permisos granulares por acción (crear, editar, publicar, revisar envíos…).
- Sesiones con cookies `HttpOnly`, `Secure`, `SameSite=Lax`.
- Auditoría de acciones sensibles en `audit_log`.

## Cabeceras

Configuradas en `next.config.ts`: `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`. CSP estricta en fase de endurecimiento.
