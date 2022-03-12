import { useLocation } from 'react-router-dom';
import './Header.css';
import { useHistory } from 'react-router-dom';

function Header() {
	const location = useLocation();
	const history = useHistory();

	const handleClickHeader = () => {
		history.push('/');
	};

	return (
		<div className='kumparan__headerContainer kumparan__pointer' onClick={() => handleClickHeader()}>
			<div className={`${location.pathname === '/' && 'kumparan__headerBorderActive'}`}>
				<p className={`kumparan__headerTitle ${location.pathname === '/' && 'kumparan__headerTitleActive'}`}>Users</p>
			</div>
		</div>
	);
}

export default Header;
