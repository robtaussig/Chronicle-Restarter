const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SavedProjectStore = require('../stores/saved_project_store.js');
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

  getInitialState () {
    return ({deleteMessage: "", size: ""});
  },

  componentDidMount () {
    this.sessionToken = SessionStore.addListener(this._handleLogin);
    this.currentProject = SavedProjectStore.currentProject();
    this._handleLogin();
    this.forceUpdate();
    this.deleteMessage="";
    this.header =
      ProjectMessages[`${window.location.pathname.split('/')[2]} header`] ||
      ProjectMessages[`basics header`];
    this.message = ProjectMessages[window.location.pathname.split('/')[2]] ||
    ProjectMessages['basics'];
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

  _deleteProject () {
    SavedProjectActions.deleteSavedProject('finalizeProject',
      SavedProjectStore.currentProject());
    if (SavedProjectStore.currentProject().id) {
      this.setState({deleteMessage: "Project deleted"});
    } else {
      this.setState({deleteMessage: "No project to delete"});
    }

    let that = this;
    window.setTimeout(()=> {
      this.setState({deleteMessage: ""});
    },2000);
  },

  _changePage (pageTarget) {
    if (pageTarget === 'preview' || pageTarget === 'submit') {
      this.setState({size: 'wide'});
    } else {
      this.setState({size: ''});
    }
    this.header = ProjectMessages[`${pageTarget} header`];
    this.message = ProjectMessages[pageTarget];
    this.forceUpdate();
  },

  _saveChanges (savedData) {
    this.setState({savedData});
    this.setState({saved: true});
  },

  _onChange () {

  },

  _increaseWidth () {
    this.setState({size: "wide"});
  },

  render () {
    let _attribute = window.location.pathname === "/finalizeProject/submit" || window.location.pathname === "/finalizeProject/preview" ? 'wide' : '';
    return (
      <div>
        <div className="nav-bar-box">
          <ProjectNavBar changePage={this._changePage} />
          <br></br>
          <div className="nav-bar-top-text">{this.header}</div>
          <div className="nav-bar-bottom-text">{this.message}</div>
        </div>
          <div className={`project-create-subpage ${_attribute} group`}>
            {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = FinalizeProject;
