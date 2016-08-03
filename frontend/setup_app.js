const SessionActions = require('./actions/session_actions');

module.exports = () => {
  let user = window.myApp.user;
  if (typeof user !== "undefined") {
    SessionActions.receiveCurrentUser(user);
  }
};
