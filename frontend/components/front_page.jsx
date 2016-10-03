const React = require('react');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
const ProjectPreview = require('./project_preview.jsx');
const SessionStore = require('../stores/session_store.js');
const UserActions = require('../actions/user_actions.js');
const UserStore = require('../stores/user_store.js');
import { browserHistory } from 'react-router';

const FrontPage = React.createClass({

  getInitialState () {
    return ({projects: [], users: []});
  },

  componentDidMount () {
    this.listener = ProjectStore.addListener(this._onProjectChange);
    this.userListener = UserStore.addListener(this._onUserChange);
    if (UserStore.allUsers().length === 0) {
      UserActions.fetchAllUsers('front');
    } else {
      this.setState({users: UserStore.allUsers()});
    }

    if (ProjectStore.allProjects().length === 0) {
      ProjectActions.fetchAllProjects('front');
    } else {
      this.setState({projects: ProjectStore.allProjects()});
    }
  },

  componentWillUnmount () {
    this.listener.remove();
    this.userListener.remove();
  },

  _onProjectChange () {
    this.setState({projects: ProjectStore.allProjects()});
  },

  _onUserChange () {
    this.setState({users: UserStore.allUsers()});
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
      for (let i = 0; i < (this.state.projects.length > 3 ? 3 : this.state.projects.length); i++) {
        this.projects.push(this.state.projects[this.state.projects.length - i - 1]);
      }
      _display = this.projects.map((project,idx) => {
        return <li><ProjectPreview project={project} key={idx} /></li>;
      });
    } else {
      _display = <div className="loading">Loading...</div>;
    }

    return (
      <div>
        <div className="splash">
          <div className="front-page-content">
            <h2>Feeling Lucky?</h2>
            <h3>Or just too lazy to navigate around? Click below to transport yourself to a random campaign.</h3>
            <div className="front-page-button" onClick={this._randomPage}>
              Go
            </div>
          </div>
        </div>
        <h2 className="front-page-navigation">
          Check out the three most recent campaigns:
        </h2>
        <ul className="three-random-projects">
          {_display}
        </ul>
      </div>
    );
  }

});

module.exports = FrontPage;
