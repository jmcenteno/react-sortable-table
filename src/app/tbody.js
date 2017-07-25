import React from 'react';

class TableBodyComponent extends React.Component {

	static propTypes = {
		columns: React.PropTypes.arrayOf(React.PropTypes.shape({
			key: React.PropTypes.string,
			label: React.PropTypes.string,
			sortable: React.PropTypes.bool
		})).isRequired,
		rows: React.PropTypes.array.isRequired
	};

	render() {

		const {
			rows,
			columns,
			...props
		} = this.props;
		
		return (
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
						<td colSpan={columns.length}>No records found</td>
					</tr>
				}
			</tbody>
		);

	}

}

export default TableBodyComponent;
