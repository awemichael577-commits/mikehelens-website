export function normalizePurchaseUrl(value?: string | null) {
  const url = value?.trim();

  if (!url || url.includes("YOUR-")) {
    return undefined;
  }

  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return undefined;
    }

    return parsed.toString();
  } catch {
    return undefined;
  }
}

export const normalizeExternalUrl = normalizePurchaseUrl;
