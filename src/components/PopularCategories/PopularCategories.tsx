'use client';

import type { CSSProperties } from 'react';
import { useRouter } from 'next/navigation';
import type {
  FeaturedCategory,
  PopularCategoriesProps,
} from '@/types/popularCategories';
import ImageWithFallback from '@/components/ImageWithFallback/ImageWithFallback';
import { useMediaType } from '@/contexts/MediaTypeContext';
import css from './PopularCategories.module.css';
import { TrendingUpIcon, ClockIcon } from './icons';
import { useReveal } from '@/hooks/useReveal';

const DEFAULT_TAGS = [
  'nature',
  'technology',
  'business',
  'travel',
  'food',
  'architecture',
  'people',
  'art',
];

const DEFAULT_FEATURED: FeaturedCategory[] = [
  {
    title: 'Nature',
    imageSrc: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  },
  {
    title: 'Technology',
    imageSrc: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
  },
  {
    title: 'Travel',
    imageSrc: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
  },
];

/** Індекс для затримки CSS-анімації появи. */
function stagger(i: number): CSSProperties {
  return { '--popular-i': i } as CSSProperties;
}

function PopularCategories({
  title = 'Popular categories',
  subtitle = 'The most popular search topics',
  trendingLabel = 'Trending',
  badgeLabel = 'Trending now',
  tags = DEFAULT_TAGS,
  featured = DEFAULT_FEATURED,
  onSelect,
  scrollToTopOnSelect = true,
  className,
  id = 'popular',
}: PopularCategoriesProps) {
  const router = useRouter();
  const { ref, revealed } = useReveal<HTMLElement>();
  const { mediaType } = useMediaType();

  const handleSelect = (value: string) => {
    if (onSelect) {
      onSelect(value, mediaType);
      if (scrollToTopOnSelect && typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const params = new URLSearchParams({ query: value, type: mediaType });
    router.push(`/search?${params.toString()}`);
  };

  const sectionClass = [
    css.section,
    revealed ? css['section--revealed'] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section id={id} ref={ref} className={sectionClass}>
      <div className={css.container}>
        {/* Шапка */}
        <div className={css.header}>
          <div>
            {title && (
              <h2 className={`${css.title} ${css.reveal}`} style={stagger(0)}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`${css.subtitle} ${css.reveal}`} style={stagger(1)}>
                {subtitle}
              </p>
            )}
          </div>
          {trendingLabel != null && (
            <div className={`${css.trending} ${css.reveal}`} style={stagger(1)}>
              <TrendingUpIcon />
              <span>{trendingLabel}</span>
            </div>
          )}
        </div>

        {/* Сітка тегів */}
        {tags.length > 0 && (
          <div className={css.tags}>
            {tags.map((tag, i) => (
              <div key={tag} className={css.reveal} style={stagger(i)}>
                <button
                  type="button"
                  className={css.tag}
                  onClick={() => handleSelect(tag)}
                >
                  <span className={css.tag__label}>{tag}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Картки популярних категорій */}
        {featured.length > 0 && (
          <div className={css.featured}>
            {featured.map((card, i) => {
              const value = card.value ?? card.title.toLowerCase();
              return (
                <div
                  key={`${card.title}-${i}`}
                  className={css.reveal}
                  style={stagger(i)}
                >
                  <button
                    type="button"
                    className={css.card}
                    onClick={() => handleSelect(value)}
                  >
                    <ImageWithFallback
                      src={card.imageSrc}
                      alt={card.imageAlt ?? card.title}
                      className={css.card__img}
                    />
                    <span className={css.card__overlay} />
                    <span className={css.card__body}>
                      <span className={css.card__badge}>
                        <ClockIcon />
                        <span>{card.badge ?? badgeLabel}</span>
                      </span>
                      <span className={css.card__title}>{card.title}</span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default PopularCategories;
