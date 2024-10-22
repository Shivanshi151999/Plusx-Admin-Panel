import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.css'
import { ReactComponent as PreviousIcon } from '../../../assets/images/right.svg';
import { ReactComponent as NextIcon } from '../../../assets/images/left.svg'; 
const Pagination = () => {
  // const [currentPage, setCurrentPage] = useState(0);
  // const chargersPerPage = 5;
  // const offset = currentPage * chargersPerPage;
  // const currentChargers = chargers.slice(offset, offset + chargersPerPage);
  // const pageCount = Math.ceil(chargers.length / chargersPerPage);
  // const handlePageClick = (event) => {
  //   setCurrentPage(event.selected);
  // };
  return (
    <>
      <ReactPaginate
        previousLabel={<PreviousIcon className={styles.icon} />}
        nextLabel={<NextIcon className={styles.icon} />}
        breakLabel={"..."}
        // pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        // onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        activeClassName={styles.activePage}
      />
    </>
  )
}

export default Pagination