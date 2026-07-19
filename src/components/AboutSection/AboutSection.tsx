'use client';

import type { CSSProperties } from 'react';
import css from './AboutSection.module.css';
import { useReveal } from '@/hooks/useReveal';
import { FeatureCard } from '@/components/FeatureCard/FeatureCard';
import type { AboutFeature, AboutSectionProps } from '@/types/about';

/** Дефолтний контент секції «Про нас» (PixaSearch). */
const DEFAULT_FEATURES: AboutFeature[] = [
  {
    icon: 'sparkles',
    title: 'Millions of images',
    description:
      'Access a vast library of high-quality images and videos from Pixabay',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: 'zap',
    title: 'Fast search',
    description:
      'Instantly find the content you need with keywords and filters',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    icon: 'heart',
    title: 'Free of charge',
    description:
      'All images and videos are free to use, including for commercial projects',
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
  },
  {
    icon: 'shield',
    title: 'CC0 license',
    description: 'Use the content without restrictions or attribution',
    gradient: 'linear-gradient(135deg, #22c55e, #10b981)',
  },
];

/** Секція «Про нас»: заголовок, підзаголовок і сітка карток-переваг. */
export function AboutSection({
  title = 'About us',
  subtitle = 'Your platform for finding the best free images and videos',
  features = DEFAULT_FEATURES,
  className,
  id = 'about',
}: AboutSectionProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();

  const sectionClass = [css.section, className].filter(Boolean).join(' ');
  const reveal = revealed ? css.revealIn : '';

  return (
    <section id={id} className={sectionClass}>
      <div className={css.container}>
        <div className={css.header} ref={ref}>
          {title && (
            <h2
              className={`${css.title} ${reveal}`}
              style={{ '--index': 0 } as CSSProperties}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={`${css.subtitle} ${reveal}`}
              style={{ '--index': 1 } as CSSProperties}
            >
              {subtitle}
            </p>
          )}
        </div>

        <div className={css.grid}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
