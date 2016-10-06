const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const ProjectShow = require('./project_show.jsx');
const ProjectActions = require('../actions/project_actions.js');
import { browserHistory } from 'react-router';

const ProjectItem = React.createClass({

  getInitialState() {
    return ({project: null});
  },

  componentDidMount () {
    this.listener = ProjectStore.addListener(this._handleProjectChange);

    if (this.props.params.projectId) {
      let _projectShow = ProjectStore.find(parseInt(this.props.params.projectId));
      if (_projectShow) {
        this.setState({project: _projectShow});
      } else {
        ProjectActions.fetchProject('show',this.props.params.projectId);
      }
    } else {
      browserHistory.push('/projects/');
    }
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _handleProjectChange () {
    this.setState({project: ProjectStore.currentProject()});
  },

  render () {
    let _project = [];
    if (this.state.project) {
      _project = [<ProjectShow key="1" project={this.state.project} />];
    }
    return (
      <div className="project-item-wrapper">
        {_project}
      </div>
    );
  }

});

module.exports = ProjectItem;
