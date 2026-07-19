export type LoaderVariant = "page" | "section" | "button" | "inline" | "fill";
export type LoaderSize = "small" | "medium" | "large";

export interface LoaderProps {
  text?: string;
  variant?: LoaderVariant;
  size?: LoaderSize;
}
