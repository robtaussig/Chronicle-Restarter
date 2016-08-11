const React = require('react');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SavedProjectStore = require('../stores/saved_project_store.js');
const UserStore = require('../stores/user_store.js');
const FocusProject = require('./focus_project.jsx');
const ProjectCategoryIds = require('../constants/project_category_ids.js');

const SavedProjects = React.createClass({

  getInitialState () {
    return({savedProjects: []});
  },

  componentDidMount () {
    this.listener = SavedProjectStore.addListener(this._onChange);
    let userId = window.myApp.id || UserStore.currentUser();
    SavedProjectActions.fetchAllSavedProjects('start', userId);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onChange () {
    this.setState({savedProjects: SavedProjectStore.allCurrentProjects()});
    this.focusProject = this.state.savedProjects[this.state.savedProjects.length - 1];
    this.savedProjects = this.state.savedProjects.splice(0, this.state.savedProjects.length - 2);
    this.forceUpdate();
  },

  render: function() {
    let _focusProject;

    if (this.focusProject) {
      _focusProject = <FocusProject project={this.focusProject} />;
    } else {
      _focusProject = [];
    }


    return (
      <div className="saved-projects-wrapper">
        <div className="focus-project">
          {_focusProject}
        </div>
        <div className="saved-projects-div">
          <ul className="saved-projects-list">
            <li>blah</li>
            <li>blah</li>
          </ul>
        </div>

      </div>
    );
  }

});

module.exports = SavedProjects;
