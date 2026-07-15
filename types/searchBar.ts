import type { SearchType } from './pixabay';

export interface SearchBarProps {
  onSearch: (query: string, type: SearchType) => void;
  onSearchComplete?: () => void;
}
