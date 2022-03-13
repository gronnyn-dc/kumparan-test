import './Detail.css';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { BsTrash, BsPencil } from 'react-icons/bs';
import env from '../../utils/index';

function Detail() {
	const history = useHistory();
	const params = useParams();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [albums, setAlbums] = useState([]);
	const [activeSession, setActiveSession] = useState('posts');
	const [postLoading, setPostLoading] = useState(true)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`${env.API_URL}users/${params.id}`).then((res) => {
			if (res.status === 200) {
				setUser(res.data);
				axios.get(`${env.API_URL}users/${params.id}/posts`).then((res) => {
					if (res.status === 200) {
						setPosts(res.data);
						setLoading(false)
						setPostLoading(false)
					}
				});
			}
		});
		axios.get(`${env.API_URL}users/${params.id}/albums`).then((res) => {
			if (res.status === 200) {
				setAlbums(res.data);
			}
		});
	}, []);

	const handleClickSection = (value) => {
		setActiveSession(value);
	};

	const handleClickPost = (post) => {
		history.push(`/post/${post.id}`, { post_id: post.id, user_id: post.userId });
	};

	const handleClickEdit = (post) => {
		history.push(`/detail/${user.id}/edit/${post.id}`, { post_id: post.id, user_id: user.id });
	};

	const handleClickDelete = (post) => {
		setPostLoading(true)
		axios.delete(`${env.API_URL}posts/${post.id}`).then((res) => {
			if (res.status === 200) {
				axios.get(`${env.API_URL}users/${params.id}/posts`).then((res) => {
					if (res.status === 200) {
						setPostLoading(false)
						setPosts(res.data);
					}
				});
			}
		});
	};

	const handleClickAlbum = (album) => {
		history.push(`/detail/${user.id}/album/${album.id}`);
	};

	const handleClickAddnewPost = () => {
		history.push(`/post/${params.id}/add`);
	};

	if (!loading) {
		return (
			<div className='kumparan__detailWrapper'>
				<div className='kumparan__detailContainer'>
					<div className='kumparan__flex kumparan__flexColumn kumparan__alignCenter'>
						<span className='kumparan__detailName kumparan__mt30'>{user.name}</span>
						<span className='kumparan__detailUsername kumparan__mt10'>@{user.username}</span>
					</div>
					<div className='kumparan__flex kumparan__alignCenter kumparan__justifyCenter kumparan__mt50'>
						<div onClick={() => handleClickSection('posts')} className='kumparan__pointer'>
							<span className={`kumparan__detailText ${activeSession === 'posts' && 'kumparan__detailTextActive'}`}>Posts</span>
						</div>
						<div onClick={() => handleClickSection('albums')} className='kumparan__pointer'>
							<span className={`kumparan__detailText ${activeSession === 'albums' && 'kumparan__detailTextActive'}`}>Albums</span>
						</div>
					</div>
					{activeSession === 'posts' && (
						<>
							{!postLoading ? (
								<div className='kumparan__flex kumparan__flexColumn kumparan__mt30'>
									<div className='kumparan__flex kumparan__width80Percent'>
										<div
											className='kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__newPost kumparan__width80Percent kumparan__mlAuto kumparan__pointer kumparan__titleText'
											onClick={() => handleClickAddnewPost()}
										>
											<span className='kumparan__titleText'>(+) Add New Post</span>
										</div>
									</div>
									{posts.length > 0 ? (
										posts.map((post, index) => {
											return (
												<div className='kumparan__flex kumparan__width80Percent' key={index}>
													<div
														className='kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__content kumparan__width80Percent kumparan__mlAuto kumparan__pointer kumparan__titleText'
														onClick={() => handleClickPost(post)}
													>
														<span className='kumparan__titleText'>{post.title}</span>
														<span className='kumparan__bodyText'>{post.body}</span>
													</div>
													<div className='kumparan__icon kumparan__flex kumparan__flexColumn kumparan__pointer'>
														<div className='kumparan__pencilIcon' onClick={() => handleClickEdit(post)}>
															<BsPencil />
														</div>
														<div className='kumparan__trashIcon kumparan__mt30' onClick={() => handleClickDelete(post)}>
															<BsTrash />
														</div>
													</div>
												</div>
											);
										})
									) : (
										<span>There's no Posts</span>
									)}
								</div>
							) :
								<div className="kumparan__loadingCenter" />
							}
						</>
					)}
					{activeSession === 'albums' && (
						<div className='kumparan__flex kumparan__flexColumn kumparan__mt30'>
							{albums.length > 0 ? (
								albums.map((album, index) => {
									return (
										<div
											key={index}
											className='kumparan__flex kumparan__flexColumn kumparan__mb20 kumparan__content kumparan__width80Percent kumparan__marginHorizontalAuto kumparan__pointer kumparan__titleText'
											onClick={() => handleClickAlbum(album)}
										>
											<span className='kumparan__titleText'>{album.title}</span>
										</div>
									);
								})
							) : (
								<span>Theres no Posts</span>
							)}
						</div>
					)}
				</div>
			</div>
		);
	} else {
		return (
			<div className="kumparan__loadingCenter" />
		)
	}
}

export default Detail;
