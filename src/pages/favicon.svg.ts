import type { APIRoute } from 'astro';
import { colors } from '../config/theme.mjs';

export const prerender = true;

export const GET: APIRoute = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${colors['bg-void']}"/><path d="M38 6 15 35h15l-4 23 23-32H34z" fill="${colors.accent}"/></svg>`;
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
