const SessionActions = require('./actions/session_actions');

module.exports = () => {
  let user = window.myApp;
  if (typeof user !== "undefined") {
    SessionActions.receiveCurrentUser(user);
  }
};
