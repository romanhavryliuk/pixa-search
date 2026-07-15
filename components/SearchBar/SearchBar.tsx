'use client';

import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';
import { MediaTypeFilter } from '@/components/MediaTypeFilter/MediaTypeFilter';
import { useMediaType } from '@/contexts/MediaTypeContext';
import type { SearchBarProps } from '@/types/searchBar';
import type { SearchType } from '@/types/pixabay';
import css from './SearchBar.module.css';

export function SearchBar({ onSearch, onSearchComplete }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { mediaType, setMediaType } = useMediaType();

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
            className={css.input}
          />

          <button
            type="submit"
            className={css.searchButton}
            aria-label="Search"
            disabled={!query.trim()}
          >
            <Search className={css.searchIcon} />
          </button>
        </div>

        <MediaTypeFilter value={mediaType} onChange={handleTypeChange} />
      </div>
    </form>
  );
}
