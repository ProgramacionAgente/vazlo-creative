import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const failures = [];
const warnings = [];
const readJson = async (relativePath) => JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
const readJsonDirectory = async (relativePath) => {
  const directory = path.join(root, relativePath);
  const files = (await readdir(directory)).filter((file) => file.endsWith('.json')).sort();
  return Promise.all(files.map(async (file) => ({ file, data: await readJson(path.join(relativePath, file)) })));
};
const requiredString = (value, label) => {
  if (typeof value !== 'string' || !value.trim()) failures.push(`${label} debe ser un texto no vacío.`);
};
const resolveBrand = (value, brand) => typeof value === 'string' ? value.replaceAll('{{brand}}', brand) : value;
const validateHighlight = (entry, label, brand) => {
  requiredString(entry.heroHeading, `${label}.heroHeading`);
  if (entry.heroHighlight) {
    const heading = resolveBrand(entry.heroHeading, brand).toLocaleLowerCase('es');
    const highlight = resolveBrand(entry.heroHighlight, brand).toLocaleLowerCase('es');
    if (!heading.includes(highlight)) failures.push(`${label}.heroHighlight no aparece dentro de heroHeading.`);
  }
};

try {
  const site = await readJson('src/content/settings/site.json');
  const pages = await readJsonDirectory('src/content/pages');
  const services = await readJsonDirectory('src/content/services');
  const customServices = await readJsonDirectory('src/content/services-custom');

  requiredString(site.brand, 'settings.brand');
  requiredString(site.siteUrl, 'settings.siteUrl');
  requiredString(site.contact?.email, 'settings.contact.email');

  const navigationalLists = [site.nav, site.footerPages, site.footerLinks, site.footerBottomLinks].flat().filter(Boolean);
  for (const link of navigationalLists) {
    if (link.href === '#') failures.push(`El enlace “${link.label}” usa href="#". Elimínalo o configura una ruta real.`);
  }

  for (const { file, data } of pages) {
    requiredString(data.title, `pages/${file}.title`);
    requiredString(data.heroImage, `pages/${file}.heroImage`);
    requiredString(data.heroImageAlt, `pages/${file}.heroImageAlt`);
    validateHighlight(data, `pages/${file}`, site.brand);
  }

  const allServices = [...services, ...customServices];
  const routeSet = new Set(allServices.map(({ file }) => `/servicios/${file.replace(/\.json$/, '')}`));
  const orders = new Set();
  for (const { file, data } of services) {
    validateHighlight(data, `services/${file}`, site.brand);
    requiredString(data.heroSub, `services/${file}.heroSub`);
    requiredString(data.image, `services/${file}.image`);
    if (orders.has(data.order)) failures.push(`El orden ${data.order} está repetido en servicios.`);
    orders.add(data.order);
  }
  for (const { file, data } of customServices) {
    validateHighlight(data, `services-custom/${file}`, site.brand);
    requiredString(data.heroSub, `services-custom/${file}.heroSub`);
    requiredString(data.image, `services-custom/${file}.image`);
  }

  const home = pages.find(({ file }) => file === 'home.json')?.data;
  for (const service of home?.services || []) {
    if (!routeSet.has(service.href)) failures.push(`Inicio enlaza a una ruta de servicio inexistente: ${service.href}`);
  }

  const remoteImages = JSON.stringify({ pages, allServices }).match(/https?:\/\/[^"\\]+/g) || [];
  if (remoteImages.length) warnings.push(`${remoteImages.length} imágenes remotas dependen de terceros; reemplázalas por recursos del cliente antes de entrega final.`);
} catch (error) {
  failures.push(error instanceof Error ? error.message : String(error));
}

for (const warning of warnings) console.warn(`ADVERTENCIA: ${warning}`);
if (failures.length) {
  for (const failure of failures) console.error(`ERROR: ${failure}`);
  process.exit(1);
}
console.log('Contenido válido: JSON, enlaces, resaltados y rutas de servicios comprobados.');
