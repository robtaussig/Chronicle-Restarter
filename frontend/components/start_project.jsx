const React = require('react');
const Link = require('react-router').Link;
const SavedProjects = require('./saved_projects.jsx');
import { browserHistory } from 'react-router';

const StartProject = React.createClass({

  getInitialState () {
    return({selected: false, status: "", spread: ""});
  },

  _newProject () {
    this.advance = true;
    browserHistory.push('/createProject');
  },

  componentDidMount () {
    this.advance = false;
  },

  componentWillUnmount () {
    clearTimeout(this.timeoutOne);
    clearTimeout(this.timeoutTwo);
  },

  _savedProjects () {
    this.advance = true;
    browserHistory.push('/savedProjects');
  },

  _selectButtons () {
    this.setState({status: 'moving-up'});
    this.timeoutOne = window.setTimeout(() => {
      this._spreadButtons();
    },200);
  },

  _spreadButtons () {
    this.setState({selected: true, spread: ""});
    this.timeoutTwo = window.setTimeout(() => {
      this.setState({spread: "spread"});
    },200);
  },

  _hideButtons () {
    if (this.advance) {
      return;
    } else {
      this.setState({selected: false, status: "", spread: ""});
    }
  },

  render () {
    let hidden = this.state.selected ? "hidden" : "";

    let subButtons = this.state.selected ? [
        <li className={`new-project-button ${this.state.spread}`} key="1" onClick={this._newProject}>New Project</li>,
        <li className={this.state.status} key="2">Start a project</li>,
        <li className={`saved-projects-button ${this.state.spread}`} key="3" onClick={this._savedProjects}>Saved Projects</li>
    ] : [<li className={this.state.status} key="2">Start a project</li>];

    return (
      <div className="start-project">
        <ul className="start-headers">
          <li><h1>Change history with</h1></li>
          <li><h1>a few more clicks.</h1></li>
        </ul>
        <ul onClick={this._selectButtons} onMouseLeave={this._hideButtons}
          className="buttons-wrapper">
          {subButtons}
        </ul>
      </div>
    );
  }

});

module.exports = StartProject;

/*

 */
