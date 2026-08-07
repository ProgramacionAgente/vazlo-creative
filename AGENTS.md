# AGENTS — Cyber-Luxe Agency Template

## Proyecto

Plantilla estática de agencia con Astro 5, Tailwind CSS 3, Decap CMS y despliegue en Cloudflare Pages.

## Convenciones obligatorias

- `src/` es la única fuente editable. `html/` se regenera con `npm run export:html`; no se edita manualmente.
- Mantén Astro en la versión mayor 5 y Tailwind en la versión mayor 3 salvo migración explícita.
- Usa Sora para display/titulares y Mulish para cuerpo.
- Empareja siempre `backdrop-filter` con `-webkit-backdrop-filter`.
- Colores, fuentes y logo viven en `src/config/theme.mjs` y se reflejan en `tailwind.config.mjs`.
- Datos de sitio y marca viven en `src/content/settings/site.json`.
- Usa `{{brand}}` en contenido editable para menciones del nombre de marca.
- Usa `ResponsiveImage.astro` para imágenes de contenido; declara ancho, alto, alt y tamaños.
- Mantén foco visible, targets táctiles de al menos 44 px y soporte de `prefers-reduced-motion`.
- No introduzcas enlaces `href="#"`; elimina el enlace o configura una ruta real.

## Comandos

| Comando | Acción |
|---|---|
| `npm run dev` | Servidor local |
| `npm run cms` | CMS local |
| `npm run check` | Tipos y contenido |
| `npm run validate:setup` | Placeholders de entrega |
| `npm run build` | Build estático |
| `npm run export:html` | Sincroniza `html/` |

## Verificación mínima

Después de cambios visuales o de contenido ejecuta `npm run check` y `npm run build`. Si afecta la entrega HTML, ejecuta también `npm run export:html`.
