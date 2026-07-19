'use client';

import type { SearchEmptyStateProps } from '@/types/popularSection';
import css from './PopularSection.module.css';

function SearchEmptyState({ onReset }: SearchEmptyStateProps) {
  const handleReset = () => {
    if (onReset) {
      onReset();
    } else {
      window.location.reload();
    }
  };
  return (
    <div className={css.badge}>
      <p className={css.badge__text}>
        We&apos;re sorry! We were not able to find a match.
      </p>
      <button className={css.badge__btn} onClick={handleReset}>
        Reset search and filters
      </button>
    </div>
  );
}

export default SearchEmptyState;
