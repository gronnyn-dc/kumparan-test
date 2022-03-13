import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Edit.css';
import env from '../../utils/index';

function EditComment() {
	const location = useLocation();
	const history = useHistory();
	const params = useParams();
	const [body, setBody] = useState('');
	console.log(params);

	useEffect(() => {
		axios.get(`${env.API_URL}comments/${params.commentId}`).then((res) => {
			setBody(res.data.body);
		});
	}, []);

	const handleClickSubmit = () => {
		const payload = {
			body: body,
		};
		const axiosConfig = {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		};
		axios.put(`${env.API_URL}comments/${params.commentId}`, payload, axiosConfig).then((res) => {
			if (res.status === 200) {
				history.push(`/post/${params.id}`);
			}
		});
	};
	return (
		<div className='kumparan__flex kumparan__flexColumn kumparan__width80Percent kumparan__marginHorizontalAuto'>
			<h1>Edit Comment</h1>
			<div>
				<p>Body:</p>
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

export default EditComment;
