const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app.jsx');
const SignUp = require('./components/sign_up.jsx');
const LogIn = require('./components/log_in.jsx');
const UserProfile = require('./components/user_profile.jsx');
const SetupApp = require('./setup_app.js');
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const routes = (
  <Route path="/" component={App}>
    <Route path="api/signUp" component={SignUp} />
    <Route path="api/logIn" component={LogIn} />
    <Route path="api/userProfile" component={UserProfile} />
  </Route>
);

const router = (
  <Router history={hashHistory}>
    {routes}
  </Router>
);

document.addEventListener('DOMContentLoaded', ()=> {
  SetupApp();
  const root = document.querySelector('#content');
  ReactDOM.render(router, root);
});
