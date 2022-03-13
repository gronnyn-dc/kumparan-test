import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../../components/Card/UserCard';
import { useHistory } from 'react-router-dom';
import env from '../../utils/index';

function Home() {
	const [users, setUser] = useState([]);
	const history = useHistory();

	useEffect(() => {
		axios.get(`${env.API_URL}users`).then((res) => {
			if (res.status === 200) {
				setUser(res.data);
			}
		});
	}, []);

	const handleClickCard = (user) => {
		if (user) {
			history.push(`/detail/${user.id}`, { id: user.id });
		}
	};

	return (
		<div className='kumparan__homeWrapper'>
			<div className='kumparan__homeContainer'>
				<h1 className='kumparan__mt0 kumparan__pt20'>User List</h1>
				<UserCard users={users} handleClickCard={handleClickCard} />
			</div>
		</div>
	);
}

export default Home;
