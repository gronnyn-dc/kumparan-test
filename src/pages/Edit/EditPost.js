import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Edit.css';
import env from '../../utils/index';

function EditPost() {
	const location = useLocation();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	useEffect(() => {
		if (location.state) {
			axios.get(`${env.API_URL}posts/${location.state.post_id}`).then((res) => {
				setTitle(res.data.title);
				setBody(res.data.body);
			});
		}
	}, [location.state]);

	const handleClickSubmit = () => {
		const payload = {
			id: location.state.post_id,
			title: title,
			body: body,
			user_id: location.state.user_id,
		};
		const axiosConfig = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};
		axios.put(`${env.API_URL}posts/${location.state.post_id}`, payload, axiosConfig).then((res) => {
			if (res.status === 200) {
				history.push(`/detail/${location.state.user_id}`);
			}
		});
	};
	return (
		<div className='kumparan__flex kumparan__flexColumn kumparan__width80Percent kumparan__marginHorizontalAuto'>
			<h1>Edit Post</h1>
			<div>
				<p>Title:</p>
				<input
					type='text'
					value={title}
					id='title'
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Enter the Title'
					autoComplete='off'
					className='kumparan__titleInput kumparan__mb30'
				/>
			</div>
			<div>
				<p>Description:</p>
				<textarea
					id='body'
					value={body}
					onChange={(e) => setBody(e.target.value)}
					className='kumparan__inputContent'
					placeholder='Write the Content'
				/>
			</div>
			<button type='button' className='kumparan__editSubmitButton kumparan__pointer' onClick={() => handleClickSubmit()}>
				Submit
			</button>
		</div>
	);
}

export default EditPost;
