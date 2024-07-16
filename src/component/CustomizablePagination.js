import React from 'react';
import { IconButton } from '@mui/material';
import './css/Customizepagination.css'; 

const CustomPagination = ({ count, rowsPerPage, page, onPageChange, onRowsPerPageChange }) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  const handlePreviousPage = () => {
    if (page > 0) {
      onPageChange(null, page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      onPageChange(null, page + 1);
    }
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(event);
  };

  const startRow = page * rowsPerPage + 1;
  const endRow = Math.min(count, (page + 1) * rowsPerPage);

  return (
    <>
    <div className="custom-pagination">
      <div className="pagination-info">
        <span>{startRow}-{endRow} of {count}</span>
      </div>
        <div className='select-menu'>
        <span>Rows per Pages:</span>
        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
          {[10, 20, 30].map((rowsOption) => (
            <option key={rowsOption} value={rowsOption}>
              {rowsOption}
            </option>
          ))}
        </select>
        </div>
      <div className="pagination-controls">
        <IconButton onClick={handlePreviousPage} disabled={page === 0}>
          <img src={require(`../image/leftArrow.png`)} />
        </IconButton>
        <span>{page + 1}/{totalPages}</span>
        <IconButton onClick={handleNextPage} disabled={page >= totalPages - 1}>
          <img src={require(`../image/RightArrowButton.png`)} />
        </IconButton>
      </div>
    </div>
    </>
  );
};

export default CustomPagination;
