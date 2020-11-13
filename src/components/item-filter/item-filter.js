import React, { Component } from 'react';
import Select from 'react-select';
import './item-filter.css';

export default class ItemFilter extends Component {
	state = {
		label: ''
	};

	onChangeSearch = (e) => {
		const value = e.target.value;
		this.setState({ label: value });
	};

	onChangeType = (e) => {
		const { onToggleType } = this.props;
		onToggleType(e.label)
	}

	onChangeLanguage = (e) => {
		const { onToggleLanguage } = this.props;
		onToggleLanguage(e.label)
	}

	render() {
		const { onSearchPanel } = this.props;
		const { label } = this.state;
		const optionTypes = [
			{ value: 1, label: 'All' },
			{ value: 2, label: 'Sources' },
			{ value: 3, label: 'Forks' },
			{ value: 4, label: 'Archived' },
			{ value: 5, label: 'Mirrors' },
		];
		const optionLanguages = [
			{ value: 1, label: 'All' },
			{ value: 2, label: 'HTML' },
			{ value: 3, label: 'JavaScript' },
			{ value: 4, label: 'CSS' },
			{ value: 5, label: 'Ruby' },
			{ value: 6, label: 'Java' },
			{ value: 7, label: 'C#' },
			{ value: 8, label: 'Roff' },
			{ value: 9, label: 'PHP' },
		];
		return (
			<form
				className="filter d-flex"
				onKeyUp={(e) => {
					e.preventDefault();
					onSearchPanel(label);
				}}
			>
				<input
					type="search"
					className="form-control col-6"
					placeholder="Find a repository…"
					onChange={this.onChangeSearch}
					value={label}
				/>

				<Select placeholder={'Type'} className="col-2" options={optionTypes} onChange={this.onChangeType}/>
				<Select placeholder={'Language'} className="col-2" options={optionLanguages} onChange={this.onChangeLanguage}/>
				<button className="col-2 btn btn-success">
					<svg
						className="octicon octicon-repo"
						height="16"
						viewBox="0 0 16 16"
						version="1.1"
						width="16"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
						></path>
					</svg>
					New
				</button>
			</form>
		);
	}
}
