import './Detail.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Detail() {
	const location = useLocation();
	const params = useParams();

	useEffect(() => {
		axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}/posts`).then((res) => {
			if (res.status === 200) {
				console.log(res.data, 'posts');
			}
		});
		axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}/albums`).then((res) => {
			if (res.status === 200) {
				console.log(res.data, 'album');
			}
		});
		axios.get(`https://jsonplaceholder.typicode.com/albums/${params.id}/photos`).then((res) => {
			if (res.status === 200) {
				console.log(res.data, 'photo dari album');
			}
		});
	}, []);

	return (
		<div>
			<p>user id {params.id}</p>
		</div>
	);
}

export default Detail;
