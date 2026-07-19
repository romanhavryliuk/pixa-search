"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Camera, Menu, X } from "lucide-react";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import type { HeaderProps } from "@/types/header";
import type { SearchType } from "@/types/pixabay";
import css from "./Header.module.css";

/**
 * Читає активний `?query=` з URL для інпуту хедера. Винесено в окремий
 * компонент під Suspense, бо `useSearchParams` інакше змусив би геть
 * усі сторінки (хедер рендериться в кореневому layout) рендеритися
 * динамічно замість статично.
 */
function HeaderSearchInput({
  onSearch,
  onSearchComplete,
}: {
  onSearch: (query: string, type: SearchType) => void;
  onSearchComplete: () => void;
}) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query")?.trim() ?? "";

  return (
    <SearchBar
      initialQuery={initialQuery}
      onSearch={onSearch}
      onSearchComplete={onSearchComplete}
    />
  );
}

export function Header({ onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const headerRef = useRef<HTMLElement | null>(null);

  // Синхронізує --header-height з реальним (змінним) розміром хедера,
  // щоб скрол до якорів (scroll-padding-top у globals.css) ніколи не
  // перекривався sticky-хедером — його висота змінюється залежно від
  // верстки SearchBar на різних брейкпоінтах і при відкритті/закритті
  // мобільного меню.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${el.offsetHeight}px`
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Якщо батьківський компонент передав onSearch — використовуємо його;
  // інакше переходимо на сторінку пошуку.
  const handleSearch = (query: string, type: SearchType) => {
    if (onSearch) {
      onSearch(query, type);
      return;
    }

    const params = new URLSearchParams({ query, type });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <header className={css.header} ref={headerRef}>
      <div className={css.container}>
        <div className={css.inner}>
          <div className={css.topRow}>
            <Link href="/" className={css.logo}>
              <div className={css.logoIcon}>
                <Camera className={css.logoSvg} />
              </div>

              <h1 className={css.logoText}>PixaSearch</h1>
            </Link>

            <div className={css.search}>
              <Suspense
                fallback={
                  <SearchBar
                    onSearch={handleSearch}
                    onSearchComplete={closeMobileMenu}
                  />
                }
              >
                <HeaderSearchInput
                  onSearch={handleSearch}
                  onSearchComplete={closeMobileMenu}
                />
              </Suspense>
            </div>

            <nav className={css.desktopNav}>
              <Link href="/#about" className={css.navLink}>
                About Us
              </Link>

              <Link href="/#popular" className={css.navLink}>
                Popular
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={css.mobileMenuButton}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className={css.menuIcon} />
              ) : (
                <Menu className={css.menuIcon} />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className={css.mobileNav}>
              <Link href="/#about" className={css.navLink} onClick={closeMobileMenu}>
                About Us
              </Link>

              <Link href="/#popular" className={css.navLink} onClick={closeMobileMenu}>
                Popular
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}