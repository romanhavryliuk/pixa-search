import type { SearchType } from "./pixabay";

export interface MediaTypeFilterProps {
  value: SearchType;
  onChange: (type: SearchType) => void;
  className?: string;
}
