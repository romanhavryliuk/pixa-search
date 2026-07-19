import type { Metadata } from "next";
import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";
import { SearchClient } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search | PixaSearch",
  description: "Browse free images and videos from Pixabay.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader variant="page" />}>
      <SearchClient />
    </Suspense>
  );
}
