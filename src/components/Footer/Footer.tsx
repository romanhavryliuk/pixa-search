import type { ReactNode } from 'react';
import type {
  FooterColumn,
  FooterProps,
  FooterSocial,
  SocialType,
} from '@/types/footer';

declare module './Footer.module.css';

import css from './Footer.module.css';
import {
  LogoIcon,
  GithubIcon,
  TwitterIcon,
  MailIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
  LinkIcon,
} from './icons';

const SOCIAL_ICONS: Record<SocialType, ReactNode> = {
  github: <GithubIcon />,
  twitter: <TwitterIcon />,
  email: <MailIcon />,
  linkedin: <LinkedinIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  youtube: <YoutubeIcon />,
  link: <LinkIcon />,
};

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Search', href: '/#search' },
      { label: 'About', href: '/#about' },
      { label: 'Popular', href: '/#popular' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Pixabay', href: 'https://pixabay.com/', external: true },
      { label: 'API Documentation', href: '#' },
      { label: 'Terms of Use', href: '#' },
    ],
  },
];

const DEFAULT_SOCIALS: FooterSocial[] = [
  { type: 'github', href: '#', label: 'Github' },
  { type: 'twitter', href: '#', label: 'Twitter' },
  { type: 'email', href: '#', label: 'Email' },
];

const DEFAULT_DESCRIPTION =
  'A modern platform for searching high-quality images and videos via the ' +
  'Pixabay API. Free, fast and convenient.';

const DEFAULT_ATTRIBUTION = (
  <>
    Images provided by{' '}
    <a
      href="https://pixabay.com/"
      target="_blank"
      rel="noopener noreferrer"
      className={css.bottom__link}
    >
      Pixabay
    </a>
  </>
);

/** Атрибути посилання з урахуванням `external`. */
function linkAttrs(external?: boolean) {
  return external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
}

function Footer({
  brandName = 'PixaSearch',
  description = DEFAULT_DESCRIPTION,
  logo,
  columns = DEFAULT_COLUMNS,
  socials = DEFAULT_SOCIALS,
  year = new Date().getFullYear(),
  copyright,
  attribution = DEFAULT_ATTRIBUTION,
  className,
}: FooterProps) {
  const footerClass = className ? `${css.footer} ${className}` : css.footer;

  return (
    <footer className={footerClass}>
      <div className={css.container}>
        <div className={css.grid}>
          {/* Бренд + опис + соцмережі */}
          <div className={css.brand}>
            <div className={css.brand__head}>
              {logo ?? (
                <span className={css.logo}>
                  <LogoIcon />
                </span>
              )}
              <h3 className={css.brand__name}>{brandName}</h3>
            </div>

            {description && <p className={css.brand__desc}>{description}</p>}

            {socials.length > 0 && (
              <div className={css.socials}>
                {socials.map((social, i) => (
                  <a
                    key={`${social.type}-${i}`}
                    href={social.href}
                    className={css.social}
                    aria-label={social.label ?? social.type}
                    {...linkAttrs(social.type !== 'email')}
                  >
                    {social.icon ?? SOCIAL_ICONS[social.type]}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Колонки посилань */}
          {columns.map((column, i) => (
            <nav
              key={`${column.title}-${i}`}
              className={css.col}
              aria-label={column.title}
            >
              <h4 className={css.col__title}>{column.title}</h4>
              <ul className={css.col__list}>
                {column.links.map((link, j) => (
                  <li key={`${link.label}-${j}`}>
                    <a
                      href={link.href}
                      className={css.link}
                      {...linkAttrs(link.external)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Нижній рядок */}
        <div className={css.bottom}>
          <p className={css.bottom__text}>
            {copyright ?? `© ${year} ${brandName}. All rights reserved.`}
          </p>
          {attribution != null && (
            <p className={css.bottom__text}>{attribution}</p>
          )}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
