import React, { Component } from 'react';
import { getRepo } from '../../services/service';
import { CalculateDate } from './calculate-date';
import { getGraph } from './graphs';
import './repos-item.css';

class ReposItem extends Component {
	state = {
		forks_count: null,
		parent_name: null,
		description: null,
		language: null,
		license: null,
		updated_date: null,
		counter: null,
		error: false,
	};
	componentDidMount() {
		const { item } = this.props;
		if (item.fork) {
			getRepo(item.name)
				.then((data) => {
					this.setState({ forks_count: data.parent.forks_count, parent_name: data.parent.full_name });
				})
				.catch((e) => {
					this.setState({ error: true });
				});
		}
		this.setState({
			description: item.description,
			language: item.language,
			license: item.license,
			updated_date: item.date,
			counter: item.counter,
		});
	}
	render() {
		const { item } = this.props;
		const { forks_count, parent_name, description, language, license, updated_date, counter, error } = this.state;
		let forked_content, lang_content, desc_content, color, forks_content, date_content, license_content, date_info;

		if (updated_date) {
			const day = updated_date.slice(8, 10);
			const month = updated_date.slice(5, 7);
			const year = updated_date.slice(0, 4);
			date_info = CalculateDate(day, month, year);
		}

		if (parent_name) {
			forked_content = <span className="f6 text-gray mb-1">Forked from {parent_name}</span>;
		}

		if (language) {
			switch (language) {
				case 'HTML':
					color = '#e34c26';
					break;
				case 'CSS':
					color = '#563d7c';
					break;
				case 'JavaScript':
					color = '#f1e05a';
					break;
				case 'PHP':
					color = '#4F5D95';
					break;
				case 'Ruby':
					color = '#701516';
					break;
				case 'Java':
					color = '#b07219';
					break;
				case 'C#':
					color = '#178600';
					break;
				case 'Roff':
					color = '#ecdebe';
					break;
				default:
					color = null;
			}
			lang_content = (
				<span className="ml-0 mr-3">
					<span className="repo-language-color" style={{ backgroundColor: color }}></span>
					<span>{language}</span>
				</span>
			);
		}

		if (forks_count) {
			forks_content = (
				<span className="mr-3">
					<svg
						aria-label="fork"
						className="octicon octicon-repo-forked"
						viewBox="0 0 16 16"
						version="1.1"
						width="16"
						height="16"
						role="img"
					>
						<path
							fillRule="evenodd"
							d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
						></path>
					</svg>
					<span>{forks_count}</span>
				</span>
			);
		}

		if (description) {
			desc_content = (
				<div>
					<p className="d-inline-block text-gray mb-2 pr-4">{description}</p>
				</div>
			);
		}

		if (license) {
			license_content = (
				<span className="mr-3">
					<svg
						className="octicon octicon-law mr-1"
						viewBox="0 0 16 16"
						version="1.1"
						width="16"
						height="16"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"
						></path>
					</svg>
					<span>{license}</span>
				</span>
			);
		}

		date_content = <span>Updated {date_info}</span>;

		return !error ? (
			<>
				<div className="col-10 col-lg-9 d-inline-block">
					<div className="d-inline-block mb-1">
						<h5>
							<a href="/">{item.name}</a>
						</h5>
						{forked_content}
					</div>
					{desc_content}
					<div className="f6 text-gray mt-2">
						{lang_content}
						{forks_content}
						{license_content}
						{date_content}
					</div>
				</div>
				<div className="col-2 col-lg-3 d-flex flex-column flex-justify-around">
					<div className="text-right">
						<button className="star-btn" type="submit">
							<svg
								className="octicon octicon-star mr-1"
								viewBox="0 0 16 16"
								version="1.1"
								width="16"
								height="16"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
								></path>
							</svg>
							Star
						</button>
					</div>
					<div className="text-right hide-lg hide-md hide-sm hide-xs mt-2">
						<span className="tooltipped tooltipped-s" aria-label="Past year of activity">
							<svg width="155" height="30">
								<defs>
									<linearGradient id={`gradient-${item.id}`} x1="0" x2="0" y1="1" y2="0">
										<stop offset="10%" stopColor="var(--color-calendar-graph-day-L1-bg)"></stop>
										<stop offset="33%" stopColor="var(--color-calendar-graph-day-L2-bg)"></stop>
										<stop offset="66%" stopColor="var(--color-calendar-graph-day-L3-bg)"></stop>
										<stop offset="90%" stopColor="var(--color-calendar-graph-day-L4-bg)"></stop>
									</linearGradient>
									<mask id={`sparkline-${item.id}`} x="0" y="0" width="155" height="28">
										<polyline
											transform="translate(0, 28) scale(1,-1)"
											points={getGraph(counter)}
											stroke="#8cc665"
											strokeWidth="1.5"
										></polyline>
									</mask>
								</defs>
								<g transform="translate(0, -7)">
									<rect
										x="0"
										y="-2"
										width="155"
										height="30"
										style={{
											stroke: 'none',
											fill: `url(#gradient-${item.id})`,
											mask: `url(#sparkline-${item.id})`,
										}}
									></rect>
								</g>
							</svg>
						</span>
					</div>
				</div>
			</>
		) : (
			<div>Error</div>
		);
	}
}

export default ReposItem;
