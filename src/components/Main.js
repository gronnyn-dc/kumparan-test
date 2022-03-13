import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from './Footer';
import Home from '../pages/Home/Home';
import Detail from '../pages/Detail/Detail';
import EditPost from '../pages/Edit/EditPost';
import EditComment from '../pages/Edit/EditComment';
import Post from '../pages/Post/Post';
import Album from '../pages/Album/Album';
import AddPost from '../pages/Add/AddPost';

function Main() {
	const location = useLocation();
	return (
		<Fragment>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/detail/:id' component={Detail} />
				<Route path='/detail/:id/album/:albumId' component={Album} />
				<Route path='/detail/:id/edit/:id' component={EditPost} />
				<Route exact path='/post/:id' component={Post} />
				<Route path='/post/:id/edit-comment/:commentId' component={EditComment} />
				<Route path='/post/:id/add' component={AddPost} />
			</Switch>
		</Fragment>
	);
}

export default withRouter(Main);
