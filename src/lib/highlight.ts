/**
 * Envuelve la subcadena `highlight` dentro de `heading` en un <span class="gradient-text">.
 * Devuelve HTML para usar con set:html. Si highlight está vacío o no aparece,
 * devuelve el heading escapado sin cambios.
 */
export function highlightHeading(heading: string, highlight?: string): string {
  const escapeHtml = (value: string) => value.replace(/[&<>'"]/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]!);

  if (!highlight) return escapeHtml(heading);
  const idx = heading.indexOf(highlight);
  if (idx === -1) return escapeHtml(heading);
  return (
    escapeHtml(heading.slice(0, idx)) +
    `<span class="gradient-text">${escapeHtml(highlight)}</span>` +
    escapeHtml(heading.slice(idx + highlight.length))
  );
}
