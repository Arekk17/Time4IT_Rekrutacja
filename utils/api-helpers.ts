export function parseIntSafe(
  value: string | null,
  defaultValue: number
): number {
  const parsed = value ? parseInt(value, 10) : defaultValue;
  return Number.isFinite(parsed) ? parsed : defaultValue;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function buildApiUrl(
  baseUrl: string,
  params: Record<string, string | number>
): string {
  const url = new URL(baseUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });
  return url.toString();
}

export function getBaseApiUrl(): string {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
