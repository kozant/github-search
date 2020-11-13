import React, { Component } from 'react';
import './hidden-bar.css';

export default class HiddenBar extends Component {
	render() {
		const { label, repos_amount, onDeleteInfo, type, language } = this.props;
		let content = null;
		if (label) {
			content = (
				<div className="issues-reset-text col-10">
					<strong>{repos_amount}</strong>
					<span>results for repositories matching</span>
					<strong>{label}</strong>
				</div>
			);
		}

		if (type) {
			content = (
				<div className="issues-reset-text col-10">
					<strong>{repos_amount}</strong>
					<span>results for</span>
					<strong>{type}</strong>
					<span>repositories</span>
				</div>
			);
		}

		if(language) {
			content = (
				<div className="issues-reset-text col-10">
					<strong>{repos_amount}</strong>
					<span>results for repositories written in</span>
					<strong>{language}</strong>
				</div>
			);
		}
		return (
			<div className="TableObject border-bottom border-gray-light py-3 d-flex">
				{content}
				<div className="col-2">
					<div className="issues-reset-query ml-3">
						<svg
							className="octicon octicon-x issues-reset-query-icon mt-1"
							viewBox="0 0 16 16"
							version="1.1"
							width="16"
							height="16"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
							></path>
						</svg>
						<span onClick={onDeleteInfo}>Clear filter</span>
					</div>
				</div>
			</div>
		);
	}
}
