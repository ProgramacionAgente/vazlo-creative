import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import rawSite from '../content/settings/site.json';

export const prerender = true;

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] ?? character);

export const GET: APIRoute = async () => {
  const origin = rawSite.siteUrl.replace(/\/$/, '');
  const services = await getCollection('services');
  const customServices = await getCollection('customServices');
  const servicePaths = [...services, ...customServices].map(({ id }) => `/servicios/${id.replace(/\.json$/, '')}`);
  const paths = ['/', '/nosotros', '/contacto', ...servicePaths];
  const uniquePaths = [...new Set(paths)].sort();
  const urls = uniquePaths
    .map((path) => `  <url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
