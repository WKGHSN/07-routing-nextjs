import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest(`.${styles.pagination} a`)) {
          e.preventDefault();
        }
      }}
    >
      <ReactPaginate
        pageCount={pageCount}
        forcePage={currentPage - 1}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.active}
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
      />
    </div>
  );
}
