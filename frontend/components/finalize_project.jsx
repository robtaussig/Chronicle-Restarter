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
const ProjectMessages = require('../constants/project_messages.js');
const SessionStore = require('../stores/session_store.js');

import { browserHistory } from 'react-router';


const FinalizeProject = React.createClass({

  componentDidMount () {
    this.sessionToken = SessionStore.addListener(this._handleLogin);
    this._handleLogin();
    this.forceUpdate();
    this.header = "Let's get started.";
    this.message = ProjectMessages['basics'];
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

  _changePage (pageTarget) {
    this.message = ProjectMessages[pageTarget];
    this.header = "";
    this.forceUpdate();
  },

  _saveChanges (savedData) {
    this.setState({savedData});
    this.setState({saved: true});
  },

  render () {
    return (
      <div>
        <div className="nav-bar-box">
          <ProjectNavBar changePage={this._changePage} />
          <br></br>
          <div className="nav-bar-top-text">{this.header}</div>
          <div className="nav-bar-bottom-text">{this.message}</div>
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
