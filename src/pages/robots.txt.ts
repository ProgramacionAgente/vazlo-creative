import type { APIRoute } from 'astro';
import rawSite from '../content/settings/site.json';

export const prerender = true;

export const GET: APIRoute = () => {
  const origin = rawSite.siteUrl.replace(/\/$/, '');
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
