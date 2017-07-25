import React from 'react';
import { Pagination } from 'react-bootstrap';

export default class TableFooterComponent extends React.Component {
	
	static propTypes = {
		colSpan: React.PropTypes.number.isRequired,
		pages: React.PropTypes.number.isRequired,
		activePage: React.PropTypes.number.isRequired,
		setActivePage: React.PropTypes.func.isRequired,
	};

	constructor(props) {
		super(props);
	}

	render() {

		const {
			colSpan,
			pages,
			activePage,
			setActivePage,
			...props
		} = this.props;
		
		return (
			<tfoot>
				<tr>
					<td colSpan={colSpan}>
						<div className="row">
							<div className="col-sm-6">

							</div>
							<div className="col-sm-6">
								<div className="pull-right">
									<Pagination
										bsClass="pagination pagination-sm"
										prev={<i className="glyphicon glyphicon-triangle-left"></i>}
										next={<i className="glyphicon glyphicon-triangle-right"></i>}
										first={<i className="glyphicon glyphicon-step-backward"></i>}
										last={<i className="glyphicon glyphicon-step-forward"></i>}
										ellipsis
										boundaryLinks
										items={pages}
										maxButtons={3}
										activePage={activePage}
										onSelect={(e) => setActivePage(e)} 
									/>
								</div>
							</div>
						</div>
					</td>
				</tr>
			</tfoot>
		);

	}

}
