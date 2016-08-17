const React = require('react');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SavedProjectStore = require('../stores/saved_project_store.js');
const UserStore = require('../stores/user_store.js');
const SessionStore = require('../stores/session_store.js');
const FocusProject = require('./focus_project.jsx');
const ProjectPreview = require('./project_preview.jsx');
const ProjectCategoryIds = require('../constants/project_category_ids.js');
const ErrorActions = require('../actions/error_actions.js');
import { browserHistory } from 'react-router';

const SavedProjects = React.createClass({

  getInitialState () {
    return({savedProjects: []});
  },

  componentDidMount () {
    let userId = window.myApp.id || SessionStore.currentUser().id;
    if (userId) {
      SavedProjectActions.fetchAllSavedProjects('start', userId);
      this.listener = SavedProjectStore.addListener(this._onChange);
    } else {
      this._checkStatus();
    }
  },

  componentWillUnmount () {
    if (this.listener) {
      this.listener.remove();
    }
  },

  _newProject () {
    browserHistory.push('/createProject');
  },

  _onChange () {
    this.setState({savedProjects: SavedProjectStore.allCurrentProjects()});
    this.focusProject = this.state.savedProjects[this.state.savedProjects.length - 1];
    this.savedProjects = this.state.savedProjects.splice(0, this.state.savedProjects.length - 1);
    this.forceUpdate();
  },

  _checkStatus () {
      ErrorActions.mustBeSignedIn('');
      browserHistory.push('/signUp');
  },

  render: function() {
    let _focusProject;
    let _savedProjects;

    if (this.focusProject) {
      _focusProject = <FocusProject project={this.focusProject} />;
    } else {
      _focusProject = (<div><h2 className="no-saved-projects-message">{"Sorry, but you don't have any saved projects"}</h2>
    <button className="new-project-button" onClick={this._newProject}>New Project</button></div>);
    }

    if (this.savedProjects) {
      _savedProjects = this.savedProjects.map((project,idx) => {
        return <ProjectPreview project={project} key={idx} />;
      });
    } else {
      _savedProjects = [];
    }

    let _savedProjectsMessage = this.focusProject ? "Previously saved projects" : "";

    return (
      <div className="saved-projects-wrapper">
        <div className="focus-project">
          {_focusProject}
        </div>
        <div className="saved-projects-div">
          <h4 className="saved-project-list-header">{_savedProjectsMessage}</h4>
          <ul className="saved-projects-list group">
            {_savedProjects}
          </ul>
        </div>

      </div>
    );
  }

});

module.exports = SavedProjects;
