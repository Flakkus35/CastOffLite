import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import LandingPage from "./Navigation/Landing";
import SignUpPage from './Navigation/Signup';
import SignInPage from './Navigation/Signin';
import PWForgetPage from './Navigation/PWforget';
import HomePage from './Navigation/Home';
import ProfilePage from './Navigation/Profile';
import NavBar from './NavBar/NavBar';

import * as routes from "../constants/routes";
import withAuthentication from './Navigation/withAuthentication';

const App = () =>
  <Router>
    <div>  
      <NavBar />

      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PW_FORGET} component={() => <PWForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.PROFILE} component={() => <ProfilePage />} />
    </div>
  </Router>

export default withAuthentication(App);
