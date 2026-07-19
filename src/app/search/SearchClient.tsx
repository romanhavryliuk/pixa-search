"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Play } from "lucide-react";
import { toast } from "sonner";
import { searchMedia } from "@/services/pixabay";
import type { SearchType } from "@/types/pixabay";
import { useMediaType } from "@/contexts/MediaTypeContext";
import ImageWithFallback from "@/components/ImageWithFallback/ImageWithFallback";
import Pagination from "@/components/Pagination/Pagination";
import Loader from "@/components/Loader/Loader";
import css from "./SearchClient.module.css";

export function SearchClient() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query")?.trim() ?? "";
  const urlType = (searchParams.get("type") ?? "all") as SearchType;
  const { mediaType, setMediaType } = useMediaType();

  const [page, setPage] = useState(1);

  // Синхронізуємо глобальний фільтр з URL при переході на нову сторінку
  // результатів (пошук, категорія, популярний тег або пряме посилання).
  useEffect(() => {
    setMediaType(urlType);
  }, [urlType, setMediaType]);

  // Нова видача чи перемикання фільтра — починаємо з першої сторінки.
  // Скидаємо просто під час рендеру (а не в ефекті), щоб не викликати
  // setState в ефекті та зайвий каскадний прохід рендеру.
  const [resetKey, setResetKey] = useState({ query, mediaType });
  if (resetKey.query !== query || resetKey.mediaType !== mediaType) {
    setResetKey({ query, mediaType });
    setPage(1);
  }

  // Результати завжди фільтруються за поточним значенням із контексту, а не
  // за типом з URL — так перемикання фільтра одразу оновлює те, що вже
  // показано на екрані, незалежно від того, як сюди потрапили.
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["pixabay", query, mediaType, page],
    queryFn: () => searchMedia({ query, type: mediaType, page }),
    enabled: query.length > 0,
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (isError) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  }, [isError, error]);

  if (!query) {
    return (
      <p className={css.hint}>Enter a search term above to get started.</p>
    );
  }

  if (isLoading) {
    return <Loader variant="page" />;
  }

  if (isError) {
    return (
      <p className={css.error} role="alert">
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className={css.results}>
      <p className={css.summary}>
        <span className={css.count}>{data.totalHits.toLocaleString()}</span>
        {" "}results for{" "}
        <span className={css.term}>&ldquo;{query}&rdquo;</span>
        {isFetching && (
          <span className={css.fetchingIndicator}>
            <Loader variant="inline" size="small" />
          </span>
        )}
      </p>

      <ul className={`${css.grid} ${isFetching ? css.gridFetching : ""}`}>
        {data.items.map((item) => (
          <li key={`${item.kind}-${item.id}`} className={css.cell}>
            <a
              href={item.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={css.card}
              title={item.tags}
            >
              <ImageWithFallback
                src={item.thumbUrl}
                alt={item.tags || `${item.kind} by ${item.user}`}
                className={css.thumb}
              />
              {item.kind === "video" && (
                <span className={css.playBadge} aria-hidden="true">
                  <Play />
                </span>
              )}
              <span className={css.author}>by {item.user}</span>
            </a>
          </li>
        ))}
      </ul>

      {data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
