import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHeader from './thead';
import TableBody from './tbody';
import Pagination from './pagination';

import styles from './styles.scss';

export default class SortableTable extends Component {

	static propTypes = {
		rows: PropTypes.array.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string,
			sortable: PropTypes.bool
		})).isRequired
	};

	constructor(props) {
	
		super(props);

		this.state = {
			rows: this.props.rows,
			sortBy: null,
			sortOrder: null,
			activePage: 1
		};

    this.sortRows = this.sortRows.bind(this);
    this.setActivePage = this.setActivePage.bind(this);
	
	}

	componentWillReceiveProps (newProps) {

    const { rows } = newProps;

		this.setState({ rows });

	}

	getPaginatedItems(rows, page) {
	
		let paginatedItems = [];
		let counter = 0;
		let set = [];

		for (let i = 0; i < rows.length; i++) {
			
			set.push(rows[i]);
			
			if ((i + 1) % 10 == 0 || (i + 1) >= rows.length) {
				counter++;
				paginatedItems.push(set);
				set = [];
			}

		}
		
		return paginatedItems;

	}

	setActivePage (activePage) {

		this.setState({ activePage });

	}

	sortRows (key) {

		let sortOrder = 'asc';

		if (this.state.sortBy === key) {
			
			if (this.state.sortOrder === null) {
				sortOrder = 'asc';
			} else if (this.state.sortOrder === 'asc') {
				sortOrder = 'desc';
			} else if (this.state.sortOrder === 'desc') {
				sortOrder = null;
				key = null;
			}

		}

		let { rows } = this.state;

		if (sortOrder) {

			rows.sort((a, b) => a[key] - b[key]);

			if (sortOrder == 'desc') {
				rows = rows.reverse();
			}

		} else {
			rows = this.props.rows;
		}

		this.setState({
			rows,
			sortBy: key,
			sortOrder
		});

	}

	render() {

		const { columns, containerStyle, tableStyle } = this.props;
    const { rows, activePage, sortBy, sortOrder } = this.state;
		const pages = this.getPaginatedItems(rows, activePage);

		return (
			<div className="sortable-table" style={ styles }>
				
				<table className="table" style={ tableStyle }>
					<TableHeader 
						columns={ columns } 
						sortBy={ sortBy } 
						sortOrder={ sortOrder }
						sortRows={ this.sortRows }
					/>
					<TableBody
						columns={ columns }
						rows={ pages[activePage - 1] || pages[pages.length - 1] || rows }
					/>
				</table>
				
				{
					rows.length > 10 ?
            <Pagination
              activePage={ activePage }
              setActivePage={ this.setActivePage }
              totalPages={ pages.length }
            /> :
            null
				}

			</div>
		);

	}

}
