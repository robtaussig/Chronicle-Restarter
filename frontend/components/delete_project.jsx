const React = require('react');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
import { browserHistory } from 'react-router';

const DeleteProject = React.createClass({

  deleteProject () {
    ProjectActions.deleteProject('delete', this.props.project.id);
  },

  render () {
    let _message = this.props.project ===
      "wrong user" ? "" : "Delete your project";
    return (
      <div className={this.props.project === "wrong user" ? "" :
        "delete-project"} onClick={this.deleteProject}>
        {_message}
      </div>
    );
  }

});

module.exports = DeleteProject;
