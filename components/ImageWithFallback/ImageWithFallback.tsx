'use client';

import { useState } from 'react';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import type { ImageWithFallbackProps } from '@/types/imageWithFallback';
import css from './ImageWithFallback.module.css';

/**
 * Зображення з плейсхолдером завантаження та фолбеком на випадок помилки,
 * на основі `next/image` (авто-ресайз/конвертація формату/CDN-кешування —
 * дозволені хости прописані в `next.config.mjs`). `className`, переданий
 * споживачем, задає розмір/позицію обгортки (режим `fill`), тож верстка
 * лишається консистентною в усіх трьох станах.
 */

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

type Status = 'loading' | 'loaded' | 'error';

function ImageWithFallback({
  src,
  alt,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 25vw',
}: ImageWithFallbackProps) {
  const [status, setStatus] = useState<Status>('loading');

  if (status === 'error') {
    return (
      <div className={[css.fallback, className].filter(Boolean).join(' ')}>
        <img
          src={ERROR_IMG_SRC}
          alt="Failed to load image"
          data-original-url={src}
          className={css.fallback__img}
        />
      </div>
    );
  }

  return (
    <div className={[css.wrapper, className].filter(Boolean).join(' ')}>
      {status === 'loading' && (
        <span className={css.placeholder}>
          <Loader variant="fill" size="small" />
        </span>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${css.img} ${status === 'loaded' ? css.imgLoaded : ''}`}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export default ImageWithFallback;
