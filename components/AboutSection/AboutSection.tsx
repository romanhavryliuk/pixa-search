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
    title: 'Мільйони зображень',
    description:
      'Доступ до величезної бібліотеки високоякісних зображень та відео від Pixabay',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    icon: 'zap',
    title: 'Швидкий пошук',
    description:
      'Миттєвий пошук потрібних матеріалів за ключовими словами та фільтрами',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    icon: 'heart',
    title: 'Безкоштовно',
    description:
      'Всі зображення та відео доступні безкоштовно для комерційного використання',
    gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
  },
  {
    icon: 'shield',
    title: 'Ліцензія CC0',
    description: 'Використовуйте матеріали без обмежень та вказівки авторства',
    gradient: 'linear-gradient(135deg, #22c55e, #10b981)',
  },
];

/** Секція «Про нас»: заголовок, підзаголовок і сітка карток-переваг. */
export function AboutSection({
  title = 'Про нас',
  subtitle = 'Ваша платформа для пошуку найкращих безкоштовних зображень та відео',
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
