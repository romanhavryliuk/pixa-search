"use client";

import { FormEvent, useState } from "react";
import { Search, X } from "lucide-react";
import { MediaTypeFilter } from "@/components/MediaTypeFilter/MediaTypeFilter";
import { useMediaType } from "@/contexts/MediaTypeContext";
import type { SearchBarProps } from "@/types/searchBar";
import type { SearchType } from "@/types/pixabay";
import css from "./SearchBar.module.css";

export function SearchBar({
  initialQuery = "",
  onSearch,
  onSearchComplete,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const { mediaType, setMediaType } = useMediaType();

  // Підхоплюємо запит з URL, якщо він змінився ззовні (клік по посиланню,
  // кнопка "назад") — прямо під час рендеру, а не в ефекті. Поки
  // користувач просто редагує поле, initialQuery не змінюється, тож
  // локальний ввід не перезаписується під час набору тексту.
  const [trackedQuery, setTrackedQuery] = useState(initialQuery);
  if (initialQuery !== trackedQuery) {
    setTrackedQuery(initialQuery);
    setQuery(initialQuery);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery, mediaType);
      onSearchComplete?.();
    }
  };

  const handleTypeChange = (type: SearchType) => {
    setMediaType(type);

    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      onSearch(trimmedQuery, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.wrapper}>
        <div className={css.inputWrapper}>
          <input
            id="media-search-input"
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search images and videos..."
            aria-label="Search images and videos"
            className={css.input}
          />

          <div className={css.actions}>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className={css.clearButton}
                aria-label="Clear search"
              >
                <X className={css.clearIcon} />
              </button>
            )}

            <button
              type="submit"
              className={css.searchButton}
              aria-label="Search"
              disabled={!query.trim()}
            >
              <Search className={css.searchIcon} />
            </button>
          </div>
        </div>

        <MediaTypeFilter value={mediaType} onChange={handleTypeChange} />
      </div>
    </form>
  );
}