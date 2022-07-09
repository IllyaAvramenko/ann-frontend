import React, { FC } from 'react';
import classnames from 'classnames';
import s from './Pagination.module.css';
import { DOTS, usePagination } from '../../hooks/usePagination';
import classNames from 'classnames';

interface IProps {
   onPageChange: (page: number) => void
   totalCount: number
   siblingCount?: number
   currentPage: number | string
   pageSize: number
   className: string
}

const Pagination: FC<IProps> = props => {
   const {
      onPageChange,
      totalCount,
      siblingCount = 1,
      pageSize,
      className
   } = props;

   const currentPage = Number(props.currentPage);

   const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize
   });

   if (paginationRange.length < 2) {
      return null;
   }

   const onNext = () => {
      onPageChange(currentPage + 1);
   };

   const onPrevious = () => {
      onPageChange(currentPage - 1);
   };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
      <ul
         className={classnames(s.pagination__container, { [className]: className })}
      >
         <li
         className={classnames(s.pagination__item, {
            disabled: currentPage === 1
         })}
         onClick={onPrevious}
         >
         <div className={classNames(s.arrow, s.left)} />
         </li>
         {paginationRange.map(pageNumber => {
         if (pageNumber === DOTS) {
            return <li className={classNames(s.pagination__item, s.dots)}>&#8230;</li>;
         }

         return (
            <li
               className={classnames(s.pagination__item, {
                  [s.selected]: pageNumber === currentPage
               })}
               onClick={() => onPageChange(pageNumber)}
            >
               {pageNumber}
            </li>
         );
         })}
         <li
         className={classnames(s.pagination__item, {
            disabled: currentPage === lastPage
         })}
         onClick={onNext}
         >
         <div className={classNames(s.arrow, s.right)} />
         </li>
      </ul>
   );
};

export default Pagination;
