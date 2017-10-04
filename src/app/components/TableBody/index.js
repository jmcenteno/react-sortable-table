import React from 'react';
import PropTypes from 'prop-types';

function TableBody({ rows, columns }) {

	const component = (
		<tbody>
			{
				rows.length ?
					rows.map((row, i) => {
						return (
							<tr key={i}>
								{
									columns.map((col, j) => {
										return (
											<td key={j} className={col.key == 'actions' ? col.key : ''}>
												{row[col.key]}
											</td>
										);
									})
								}
							</tr>
						);
					}) : 
					<tr>
						<td colSpan={columns.length}>No records to display</td>
					</tr>
			}
		</tbody>
	);

	return component;

}

TableBody.propTypes = {
	columns: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.string,
		label: PropTypes.string,
		sortable: PropTypes.bool
	})).isRequired,
	rows: PropTypes.array.isRequired
};

export default TableBody;
