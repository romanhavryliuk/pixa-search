import type { Metadata } from "next";
import Link from "next/link";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "Page not found | PixaSearch",
  description: "The page you are looking for does not exist in PixaSearch.",
  openGraph: {
    title: "Page not found — PixaSearch",
    description: "The page you are looking for does not exist in PixaSearch.",
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go home</Link>
    </div>
  );
}