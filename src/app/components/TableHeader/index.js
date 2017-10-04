import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function TableHeader({ columns, sortOrder, sortRows }) {
	
	const component = (
		<thead>
			<tr>
				{
					columns.map((col, i) => {
						return (
							col.sortable ?
								<th 
									key={i} 
									className="sortable" 
									onClick={() => sortRows(col.key)}>
									{col.label}
									<i className={ classnames({
										['icon-sort']: !sortOrder,
										['icon-sort-asc']: sortOrder === 'asc',
										['icon-sort-desc']: sortOrder === 'desc'
									}) } />
								</th> : 
								<th key={i}>{col.label}</th>
						);

					})
				}
			</tr>
		</thead>
	);

	return component;

}

TableHeader.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		label: PropTypes.string,
		sortable: PropTypes.bool
	})).isRequired,
	sortOrder: PropTypes.oneOf(['asc', 'desc', null]),
	sortBy: PropTypes.any,
	sortRows: PropTypes.func.isRequired
};

export default TableHeader;
