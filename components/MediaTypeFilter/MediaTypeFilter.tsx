"use client";

import { Image, Video } from "lucide-react";
import type { MediaTypeFilterProps } from "@/types/mediaTypeFilter";
import css from "./MediaTypeFilter.module.css";

export function MediaTypeFilter({
  value,
  onChange,
  className,
}: MediaTypeFilterProps) {
  return (
    <div className={[css.filters, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        onClick={() => onChange("all")}
        className={`${css.filterButton} ${
          value === "all" ? css.activeFilterButton : ""
        }`}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onChange("photo")}
        className={`${css.filterButton} ${css.filterButtonWithIcon} ${
          value === "photo" ? css.activeFilterButton : ""
        }`}
      >
        <Image className={css.filterIcon} />
        Images
      </button>

      <button
        type="button"
        onClick={() => onChange("video")}
        className={`${css.filterButton} ${css.filterButtonWithIcon} ${
          value === "video" ? css.activeFilterButton : ""
        }`}
      >
        <Video className={css.filterIcon} />
        Videos
      </button>
    </div>
  );
}
