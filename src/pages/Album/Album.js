import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../utils/index';
import '../Detail/Detail.css';
import '../Album/Album.css';

function Album() {
	const params = useParams();
	const [user, setUser] = useState({});
	const [photos, setPhotos] = useState([]);
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios.get(`${env.API_URL}users/${params.id}`).then((res) => {
			if (res.status === 200) {
				setUser(res.data);
				axios.get(`${env.API_URL}albums/${params.albumId}/photos`).then((res) => {
					if (res.status === 200) {
						setPhotos(res.data);
						setLoading(false)
					}
				});
			}
		});
	}, []);

	const handleClickImage = (photo) => {
		window.open(photo.thumbnailUrl);
	};
	if (!loading) {
		return (
			<div className='kumparan__detailWrapper'>
				<div className='kumparan__detailContainer'>
					<div className='kumparan__flex kumparan__flexColumn kumparan__alignCenter'>
						<span className='kumparan__detailName kumparan__mt30'>{user.name}</span>
						<span className='kumparan__detailUsername kumparan__mt10'>@{user.username}</span>
					</div>
				</div>
				{photos.length > 0 && (
					<div className='kumparan__whiteBackground kumparan__width80Percent kumparan__marginHorizontalAuto'>
						<div className='kumparan__flex kumparan__flexRow kumparan__flexWrap'>
							{photos.map((photo, index) => {
								return (
									<div key={index} className='kumparan__p20 kumparan__pointer kumparan__photoContainer' onClick={() => handleClickImage(photo)}>
										<img src={photo.thumbnailUrl} alt='photo' />
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		);
	} else {
		return (
			<div className="kumparan__loadingCenter" />
		)
	}
}

export default Album;
