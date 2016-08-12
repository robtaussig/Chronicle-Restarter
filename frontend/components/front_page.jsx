const React = require('react');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
const ProjectPreview = require('./project_preview.jsx');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';

const FrontPage = React.createClass({

  getInitialState () {
    return ({projects: []});
  },

  componentDidMount () {
    this.listener = ProjectStore.addListener(this._onProjectChange);
    ProjectActions.fetchAllProjects('front');
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onProjectChange () {
    this.setState({projects: ProjectStore.allProjects()});
    console.log(this.state);
  },

  _randomPage () {
    let that = this;
    if (this.state.projects.length > 0) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      let _randomPageNum = Math.floor(Math.random()*this.state.projects.length);
      let _project = this.state.projects[_randomPageNum];
      browserHistory.push('/projects/' + _project.id);
    } else {
      this.timeout = setTimeout(()=>{
        that._randomPage ();
      },100);
    }
  },

  render: function() {

    this.projects = [];
    let _display;

    if (this.state.projects.length > 0) {
      for (let i = 0; i < 3; i++) {
        this.projects.push(this.state.projects[Math.floor(Math.random() * this.state.projects.length)]);
      }
      _display = this.projects.map((project,idx) => {
        return <li><ProjectPreview project={project} key={idx} /></li>;
      });
    } else {
      _display = <div>Loading...</div>;
    }

    return (
      <div>
        <div className="splash">
          <div className="front-page-content">
            <h2>Feeling Lucky?</h2>
            <h3>Or just too lazy to navigate around? Click below to transport yourself to a random campaign.</h3>
            <div className="front-page-button" onClick={this._randomPage}>
              Go.
            </div>
          </div>
        </div>
        <h2 className="front-page-navigation">
          Check out our absolute three favorite projects at this very moment:
        </h2>
        <ul className="three-random-projects">
          {_display}
        </ul>
      </div>
    );
  }

});

module.exports = FrontPage;
