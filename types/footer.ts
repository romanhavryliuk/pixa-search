import type { ReactNode } from 'react';

/** Вбудований тип іконки соцмережі. */
export type SocialType =
  | 'github'
  | 'twitter'
  | 'email'
  | 'linkedin'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'link';

/** Посилання всередині колонки футера. */
export interface FooterLink {
  label: string;
  href: string;
  /** true → відкривати в новій вкладці з rel="noopener noreferrer". */
  external?: boolean;
}

/** Колонка із заголовком і списком посилань. */
export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

/** Іконка-посилання на соцмережу. */
export interface FooterSocial {
  type: SocialType;
  href: string;
  /** aria-label; якщо не вказано, береться `type`. */
  label?: string;
  /** Власна іконка замість вбудованої. */
  icon?: ReactNode;
}

export interface FooterProps {
  /** Назва бренду поруч із лого. */
  brandName?: string;
  /** Опис під назвою бренду. */
  description?: string;
  /** Власний елемент лого (замінює дефолтний бейдж-градієнт). */
  logo?: ReactNode;
  /** Колонки з навігаційними посиланнями. */
  columns?: FooterColumn[];
  /** Іконки соцмереж. */
  socials?: FooterSocial[];
  /** Рік у рядку копірайту. За замовчуванням — поточний рік. */
  year?: number;
  /** Текст копірайту (зліва внизу). Замінює дефолтний. */
  copyright?: ReactNode;
  /** Примітка справа внизу (напр. атрибуція). Передай `null`, щоб приховати. */
  attribution?: ReactNode;
  /** Додатковий клас на `<footer>` (зручно для перевизначення CSS-змінних). */
  className?: string;
}
