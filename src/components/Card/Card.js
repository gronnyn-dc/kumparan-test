import './Card.css';
import { Link } from 'react-router-dom';

function Card({ users, handleClickCard }) {
	return (
		<>
			<div>
				<div className='kumparan__cardContainer'>
					<div className='kumparan__cardWrap'>
						<span className='kumparan__cardText'>Username</span>
					</div>
					<div className='kumparan__cardWrap'>
						<span className='kumparan__cardText'>Name</span>
					</div>
					<div className='kumparan__cardWrap'>
						<span className='kumparan__cardText'>Phone</span>
					</div>
					<div className='kumparan__cardWrap'>
						<span className='kumparan__cardText'>Email</span>
					</div>
					<div className='kumparan__cardWrap'>
						<span className='kumparan__cardText'>Website</span>
					</div>
				</div>
				{users.length > 0 &&
					users.map((user, index) => {
						return (
							<div
								className='kumparan__cardContainer kumparan__whiteBackground kumparan__mb20 kumparan__pointer'
								key={index}
								onClick={() => handleClickCard(user)}
							>
								<div className='kumparan__cardWrap'>
									<span className='kumparan__cardText'>{user.username}</span>
								</div>
								<div className='kumparan__cardWrap'>
									<span className='kumparan__cardText'>{user.name}</span>
								</div>
								<div className='kumparan__cardWrap'>
									<span className='kumparan__cardText'>{user.phone}</span>
								</div>
								<div className='kumparan__cardWrap'>
									<span className='kumparan__cardText'>{user.email}</span>
								</div>
								<div className='kumparan__cardWrap'>
									<span className='kumparan__cardText'>{user.website}</span>
								</div>
							</div>
						);
					})}
			</div>
		</>
	);
}

export default Card;
