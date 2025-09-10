/**
 * Retorna o domínio do tenant.
 */
export function getTenantDomain(slug: string): string {
  const baseDomain = process.env.NEXT_PUBLIC_APP_URL || "localhost";
  return `${slug}.${baseDomain}`;
}

/**
 * Extrai o slug do domínio.
 */
export function extractSlugFromDomain(hostname: string): string {
  const baseDomain = process.env.NEXT_PUBLIC_APP_URL || "localhost";

  // Remove o domain base e deixa apenas o slug
  if (hostname.endsWith(`.${baseDomain}`)) {
    return hostname.replace(`.${baseDomain}`, "");
  }

  // Fallback: assume que é desenvolvimento/localhost
  return hostname.split(".")[0];
}
