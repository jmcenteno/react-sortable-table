import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import Pagination from './components/Pagination';

import styles from './styles.scss';

export default class SortableTable extends Component {

	static propTypes = {
		rows: PropTypes.array.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			label: PropTypes.string.isRequired,
			sortable: PropTypes.bool
		})).isRequired
	};

	constructor(props) {

		super(props);

		// set initial state
		this.state = {
			rows: props.rows.map(item => item),
			sortBy: null,
			sortOrder: null,
			activePage: 1
		};

		this.sortRows = this.sortRows.bind(this);
		this.setActivePage = this.setActivePage.bind(this);

	}

	componentWillReceiveProps(newProps) {

		const { rows } = newProps;

		this.setState({ rows });

	}

	/**
	 * @description Converts the given input into a paginated array
	 * @param {array} rows Array of objects
	 * @returns {array} Paginated array of objects
	 */
	getPaginatedItems(rows) {

		const paginatedItems = [];
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

	/**
	 * 
	 * @param {number} activePage The current page number
	 */
	setActivePage(activePage) {

		this.setState({ activePage });

	}

	/**
	 * 
	 * @param {string} key The object property by which the rows will be sorted
	 */
	sortRows(key) {

		let sortOrder = 'asc';

		// determine how rows will be sorted
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

			// sort rows by given property
			rows.sort((a, b) => a[key] - b[key]);

			if (sortOrder == 'desc') {
				rows = rows.reverse();
			}

		} else {

			// default to original array with no sorting
			rows = this.props.rows.map(item => item);

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
		const pages = this.getPaginatedItems(rows);

		return (
			<div className="sortable-table">

				<table className="table" style={tableStyle}>
					<TableHeader
						columns={columns}
						sortBy={sortBy}
						sortOrder={sortOrder}
						sortRows={this.sortRows}
					/>
					<TableBody
						columns={columns}
						rows={pages[activePage - 1] || pages[pages.length - 1] || rows}
					/>
				</table>

				{
					rows.length > 10 ?
						<Pagination
							activePage={activePage}
							setActivePage={this.setActivePage}
							totalPages={pages.length}
						/> :
						null
				}

			</div>
		);

	}

}
