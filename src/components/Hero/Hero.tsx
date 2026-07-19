'use client';

import { ArrowDown, Search } from 'lucide-react';
import { motion } from 'motion/react';
import css from './Hero.module.css';

export function Hero() {
  // Поле пошуку в хедері завжди на екрані (sticky-хедер), тому ручний
  // скрол не потрібен — сам виклик focus() змусить браузер підскролити
  // його у видиму область у рідкісному випадку, коли воно не повністю
  // видиме.
  const focusSearchInput = () => {
    document.getElementById('media-search-input')?.focus();
  };

  return (
    <section className={css.hero}>
      <div className={css.backgroundElements}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`${css.blob} ${css.blueBlob}`}
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`${css.blob} ${css.purpleBlob}`}
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`${css.blob} ${css.pinkBlob}`}
        />
      </div>

      <div className={css.container}>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className={css.title}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find the perfect
            <br />
            <span className={css.titleAccent}>image or video</span>
          </motion.h1>

          <motion.p
            className={css.description}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Search millions of free, high-quality images and videos from
            creators around the world.
          </motion.p>

          <motion.div
            className={css.actions}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              type="button"
              onClick={focusSearchInput}
              className={css.primaryButton}
            >
              <Search className={css.primaryButtonIcon} />
              Search now
            </button>

            <a href="#about" className={css.secondaryButton}>
              Learn more
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={css.stats}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className={css.statCard}>
            <div className={`${css.statValue} ${css.blueText}`}>2.9M+</div>
            <div className={css.statLabel}>Images</div>
          </div>

          <div className={css.statCard}>
            <div className={`${css.statValue} ${css.purpleText}`}>100K+</div>
            <div className={css.statLabel}>Videos</div>
          </div>

          <div className={css.statCard}>
            <div className={`${css.statValue} ${css.pinkText}`}>100%</div>
            <div className={css.statLabel}>Free</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={css.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className={css.scrollIndicatorIcon} />
      </motion.div>
    </section>
  );
}
