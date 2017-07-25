import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableHeader extends Component {

	static propTypes = {
		columns: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string,
			sortable: PropTypes.bool
		})).isRequired,
		sortOrder: PropTypes.oneOf(['asc', 'desc', null]),
		sortBy: PropTypes.any,
		sortRows: PropTypes.func.isRequired
	};

	getSortIcon (col) {

		let sortIcon = null;

		if (col.sortable) {

			sortIcon = <i className="icon-sort"></i>

			if (this.props.sortBy == col.key) {
				
				if (this.props.sortOrder == 'asc') {
					sortIcon = <i className="icon-sort-asc"></i>
				} else if (this.props.sortOrder == 'desc') {
					sortIcon = <i className="icon-sort-desc"></i>
				}

			} 

		}

		return sortIcon;

	}

	render() {
	
		return (
			<thead>
				<tr>
					{
						this.props.columns.map((col, i) => {

							let sortIcon = this.getSortIcon(col);

							return (
								col.sortable ?
								<th 
									key={i} 
									className="sortable" 
									onClick={() => this.props.sortRows(col.key)}>
									{col.label}
									{sortIcon}
								</th> : 
								<th key={i}>{col.label}</th>
							);

						})
					}
				</tr>
			</thead>
		);
	
	}

}
