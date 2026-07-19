import { NextResponse } from "next/server";
import type { MediaItem, SearchResponse, SearchType } from "@/types/pixabay";

const PER_PAGE = 24;
/** Pixabay віддає не більше 500 результатів на запит. */
const MAX_RESULTS = 500;
const MAX_PAGES = Math.floor(MAX_RESULTS / PER_PAGE);

// --- Сирі типи відповіді Pixabay (лише поля, які ми використовуємо) ---

interface PixabayImageHit {
  id: number;
  pageURL: string;
  tags: string;
  user: string;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
}

interface PixabayVideoStream {
  url: string;
  width: number;
  height: number;
  thumbnail: string;
}

interface PixabayVideoHit {
  id: number;
  pageURL: string;
  tags: string;
  user: string;
  videos: Record<"large" | "medium" | "small" | "tiny", PixabayVideoStream>;
}

interface PixabayResponse<THit> {
  total: number;
  totalHits: number;
  hits: THit[];
}

function normalizeImage(hit: PixabayImageHit): MediaItem {
  return {
    id: hit.id,
    kind: "image",
    thumbUrl: hit.webformatURL,
    pageUrl: hit.pageURL,
    tags: hit.tags,
    user: hit.user,
    width: hit.webformatWidth,
    height: hit.webformatHeight,
  };
}

function normalizeVideo(hit: PixabayVideoHit): MediaItem {
  const stream = hit.videos.medium ?? hit.videos.small ?? hit.videos.tiny;
  return {
    id: hit.id,
    kind: "video",
    thumbUrl: stream?.thumbnail ?? "",
    pageUrl: hit.pageURL,
    tags: hit.tags,
    user: hit.user,
    width: stream?.width ?? 0,
    height: stream?.height ?? 0,
  };
}

export async function GET(request: Request) {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "PIXABAY_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() ?? "";
  const type = (searchParams.get("type") ?? "all") as SearchType;
  const requestedPage = Number(searchParams.get("page") ?? "1");

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter is required." },
      { status: 400 },
    );
  }

  // Обмежуємо номер сторінки діапазоном, який реально віддає Pixabay.
  const page = Math.min(
    Math.max(Number.isFinite(requestedPage) ? requestedPage : 1, 1),
    MAX_PAGES,
  );

  const isVideo = type === "video";
  const endpoint = isVideo
    ? "https://pixabay.com/api/videos/"
    : "https://pixabay.com/api/";

  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    page: String(page),
    per_page: String(PER_PAGE),
    safesearch: "true",
  });
  // Для зображень "all" включає ілюстрації/вектори; "photo" — лише фото.
  if (!isVideo) params.set("image_type", type === "photo" ? "photo" : "all");

  try {
    // Умови Pixabay вимагають кешування результатів; оновлюємо раз на добу.
    const res = await fetch(`${endpoint}?${params.toString()}`, {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: `Pixabay request failed (${res.status}).` },
        { status: 502 },
      );
    }

    const items: MediaItem[] = [];
    let total = 0;
    let totalHits = 0;

    if (isVideo) {
      const data = (await res.json()) as PixabayResponse<PixabayVideoHit>;
      total = data.total;
      totalHits = data.totalHits;
      items.push(...data.hits.map(normalizeVideo));
    } else {
      const data = (await res.json()) as PixabayResponse<PixabayImageHit>;
      total = data.total;
      totalHits = data.totalHits;
      items.push(...data.hits.map(normalizeImage));
    }

    const totalPages = Math.min(Math.ceil(totalHits / PER_PAGE), MAX_PAGES);

    const payload: SearchResponse = {
      items,
      total,
      totalHits,
      page,
      perPage: PER_PAGE,
      totalPages,
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      { message: "Unable to reach Pixabay. Please try again." },
      { status: 502 },
    );
  }
}
