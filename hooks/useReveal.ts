import { useEffect, useRef, useState } from 'react';

/**
 * Повертає ref і прапорець `revealed`, що стає `true`, коли елемент
 * уперше потрапляє у в'юпорт (через IntersectionObserver).
 * Використовується для плавної появи без бібліотек анімації.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    // SSR / старі середовища — показуємо одразу без анімації.
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return { ref, revealed };
}
