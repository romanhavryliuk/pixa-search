'use client';

import type { CSSProperties } from 'react';
import css from './FeatureCard.module.css';
import { useReveal } from '@/hooks/useReveal';
import { FEATURE_ICONS } from './icons';
import type { FeatureCardProps, FeatureIcon } from '@/types/about';

const DEFAULT_GRADIENT = 'linear-gradient(135deg, #3b82f6, #06b6d4)';

function isFeatureIcon(value: unknown): value is FeatureIcon {
  return (
    value === 'sparkles' ||
    value === 'zap' ||
    value === 'heart' ||
    value === 'shield'
  );
}

/** Одна картка-перевага з іконкою, заголовком та описом. */
export function FeatureCard({
  feature,
  index = 0,
  className,
}: FeatureCardProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  const { icon, title, description, gradient } = feature;

  const Icon = isFeatureIcon(icon) ? FEATURE_ICONS[icon] : null;

  const wrapClass = [css.wrap, revealed ? css.revealIn : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={ref}
      className={wrapClass}
      style={{ '--index': index } as CSSProperties}
    >
      <div className={css.card}>
        <div
          className={css.iconWrap}
          style={{ background: gradient ?? DEFAULT_GRADIENT }}
        >
          {Icon ? <Icon /> : icon}
        </div>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}

export default FeatureCard;
