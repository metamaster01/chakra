export function parseColors(meta?: any): string[] {
  try {
    const c = Array.isArray(meta?.colors) ? meta.colors : [];
    return c as string[];
  } catch { return []; }
}
