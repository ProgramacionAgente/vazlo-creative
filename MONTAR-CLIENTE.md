# Montar un sitio de cliente

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
