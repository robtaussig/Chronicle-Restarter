const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app.jsx');
const SignUp = require('./components/sign_up.jsx');
const LogIn = require('./components/log_in.jsx');
const UserProfile = require('./components/user_profile.jsx');
const SetupApp = require('./setup_app.js');
const StartProject = require('./components/start_project.jsx');
const CreateProject = require('./components/create_project.jsx');
const FinalizeProject = require('./components/finalize_project.jsx');
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

const routes = (
  <Route path="/" component={App}>
    <Route path="signUp" component={SignUp} />
    <Route path="logIn" component={LogIn} />
    <Route path="userProfile" component={UserProfile} />
    <Route path="startProject" component={StartProject} />
    <Route path="createProject" component={CreateProject} />
    <Route path="finalizeProject" component={FinalizeProject} />

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
