import type { SearchType } from "./pixabay";

export interface SearchBarProps {
  /** Початкове значення інпуту (напр. активний `?query=` з URL). */
  initialQuery?: string;
  onSearch: (query: string, type: SearchType) => void;
  onSearchComplete?: () => void;
}
