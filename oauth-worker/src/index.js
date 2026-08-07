/**
 * Proxy OAuth de GitHub para Decap CMS sobre Cloudflare Workers.
 *
 * Flujo:
 *   1. Decap abre  /auth          -> redirige a GitHub (authorize)
 *   2. GitHub vuelve a /callback?code=...
 *   3. El Worker intercambia el code por un access_token
 *   4. Devuelve un HTML que hace postMessage al opener (Decap) con el token
 *
 * Secrets requeridos (wrangler secret put):
 *   - GITHUB_CLIENT_ID
 *   - GITHUB_CLIENT_SECRET
 */

const GITHUB_AUTHORIZE = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN = 'https://github.com/login/oauth/access_token';
const STATE_COOKIE = 'decap_oauth_state';

const htmlHeaders = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'",
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
};

function getCookie(request, name) {
  const cookies = request.headers.get('Cookie') ?? '';
  for (const cookie of cookies.split(';')) {
    const [key, ...value] = cookie.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return null;
}

function renderResult(status, content) {
  // Decap escucha un mensaje 'authorization:github:success:{...}' del popup.
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const safeMessage = JSON.stringify(message)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
  return `<!DOCTYPE html><html><body><script>
    (function () {
      if (!window.opener) return;
      function receiveMessage(e) {
        window.opener.postMessage(
          ${safeMessage},
          e.origin
        );
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Paso 1: iniciar el flujo
    if (url.pathname === '/auth') {
      const redirectUri = `${url.origin}/callback`;
      const authUrl = new URL(GITHUB_AUTHORIZE);
      const state = crypto.randomUUID();
      authUrl.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authUrl.searchParams.set('redirect_uri', redirectUri);
      authUrl.searchParams.set('scope', 'repo,user');
      authUrl.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          Location: authUrl.toString(),
          'Cache-Control': 'no-store',
          'Set-Cookie': `${STATE_COOKIE}=${encodeURIComponent(state)}; Path=/callback; Max-Age=600; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }

    // Paso 2-4: intercambiar code por token
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const expectedState = getCookie(request, STATE_COOKIE);
      const clearStateCookie = `${STATE_COOKIE}=; Path=/callback; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

      if (!state || !expectedState || state !== expectedState) {
        return new Response('Estado OAuth inválido o caducado', {
          status: 400,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            'Set-Cookie': clearStateCookie,
          },
        });
      }

      if (!code) {
        return new Response('Falta el parámetro code', {
          status: 400,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store',
            'Set-Cookie': clearStateCookie,
          },
        });
      }

      const tokenResp = await fetch(GITHUB_TOKEN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });

      const data = await tokenResp.json();

      if (data.error || !data.access_token) {
        return new Response(renderResult('error', { message: data.error || 'sin token' }), {
          headers: { ...htmlHeaders, 'Set-Cookie': clearStateCookie },
        });
      }

      return new Response(
        renderResult('success', { token: data.access_token, provider: 'github' }),
        { headers: { ...htmlHeaders, 'Set-Cookie': clearStateCookie } }
      );
    }

    return new Response('Decap OAuth proxy activo. Usa /auth para iniciar sesión.', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};
