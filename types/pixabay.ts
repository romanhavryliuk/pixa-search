/** Тип медіа, який може шукати користувач. */
export type SearchType = 'all' | 'photo' | 'video';

/** Один нормалізований результат пошуку (зображення чи відео), готовий для UI. */
export interface MediaItem {
  id: number;
  kind: 'image' | 'video';
  /** Мініатюра, показана в сітці результатів. */
  thumbUrl: string;
  /** Посилання — сторінка елемента на Pixabay. */
  pageUrl: string;
  /** Теги через пробіл (використовуються і як alt-текст). */
  tags: string;
  /** Ім'я автора. */
  user: string;
  width: number;
  height: number;
}

/** Нормалізована відповідь, яку повертають роут `/api/pixabay` і клієнтський сервіс. */
export interface SearchResponse {
  items: MediaItem[];
  /** Загальна кількість збігів за версією Pixabay. */
  total: number;
  /** Кількість збігів, реально доступних через API (Pixabay обмежує до 500). */
  totalHits: number;
  page: number;
  perPage: number;
  /** Кількість сторінок для пагінації (вже обмежена стелею 500). */
  totalPages: number;
}

/** Аргументи, які приймає клієнтський сервіс пошуку. */
export interface SearchParams {
  query: string;
  type: SearchType;
  page: number;
}
