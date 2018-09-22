import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SignOutButton from "./SignOut";
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
	<div>
		{ authUser
			? <NavigationAuth />
			: <NavigationNonAuth />
		}
	</div>

Navigation.contextTypes = {
	authUser: PropTypes.object
};

const NavigationAuth = () =>
	<div>
		<Link to={routes.HOME}>Home</Link>
		<Link to={routes.PROFILE}>Profile</Link>
		<SignOutButton />
	</div>

const NavigationNonAuth = () =>
		<Link to={routes.SIGN_IN}>Sign In</Link>

export default Navigation;