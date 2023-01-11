import { CustomAlert } from '@jonghyun/core';
import { useEffect } from 'react';

export default function Web() {
	useEffect(() => {
		CustomAlert.success('하이');
	}, []);
	return (
		<div>
			<h1>MonoRepoStart</h1>
		</div>
	);
}
