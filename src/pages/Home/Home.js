import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import { useHistory } from 'react-router-dom';

function Home() {
	const [users, setUser] = useState([]);
	const history = useHistory();

	useEffect(() => {
		axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
			if (res.status === 200) {
				setUser(res.data);
			}
		});
	}, []);

	const handleClickCard = (user) => {
		if (user) {
			// console.log(user, 'user');
			history.push(`/detail/${user.id}`, { id: user.id });
		}
	};

	return (
		<div className='kumparan__homeWrapper'>
			<div className='kumparan__homeContainer'>
				<h1>User List</h1>
				<Card users={users} handleClickCard={handleClickCard} />
			</div>
		</div>
	);
}

export default Home;
