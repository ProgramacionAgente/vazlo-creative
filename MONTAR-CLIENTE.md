# Montar un sitio de cliente

## Pendientes específicos de VAZLO CREATIVE

Antes de publicar, resolver:

- **Datos de contacto** (`src/content/settings/site.json:contact`): teléfono, email y ubicación son placeholders. Confirmar con el cliente.
- **`siteUrl`**: `https://vazlocreative.com` es provisional; confirmar el dominio real.
- **Licencia de Gilmour Bold**: la fuente (`public/uploads/Gilmour Bold.otf`, Umitype, "All Rights Reserved", licencia en `https://umitype.com/license/`) se auto-hospeda en `public/fonts/gilmour-bold.otf`. Verificar con el cliente que la licencia permite uso web antes de publicar.
- **`public/admin/config.yml`**: sigue con `TU-USUARIO/TU-REPO` y `TU-SUBDOMINIO`. Necesita el slug real de GitHub y el subdominio del Worker OAuth desplegado (`oauth-worker/`).
- **`Catálogo VAZLO CREATIVE 2026.pdf`** (14 MB) vive en `public/uploads/`, así que se despliega públicamente. Si no debe ser descargable, sacarlo de `public/` antes de publicar.

### Precios por verificar

Los precios y planes de servicios (`src/content/services/*.json`, `src/content/services-custom/*.json`) se extrajeron del catálogo PDF, cuyo texto no sigue un orden lineal legible. La mayoría de emparejamientos se verificaron por consistencia interna (p. ej. redes sociales: el precio anual es siempre 10× el mensual en los 5 planes, lo que confirma el orden asignado). Aun así, revisar con el cliente antes de publicar:

- **Diseño gráfico**: el emparejamiento entre Rack Empresarial / Rack Pyme / CueCase y sus tiempos de entrega (7, 7, 5 días) viene de un bloque de texto desordenado en el PDF.
- **Desarrollo web**: en cada par económico/a la medida (Landing, Web informativo, E-commerce WhatsApp, E-commerce con pasarela), se asumió que el precio menor es "económico" — consistente en las 9 filas del catálogo, pero no confirmado nombre por nombre.
- **Video marketing**: solo se publicaron los tres niveles (Straig/Spin/Trick) por duración y las suscripciones semanales, que son los datos claramente legibles. El bloque "otros servicios de video" (animación de logotipo, creación de imagen, cambios de medida) no se incluyó por ambigüedad de precios.

## 1. Crear el proyecto

1. Crea un repositorio desde esta plantilla.
2. Clónalo y ejecuta `npm install`.
3. Cambia el nombre del paquete si tu flujo lo requiere.

## 2. Configurar identidad

- Edita `src/config/theme.mjs`: paleta, fuentes, `googleHref` y logo.
- Edita `src/content/settings/site.json`: `brand`, `siteUrl`, idioma, contacto y footer.
- Conserva `{{brand}}` en los textos; se resuelve automáticamente.
- Reemplaza las imágenes demo de Unsplash/pravatar por recursos del cliente.

## 3. Configurar funciones

- `contact.formEndpoint`: URL de Formspree, Web3Forms o backend propio. Vacío abre el correo del visitante.
- `socialLinks`: agrega nombre, URL e icono de Material Symbols.
- `analytics.plausibleDomain`: dominio de Plausible; vacío no carga analítica.
- `footerLinks` y `footerBottomLinks`: agrega rutas legales reales cuando correspondan.

## 4. Configurar CMS

En `public/admin/config.yml` sustituye:

```yaml
repo: TU-USUARIO/TU-REPO
base_url: https://decap-oauth.TU-SUBDOMINIO.workers.dev
```

Para edición local ejecuta `npm run dev` y `npm run cms`. Para producción configura la OAuth App y el Worker descritos en `oauth-worker/README.md`.

## 5. Contenido y SEO

- Edita Inicio, Nosotros, Contacto y servicios desde `/admin`.
- Asegúrate de que cada palabra resaltada aparezca exactamente en su titular.
- Configura el dominio definitivo antes del build; alimenta canonical, sitemap, robots y metadatos sociales.
- Sustituye la imagen placeholder usada como fallback social si deseas una pieza OG específica por página.

## 6. Verificar y desplegar

```bash
npm run check
npm run validate:setup
npm run build
npm run preview
```

Revisa como mínimo `/`, `/nosotros`, `/contacto`, `/404`, un servicio uniforme y uno especial, tanto en móvil como en escritorio. Comprueba envío de formulario, menú, foco con teclado y enlaces legales.

Cloudflare Pages:

- Build: `npm run build`
- Directorio de salida: `dist`
- Rama: `main`

## 7. Entrega HTML opcional

Ejecuta `npm run export:html` y entrega la carpeta `html/`. El CSS compilado queda en línea. Si cambias `src/`, vuelve a generar; no edites la exportación manualmente.

## Checklist final

- Dominio real y favicon/logo.
- Datos de contacto y endpoint probados.
- Imágenes propias con textos alternativos.
- Repo y OAuth del CMS configurados.
- Redes y documentos legales reales.
- `npm run check`, `npm run validate:setup` y `npm run build` exitosos.
- Revisión visual móvil/escritorio y navegación por teclado.
