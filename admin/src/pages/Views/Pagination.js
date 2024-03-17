import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
        onNextFun,
        onPreviousFun,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    // if (currentPage === 0 || paginationRange.length < 2) {
    //     return null;
    // }

    const totalPages = Math.ceil(totalCount / pageSize);

    const onNext = () => {
        if (lastPage !== currentPage) {
            onPageChange(currentPage + 1);
            props.onNextFun()
        }
    };

    const onPrevious = () => {
        if (currentPage !== 1) {
            onPageChange(currentPage - 1);
            props.onPreviousFun()
        }
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <div className="d-flex justify-content-end mt-4">
            <div className="pagination-wrap hstack gap-2">
                <span className={classnames('page-item pagination-item pagination-prev pagination-item', {
                    disabled: currentPage === 1
                })} onClick={onPrevious}>
                    Previous
                </span>
                {/* <ul
                    className={classnames('pagination listjs-pagination mb-0', { [className]: className })}
                >
                    {paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return <li key={index} className="pagination-item dots">&#8230;</li>;
                        }
                        return (
                            <li key={index}
                                className={classnames('pagination-item', {
                                    active: pageNumber === currentPage
                                })}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                <span className="page" >
                                    {pageNumber}
                                </span>
                            </li>
                        );
                    })}
                </ul> */}
                <ul
                    className={classnames('pagination listjs-pagination mb-0', { [className]: className })}
                >
                    <li className="col-md-auto d-none d-md-block">
                        Page{" "}
                        <strong>
                            {currentPage} of {totalPages}
                        </strong>
                    </li>
                </ul>
                <span className={classnames('page-item pagination-item pagination-next pagination-item', {
                    disabled: currentPage === lastPage
                })} onClick={onNext}>
                    Next
                </span>
            </div>
        </div>
    );
};

export default Pagination;