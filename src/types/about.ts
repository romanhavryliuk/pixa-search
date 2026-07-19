import type { ReactNode } from 'react';

/** Вбудований тип іконки фічі. */
export type FeatureIcon = 'sparkles' | 'zap' | 'heart' | 'shield';

/** Одна перевага/фіча в секції «Про нас». */
export interface AboutFeature {
  /**
   * Іконка: вбудований тип ("sparkles" | "zap" | "heart" | "shield")
   * або власний ReactNode (напр. <MyIcon />).
   */
  icon: FeatureIcon | ReactNode;
  /** Заголовок картки. */
  title: string;
  /** Опис картки. */
  description: string;
  /**
   * CSS-градієнт фону іконки — будь-яке значення `background`,
   * напр. "linear-gradient(135deg, #3b82f6, #06b6d4)".
   */
  gradient?: string;
}

/** Props секції «Про нас». */
export interface AboutSectionProps {
  /** Заголовок секції. */
  title?: string;
  /** Підзаголовок під заголовком. */
  subtitle?: string;
  /** Список карток-переваг. */
  features?: AboutFeature[];
  /** Додатковий клас на `<section>` (для перевизначення CSS-змінних теми). */
  className?: string;
  /** id секції (для якірних посилань). За замовчуванням `"about"`. */
  id?: string;
}

/** Props однієї картки-переваги. */
export interface FeatureCardProps {
  /** Дані картки. */
  feature: AboutFeature;
  /** Індекс для стагеру появи. */
  index?: number;
  /** Додатковий клас. */
  className?: string;
}
