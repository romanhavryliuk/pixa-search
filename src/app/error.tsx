"use client";

import Link from "next/link";
import homeCss from "./Home.module.css";
import css from "./Error.module.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={css.wrapper}>
      <h1 className={homeCss.title}>Something went wrong</h1>
      <p className={homeCss.description}>
        An unexpected error occurred while loading this page. You can try
        again or head back to the homepage.
      </p>
      <div className={css.actions}>
        <button type="button" onClick={reset} className={css.retryButton}>
          Try again
        </button>
        <Link href="/" className={css.homeLink}>
          Go home
        </Link>
      </div>
    </div>
  );
}
