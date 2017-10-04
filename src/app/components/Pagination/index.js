import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ activePage, totalPages, setActivePage }) {

  return (
    <nav className="sortable-table-pagination" aria-label="Page navigation">
      <a 
        className="btn btn-default btn-sm" 
        disabled={activePage == 1} 
        onClick={() => setActivePage(1)}
        title="First">
        <i className="icon-angle-double-left"></i>
      </a>
      <a 
        className="btn btn-default btn-sm" 
        disabled={activePage == 1}
        onClick={() => setActivePage(activePage <= 1 ? 1 : activePage - 1)}
        title="Previous">
        <i className="icon-angle-left"></i>
      </a>
      <a 
        className="btn btn-default btn-sm" 
        disabled={activePage == totalPages}
        onClick={() => setActivePage(activePage >= totalPages ? totalPages : activePage + 1)}
        title="Next">
        <i className="icon-angle-right"></i>
      </a>
      <a 
        className="btn btn-default btn-sm" 
        disabled={activePage == totalPages}
        onClick={() => setActivePage(totalPages)}
        title="Last">
        <i className="icon-angle-double-right"></i>
      </a>
    </nav>
  );

}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired, 
  totalPages: PropTypes.number.isRequired, 
  setActivePage: PropTypes.func.isRequired
};

export default Pagination;
