import { Fragment } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from './Footer';
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';

function Main() {
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/detail/:id' component={Detail} />
			</Switch>
		</Fragment>
	);
}

export default withRouter(Main);
