import React from 'react';
import ReposItem from '../repos-item/repos-item';
import './repos-list.css';

const ReposList = ({ repos }) => {
	const elements = repos.map((item) => {
		
		return (
			<li key={item.id} className='d-flex py-4 border-bottom'>
				<ReposItem item={item}  />
			</li>
		);
	});

	return <ul>{elements}</ul>;
};

export default ReposList;
