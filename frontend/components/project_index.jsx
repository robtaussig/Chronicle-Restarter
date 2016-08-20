const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const ProjectActions = require('../actions/project_actions.js');
const ProjectShow = require('./project_show.jsx');
const ProjectPreview = require('./project_preview.jsx');

const ProjectIndex = React.createClass({

  getInitialState () {
    return({projects: [], flex: ""});
  },

  componentDidMount () {
    this.listener = ProjectStore.addListener(this._onProjectChange);
    if (this.props.params.projectId) {
      this._showProject();
    } else {
      this._showProjects();
    }
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _showProject () {
    this.setState({flex: "", projects: ProjectStore.find(parseInt(this.props.params.projectId))});
  },

  _showProjects () {
    this.setState({flex: "flex", projects: ProjectStore.allProjects()});
  },

  render () {
    let _display;
    if (this.state.projects.length === 1) {
      _display = <ProjectShow key="solo" project={this.state.projects[0]} />;
    } else {
      _display = this.state.projects.map((project,idx) => {
        return <ProjectPreview key={idx} project={project} />;
      });
    }
    return (
      <div className={`project-index-wrapper group ${this.state.flex}`}>
        {_display}
      </div>
    );
  }

});

module.exports = ProjectIndex;
