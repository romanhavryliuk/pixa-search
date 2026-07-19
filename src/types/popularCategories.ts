import type { ReactNode } from 'react';
import type { SearchType } from './pixabay';

/** Картка "популярної" категорії із зображенням. */
export interface FeaturedCategory {
  /** Заголовок на картці. */
  title: string;
  /** URL зображення. */
  imageSrc: string;
  /** Alt зображення; якщо не вказано, береться `title`. */
  imageAlt?: string;
  /** Підпис-бейдж над заголовком. За замовчуванням — `badgeLabel` секції. */
  badge?: string;
  /** Значення, що передається в `onSelect`. За замовчуванням — `title` у нижньому регістрі. */
  value?: string;
}

export interface PopularCategoriesProps {
  /** Заголовок секції. */
  title?: string;
  /** Підзаголовок під заголовком. */
  subtitle?: string;
  /** Текст бейджа "Trending" справа від заголовка. `null` — приховати. */
  trendingLabel?: ReactNode;
  /** Підпис над заголовками карток ("Trending now"). */
  badgeLabel?: string;
  /** Список кнопок-тегів. */
  tags?: string[];
  /** Картки популярних категорій. */
  featured?: FeaturedCategory[];
  /** Клік по тегу чи картці. Отримує значення (тег або `value`/`title` картки) і поточний обраний фільтр типу медіа (спільний із фільтром пошуку в хедері). */
  onSelect?: (value: string, type: SearchType) => void;
  /** Скролити сторінку вгору після вибору. За замовчуванням — `true`. */
  scrollToTopOnSelect?: boolean;
  /** Додатковий клас на `<section>` (зручно для перевизначення CSS-змінних). */
  className?: string;
  /** id секції (для якірних посилань). За замовчуванням — `"popular"`. */
  id?: string;
}
