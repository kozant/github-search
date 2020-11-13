import React, { Component } from 'react';
import { getAllRepos } from '../../services/service';
import ItemFilter from '../item-filter/item-filter';
import HiddenBar from '../hidden-bar/hidden-bar';
import ReposList from '../repos-list/repos-list';
import './App.css';

export default class App extends Component {
	_counter = 0;
	state = {
		repos: [],
		repos_dublicate: [],
		label: '',
		type: '',
		language: '',
		error: false,
	};
	componentDidMount() {
		getAllRepos()
			.then((data) => {
				const repos = data.map((item) => {
					this._counter++;
					let license = null;
					if (item.license !== null) {
						license = item.license.name;
					}
					return {
						counter: this._counter,
						id: item.id,
						archived: item.archived,
						description: item.description,
						fork: item.fork,
						name: item.name,
						language: item.language,
						license,
						mirror_url: item.mirror_url,
						date: item.pushed_at,
					};
				});
				const repos_dublicate = repos;
				this.setState({ repos, repos_dublicate });
			})
			.catch((e) => {
				this.setState({ error: true });
			});
	}

	searchPanel = (label) => {
		this.setState({ label });
		this.setState((prevState) => {
			const nextState = prevState.repos.filter((item) => item.name.toLowerCase().includes(label.toLowerCase()));
			if (label === '') {
				return {
					repos_dublicate: prevState.repos,
				};
			} else {
				return {
					repos_dublicate: nextState,
				};
			}
		});
	};

	toggleType = (type) => {
		if (type === 'All') {
			this.setState((prevState) => {
				return {
					repos_dublicate: prevState.repos,
					type: '',
				};
			});
		}

		if (type === 'Forks') {
			this.setState((prevState) => {
				const nextState = prevState.repos.filter((item) => item.fork === true);
				return {
					repos_dublicate: nextState,
					type: 'forked',
				};
			});
		}

		if (type === 'Sources') {
			this.setState((prevState) => {
				const nextState = prevState.repos.filter((item) => item.fork === false);
				return {
					repos_dublicate: nextState,
					type: 'source',
				};
			});
		}

		if (type === 'Archived') {
			this.setState((prevState) => {
				const nextState = prevState.repos.filter((item) => item.archived === true);
				return {
					repos_dublicate: nextState,
					type: 'archived',
				};
			});
		}

		if (type === 'Mirrors') {
			this.setState((prevState) => {
				const nextState = prevState.repos.filter((item) => item.mirror_url === true);
				return {
					repos_dublicate: nextState,
					type: 'mirror',
				};
			});
		}
	};

	toggleLanguageFunction = (language, languageText) => {
		if (language === languageText) {
			this.setState((prevState) => {
				const nextState = prevState.repos.filter((item) => item.language === language);
				return {
					repos_dublicate: nextState,
					language,
				};
			});
		}
	};

	toggleLanguage = (language) => {
		if (language === 'All') {
			this.setState((prevState) => {
				return {
					repos_dublicate: prevState.repos,
					language: '',
				};
			});
		}
		this.toggleLanguageFunction(language, 'HTML');
		this.toggleLanguageFunction(language, 'CSS');
		this.toggleLanguageFunction(language, 'JavaScript');
		this.toggleLanguageFunction(language, 'Java');
		this.toggleLanguageFunction(language, 'C#');
		this.toggleLanguageFunction(language, 'Ruby');
		this.toggleLanguageFunction(language, 'PHP');
		this.toggleLanguageFunction(language, 'Roff');
	};

	deleteinfo = () => {
		window.location.reload();
	};

	render() {
		const { repos_dublicate, label, type, language, error } = this.state;
		let hiddenbar_content, repos_content;
		if (label !== '' || type !== '' || language !== '') {
			hiddenbar_content = (
				<HiddenBar
					label={label}
					repos_amount={repos_dublicate.length}
					type={type}
					language={language}
					onDeleteInfo={this.deleteinfo}
				/>
			);
		}

		!error ? (repos_content = <ReposList repos={repos_dublicate} />) : (repos_content = <div>error</div>);
		return (
			<div className="app">
				<ItemFilter
					onSearchPanel={this.searchPanel}
					onToggleType={this.toggleType}
					onToggleLanguage={this.toggleLanguage}
				/>
				{hiddenbar_content}
				{repos_content}
			</div>
		);
	}
}
