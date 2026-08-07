# VAZLO CREATIVE

Sitio del estudio creativo VAZLO CREATIVE, construido con Astro 5 y Tailwind CSS 3. Incluye 11 páginas públicas, CMS con Decap, SEO técnico, formulario configurable, accesibilidad, CI y exportación HTML autónoma.

## Comandos

```bash
npm install
npm run dev               # desarrollo en localhost:4321
npm run cms               # Decap CMS local
npm run check             # tipos Astro + validación de contenido
npm run validate:setup    # detecta placeholders antes de entregar
npm run build             # salida estática en dist/
npm run export:html       # regenera html/ con CSS compilado en línea
npm run preview
```

## Personalización

La configuración está separada por responsabilidad:

- `src/config/theme.mjs`: colores, tipografías y logo.
- `src/styles/fonts.css`: `@font-face` de Gilmour (auto-hospedada en `public/fonts/`).
- `scripts/build-brand-assets.mjs` (`npm run brand:assets`): genera `public/brand/` (isotipo, favicons, iconos PWA, OG) desde los logos fuente.
- `src/content/settings/site.json`: marca, dominio, navegación, contacto, formulario, redes, analítica y footer.
- `src/content/pages/*.json`: Inicio, Nosotros y Contacto.
- `src/content/services/*.json`: servicios con layout uniforme.
- `src/content/services-custom/*.json`: servicios con layouts especiales.
- `public/admin/config.yml`: repositorio y OAuth del CMS.

El contenido puede usar `{{brand}}`; el sitio lo reemplaza automáticamente con `site.brand`. Así, cambiar el nombre no exige buscar textos dispersos.

## Funcionalidad incluida

- Canonical, Open Graph, Twitter Cards y descripciones por página.
- `sitemap.xml`, `robots.txt`, favicon SVG y web manifest generados durante el build.
- Página 404, skip link, navegación activa, foco visible, menú móvil accesible y reducción de movimiento.
- Imágenes con dimensiones, lazy loading y `srcset` automático para Unsplash.
- Formulario compatible con endpoints HTTP; sin endpoint usa `mailto:` como respaldo.
- Redes sociales y Plausible opcionales desde `site.json`.
- Esquemas de contenido, validación de enlaces/resaltados y GitHub Actions.

## CMS

Ejecuta `npm run dev` y `npm run cms`, después abre `http://localhost:4321/admin/index.html`. En producción debes configurar `backend.repo` y `base_url` en `public/admin/config.yml`; consulta [oauth-worker/README.md](oauth-worker/README.md).

## Versión HTML

`html/` es un artefacto generado, no una segunda fuente de verdad. `npm run export:html` construye Astro, copia la salida y convierte las hojas CSS compiladas en estilos en línea. Nunca edites `html/` a mano.

## Antes de entregar

Sigue [MONTAR-CLIENTE.md](MONTAR-CLIENTE.md) y ejecuta:

```bash
npm run check
npm run validate:setup
npm run build
```

`validate:setup` falla intencionalmente mientras existan el dominio `example.com` o placeholders del CMS.
