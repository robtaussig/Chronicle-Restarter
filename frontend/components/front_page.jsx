const React = require('react');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
const SessionStore = require('../stores/session_store.js');
import { browserHistory } from 'react-router';

const FrontPage = React.createClass({

  getInitialState () {
    return ({});
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
    if (this.state.projects) {
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
        <h2 className="under-construction">
          Project Navigation is currently under construction...
          Please check back later.
        </h2>
      </div>
    );
  }

});

module.exports = FrontPage;
