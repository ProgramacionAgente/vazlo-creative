type TokenMap = Record<string, string>;

export function resolveContentTokens<T>(value: T, tokens: TokenMap): T {
  if (typeof value === 'string') {
    return value.replace(/\{\{\s*([\w-]+)\s*\}\}/g, (match, token: string) =>
      Object.prototype.hasOwnProperty.call(tokens, token) ? tokens[token] : match,
    ) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveContentTokens(item, tokens)) as T;
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveContentTokens(item, tokens)]),
    ) as T;
  }

  return value;
}
