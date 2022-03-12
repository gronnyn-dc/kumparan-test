import { Fragment } from 'react';
import { useLocation } from 'react-router-dom'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from './Footer';
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';
import Edit from '../pages/Edit/Edit'
import Post from '../pages/Post/Post'

function Main() {
	const location = useLocation()
	return (
		<Fragment>
			{location.pathname === '/' && (
				<Header />
			)}
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/detail/:id' component={Detail} />
				<Route path='/detail/:id/edit' component={Edit} />
				<Route path='/post/:id' component={Post} />
			</Switch>
		</Fragment>
	);
}

export default withRouter(Main);
