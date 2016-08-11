const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app.jsx');
const SignUp = require('./components/sign_up.jsx');
const LogIn = require('./components/log_in.jsx');
const UserProfile = require('./components/user_profile.jsx');
const SetupApp = require('./setup_app.js');
const StartProject = require('./components/start_project.jsx');
const CreateProject = require('./components/create_project.jsx');
const SavedProjects = require('./components/saved_projects.jsx');
const Basics = require('./components/basics.jsx');
const Rewards = require('./components/rewards.jsx');
const Story = require('./components/story.jsx');
const AboutYou = require('./components/about_you.jsx');
const FocusProject = require('./components/focus_project.jsx');
const FrontPage = require('./components/front_page.jsx');
const Account = require('./components/account.jsx');
const SubmitProject = require('./components/submit.jsx');
const Preview = require('./components/preview.jsx');
const RewardStore = require('./stores/reward_store.js');
const SavedProjectStore = require('./stores/saved_project_store.js');
const FinalizeProject = require('./components/finalize_project.jsx');
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={FrontPage} />
    <Route path="home" component={FrontPage} />
    <Route path="signUp" component={SignUp} />
    <Route path="logIn" component={LogIn} />
    <Route path="userProfile" component={UserProfile} />
    <Route path="savedProjects" component={SavedProjects} />
    <Route path="startProject" component={StartProject} />
    <Route path="createProject" component={CreateProject} />
    <Route path="finalizeProject" component={FinalizeProject} >
      <IndexRoute component={Basics} />
      <Route path="basics" component={Basics} />
      <Route path="rewards" component={Rewards} />
      <Route path="story" component={Story} />
      <Route path="about_you" component={AboutYou} />
      <Route path="account" component={Account} />
      <Route path="preview" component={Preview} />
      <Route path="submit" component={SubmitProject} />
    </Route>

  </Route>
);

const router = (
  <Router history={browserHistory}>
    {routes}
  </Router>
);


document.addEventListener('DOMContentLoaded', ()=> {
  SetupApp();
  const root = document.querySelector('#content');
  ReactDOM.render(router, root);
});
