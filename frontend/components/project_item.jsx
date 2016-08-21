const React = require('react');
import { browserHistory } from 'react-router';

const ProjectItem = React.createClass({

  componentDidMount () {
    if (this.props.params.projectId) {
      browserHistory.push('/projects/' + this.props.params.projectId);
    } else {
      browserHistory.push('/projects/');
    }
  },

  render () {
    return (
      <div className="project-item-wrapper">
        ""
      </div>
    );
  }

});

module.exports = ProjectItem;
