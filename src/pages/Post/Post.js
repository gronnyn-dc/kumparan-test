import './Post.css';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../utils/index';
import CommentCard from '../../components/Card/CommentCard';

function Post() {
	const location = useLocation();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [comments, setComments] = useState([]);
	const [userComment, setUserComment] = useState('');
	const params = useParams();
	console.log(params, 'aaa');

	useEffect(() => {
		axios.get(`${env.API_URL}posts/${params.id}`).then((res) => {
			setTitle(res.data.title);
			setBody(res.data.body);
		});
		axios.get(`${env.API_URL}comments?postId=${params.id}`).then((res) => {
			setComments(res.data);
		});
	}, []);

	const handleSendComment = () => {
		if (userComment.length > 0) {
			const axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};
			const payload = {
				body: userComment,
			};
			axios.post(`${env.API_URL}comments?postId=${params.id}`, payload, axiosConfig).then((res) => {
				if (res.status === 200 || res.status === 201) {
					history.goBack();
				}
			});
		}
	};

	const handleClickDelete = (post) => {
		axios.delete(`${env.API_URL}comments/${post.id}`).then((res) => {
			if (res.status === 200) {
				axios.get(`${env.API_URL}comments?postId=${params.id}`).then((res) => {
					setComments(res.data);
				});
			}
		});
	};

	const handleClickEdit = (post) => {
		history.push(`/post/${post.postId}/edit-comment/${post.id}`, { post_id: post.postId, comment_id: post.id, post_body: post.body });
	};

	return (
		<div className='kumparan__flex kumparan__flexColumn kumparan__width80Percent kumparan__marginHorizontalAuto kumparan__postContainer'>
			<span className='kumparan__fontBold kumparan__mb20 kumparan__font20'>{title}</span>
			<span className='kumparan__font16 kumparan__mb20'>{body}</span>
			{comments.length > 0 && (
				<div className='kumparan__mb100'>
					<p className='kumparan__fontBold'>Comment</p>
					{comments.map((comment, index) => {
						return (
							<div key={index}>
								<CommentCard comment={comment} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} />
							</div>
						);
					})}
					<div className='kumparan__commentUserContainer kumparan__width80Percent kumparan__flex kumparan__flexRow'>
						<textarea
							placeholder='Tambahkan komentar…'
							className='kumparan__commentUserInput'
							autoComplete='off'
							autoCorrect='off'
							id='userComment'
							value={userComment}
							onChange={(e) => setUserComment(e.target.value)}
						/>
						<button
							className={`kumparan__sendButton ${userComment.length < 1 && 'kumparan__sendButtonDisable'} kumparan__pointer`}
							onClick={() => handleSendComment()}
						>
							Kirim
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Post;
