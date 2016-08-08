const React = require('react');
const Link = require('react-router').Link;
const SavedProjects = require('./saved_projects.jsx');
import { browserHistory } from 'react-router';

const StartProject = React.createClass({

  getInitialState () {
    return({selected: false});
  },

  _newProject () {
    browserHistory.push('/createProject');
  },

  _savedProjects () {
    browserHistory.push('/savedProjects');
  },

  _selectButtons () {
    this.setState({selected: true});
  },

  _hideButtons () {
    this.setState({selected: false});
  },

  render () {
    let hidden = this.state.selected ? "hidden" : "";

    let subButtons = this.state.selected ? [
        <li key="1" onClick={this._newProject}>New Project</li>,
        <li className={hidden} key="2">Start a project</li>,
        <li key="3" onClick={this._savedProjects}>Saved Projects</li>
    ] : [<li key="2">Start a project</li>];

    return (
      <div className="start-project">
        <ul className="start-headers">
          <li><h1>Change history with</h1></li>
          <li><h1>a few more clicks.</h1></li>
        </ul>
        <ul onMouseEnter={this._selectButtons} onMouseLeave={this._hideButtons}
          className="buttons-wrapper">
          {subButtons}
        </ul>
      </div>
    );
  }

});

module.exports = StartProject;

/*
let subButtons = this.state.selected ? [
    <button className="new-project-button" key="1"
      onClick={this._newProject} onMouseLeave={this._hideButtons}>
      New Project
    </button>,
    <button className="saved-projects-button"  key="2"
      onClick={this._savedProjects} onMouseLeave={this._hideButtons}>
      Saved Projects
    </button>
  ] : [];
 */
