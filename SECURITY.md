# Seguridad y mantenimiento

- El sitio público se genera de forma estática; no ejecuta Astro en el servidor.
- Ejecuta `npm audit` y `npm run check` antes de cada entrega.
- No subas secretos del Worker OAuth ni tokens de GitHub al repositorio.
- Astro se mantiene deliberadamente en la versión mayor 5 por compatibilidad de esta plantilla. Las actualizaciones mayores deben probarse en una rama separada.
- Reporta vulnerabilidades de forma privada al responsable del repositorio, evitando abrir issues con credenciales o datos sensibles.
