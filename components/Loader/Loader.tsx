import type { LoaderProps } from '@/types/loader';
import css from './Loader.module.css';

export default function Loader({
  text,
  variant = 'section',
  size = 'medium',
}: LoaderProps) {
  return (
    <div
      className={`${css.loaderWrapper} ${css[variant]}`}
      role="status"
      aria-live="polite"
    >
      <span className={`${css.loader} ${css[size]}`} />
      {variant !== 'button' && text && <span className={css.text}>{text}</span>}
    </div>
  );
}