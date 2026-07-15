import type { SearchType } from './pixabay';

export interface HeaderProps {
  onSearch?: (query: string, type: SearchType) => void;
}
