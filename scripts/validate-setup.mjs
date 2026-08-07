import { readFile } from 'node:fs/promises';

const site = JSON.parse(await readFile('src/content/settings/site.json', 'utf8'));
const cms = await readFile('public/admin/config.yml', 'utf8');
const failures = [];
const warnings = [];

if (/example\.com/i.test(site.siteUrl)) failures.push('Configura siteUrl con el dominio público del proyecto.');
if (/TU-USUARIO|TU-REPO/i.test(cms)) failures.push('Configura backend.repo en public/admin/config.yml.');
if (/TU-SUBDOMINIO/i.test(cms)) failures.push('Configura backend.base_url con el Worker OAuth real.');
if (!site.contact.formEndpoint) warnings.push('formEndpoint está vacío: el formulario usará la aplicación de correo del visitante.');
if (!site.socialLinks.length) warnings.push('No hay redes sociales configuradas.');
if (!site.footerBottomLinks.length) warnings.push('No hay enlaces legales configurados; agrégalos si el proyecto los requiere.');

for (const warning of warnings) console.warn(`PENDIENTE: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`CONFIGURACIÓN REQUERIDA: ${failure}`);
  process.exit(1);
}
console.log('Configuración de entrega completa.');
