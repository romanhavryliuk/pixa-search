export interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  /** Атрибут `sizes`, що передається в `next/image` для адаптивного завантаження. */
  sizes?: string;
}
