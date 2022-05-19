import { Pagination } from "react-bootstrap";

interface TablePaginationProps {
  totalPages: number;
  currentPage: number;
  dispatch: (action: {type: string, payload: Object}) => void;
};

const TablePagination = ({totalPages, currentPage, dispatch}: TablePaginationProps) => {

  const renderPaginationItems = () => {
    const maxPagesRange = 5; //must be an odd number
    const maxPagesLeft = (maxPagesRange - 1) / 2;
    const maxFirstPage = Math.max(totalPages - (maxPagesRange - 1), 1);
    const firstShowPage = Math.min(Math.max(currentPage - maxPagesLeft, 1), maxFirstPage);

    return Array.from({length: Math.min(maxPagesRange, totalPages)})
      .map((_, index) => index + firstShowPage)
      .map(page => (
        <Pagination.Item 
          key={page} 
          onClick={() => handleChangePage(page)}
          active={page === currentPage}
        >
          {page}
        </Pagination.Item>
      ));
  };

  const handleChangePage = (page: number): void => {
    dispatch({
      type: 'CHANGED_PAGE',
      payload: {
        currentPage: page
      }
    });
  };

  return (
    <Pagination size="sm">
      <Pagination.First onClick={() => handleChangePage(1)}>
        {'First'}
      </Pagination.First>
      {renderPaginationItems()}
      <Pagination.Last onClick={() => handleChangePage(totalPages)}>
        {'Last'}
      </Pagination.Last>
    </Pagination>
  );
};

export default TablePagination;
