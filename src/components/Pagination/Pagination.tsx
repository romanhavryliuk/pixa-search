import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@/types/pagination";
import css from "./Pagination.module.css";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.breakItem}
      breakLinkClassName={css.breakLink}
      activeLinkClassName={css.activeLink}
      disabledLinkClassName={css.disabledLink}
      previousLabel={<ChevronLeft className={css.icon} aria-hidden="true" />}
      nextLabel={<ChevronRight className={css.icon} aria-hidden="true" />}
      previousAriaLabel="Previous page"
      nextAriaLabel="Next page"
    />
  );
}
