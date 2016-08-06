const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const ErrorActions = require('../actions/error_actions.js');
const ErrorStore = require('../stores/error_store.js');
const ProjectNavBar = require('./project_nav_bar.jsx');
const Basics = require('./basics.jsx');
const Rewards = require('./rewards.jsx');
const Story = require('./story.jsx');
const AboutYou = require('./about_you.jsx');
const Account = require('./account.jsx');
const Preview = require('./preview.jsx');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';


const FinalizeProject = React.createClass({

  componentDidMount () {
    this.sessionToken = SessionStore.addListener(this._handleLogin);
    this._handleLogin();
    this.forceUpdate();
    // ProjectStore.addListener(this._onChange);
    // ErrorStore.addListener(this._handleError);
  },

  componentWillUnmount () {
    this.sessionToken.remove();
  },

  _handleLogin () {
    if (SessionStore.currentUser().hasOwnProperty('id')) {
      return;
    } else {
      browserHistory.push('/login');
    }
  },

  _changePage (pageNum) {
    let num = this._parseNum(pageNum);
    this.currentPage = this.pages[num];
    this.forceUpdate();
  },

  _saveChanges (savedData) {
    this.setState({savedData});
    this.setState({saved: true});
  },

  render () {
    let lets = "Let's";
    return (
      <div>
        <div className="nav-bar-box">
          <ProjectNavBar changePage={this._changePage} />
          <br></br>
          <div className="nav-bar-top-text">{lets} get started.</div>
          <div className="nav-bar-bottom-text">The title of your project will
            impact its place in history. Pick a title, image, goal, campaign
            duration, and category.</div>
        </div>
        <div className="project-create-subpage group">
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = FinalizeProject;


/*
TODO

1) Add save functionality (will require saved_project model and new logic to prepopulate info)
2) Replace 'us' with apostrophe once syntax highlighting is fixed







*/
