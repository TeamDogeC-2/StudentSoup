import React, { Dispatch, SetStateAction, useState } from 'react';
import Pagination from 'react-js-pagination';
import './paginate.scss';

export interface PaginateType {
  page: number;
  count: number;
  setPage: Dispatch<SetStateAction<number>>;
  postPerPage: number;
}

const Paginate = ({ page, count, setPage, postPerPage }: PaginateType) => {
  return (
    <>
      <Pagination
        activePage={page}
        itemsCountPerPage={postPerPage}
        totalItemsCount={count}
        pageRangeDisplayed={5}
        prevPageText="<"
        nextPageText=">"
        onChange={setPage}
        hideFirstLastPages={true}
      />
    </>
  );
};

export default Paginate;
