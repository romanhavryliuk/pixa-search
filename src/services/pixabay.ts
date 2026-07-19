import type { SearchParams, SearchResponse } from "@/types/pixabay";

/**
 * Отримує нормалізовані результати Pixabay через наш власний роут `/api/pixabay`
 * (він тримає API-ключ на сервері). Кидає помилку при не-OK відповіді, щоб
 * TanStack Query міг показати стан помилки.
 */
export async function searchMedia({
  query,
  type,
  page,
}: SearchParams): Promise<SearchResponse> {
  const params = new URLSearchParams({
    query,
    type,
    page: String(page),
  });

  const res = await fetch(`/api/pixabay?${params.toString()}`);

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      message?: string;
    } | null;
    throw new Error(body?.message ?? "Search request failed.");
  }

  return (await res.json()) as SearchResponse;
}
