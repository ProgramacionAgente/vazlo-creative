import type { APIRoute } from 'astro';
import rawSite from '../content/settings/site.json';
import { colors } from '../config/theme.mjs';

export const prerender = true;

export const GET: APIRoute = () => {
  const manifest = {
    name: rawSite.brand,
    short_name: rawSite.brand,
    description: rawSite.footerTagline,
    start_url: '/',
    display: 'standalone',
    background_color: colors['bg-void'],
    theme_color: colors.accent,
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };

  return new Response(JSON.stringify(manifest, null, 2), {
    headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' },
  });
};
