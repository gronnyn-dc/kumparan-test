import '../Edit/Edit.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../utils/index';
import { useParams, useHistory } from 'react-router-dom';

function AddPost() {
	const params = useParams();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [loading, setLoading] = useState(false)

	const handleClickSubmit = () => {
		if (title.length > 0 && body.length > 0) {
			setLoading(true)
			const axiosConfig = {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			};
			const payload = {
				title: title,
				body: body,
				user_id: params.id,
			};
			axios.post(`${env.API_URL}posts`, payload, axiosConfig).then((res) => {
				if (res.status === 200 || res.status === 201) {
					setLoading(false)
					history.push(`/detail/${params.id}`);
				} else {
					setLoading(false)
					alert('Error while submitting, please try again.')
				}
			});
		} else {
			if (title.length < 1 && body.length < 1) {
				alert('Please fill the title and description');
			} else if (body.length < 1) {
				alert('Please fill the description');
			} else {
				alert('Please fill the title');
			}
		}
	};

	return (
		<div className='kumparan__flex kumparan__flexColumn kumparan__width80Percent kumparan__marginHorizontalAuto'>
			<h1>Add Post</h1>
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
			<button type='button' className={`kumparan__editSubmitButton kumparan__pointer ${loading && 'kumparan__loading'}`} onClick={() => handleClickSubmit()} disabled={loading}>
				Submit
			</button>
		</div>
	);
}

export default AddPost;
