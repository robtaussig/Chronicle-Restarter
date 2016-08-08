const React = require('react');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const SavedProjectStore = require('../stores/saved_project_store.js');
const SessionStore = require('../stores/session_store.js');

const SavedProjects = React.createClass({

  getInitialState () {
    return({savedProjects: []});
  },

  componentDidMount () {
    this.listener = SavedProjectStore.addListener(this._onChange);
    let userId = SessionStore.currentUser().id || window.myApp.id;
    SavedProjectActions.fetchAllSavedProjects('start', userId);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onChange () {
    this.setState({savedProjects: SavedProjectStore.allCurrentProjects()});
    console.log(this.state);
  },

  render: function() {
    return (
      <div>

      </div>
    );
  }

});

module.exports = SavedProjects;
