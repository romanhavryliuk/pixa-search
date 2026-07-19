"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SearchType } from "@/types/pixabay";

/**
 * Спільний фільтр типу медіа (all/photo/video) — один на весь застосунок.
 * Перемикання в хедері одразу впливає на будь-які показані результати:
 * пошук, вибір категорії чи популярного тегу.
 */
interface MediaTypeContextValue {
  mediaType: SearchType;
  setMediaType: (type: SearchType) => void;
}

const MediaTypeContext = createContext<MediaTypeContextValue | null>(null);

export function MediaTypeProvider({ children }: { children: ReactNode }) {
  const [mediaType, setMediaType] = useState<SearchType>("all");

  return (
    <MediaTypeContext.Provider value={{ mediaType, setMediaType }}>
      {children}
    </MediaTypeContext.Provider>
  );
}

export function useMediaType() {
  const context = useContext(MediaTypeContext);

  if (!context) {
    throw new Error("useMediaType must be used within a MediaTypeProvider");
  }

  return context;
}
