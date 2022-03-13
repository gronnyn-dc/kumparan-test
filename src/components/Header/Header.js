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
		<div className='kumparan__headerContainer'>
			<div className="kumparan__logoContainer kumparan__pointer" onClick={() => handleClickHeader()}>
				<img src={require('../../assets/kumparan-logo.png')} alt='logo' className="kumparan__logo" />
			</div>
		</div>
	);
}

export default Header;
