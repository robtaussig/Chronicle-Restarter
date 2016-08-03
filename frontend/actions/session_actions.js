const AppDispatcher = require('../dispatcher/dispatcher.js');
const SessionConstants = require('../constants/session_constants.js');
const ApiUtil = require('../utils/session_api_util.js');
const ErrorConstants = require('../constants/error_constants.js');
const ErrorActions = require('./error_actions.js');

const SessionActions = {

  logIn (form, userInfo) {
    ApiUtil.logIn(form, userInfo, this.receiveCurrentUser, ErrorActions.receiveError);
  },

  logOut (currentUser) {
    ApiUtil.logOut(currentUser, this.deleteSession, ErrorActions.receiveError);
  },

  signUp (form, userInfo) {
    ApiUtil.signUp(form, userInfo, this.receiveCurrentUser, ErrorActions.receiveError);
  },

  deleteUser (userId) {
    ApiUtil.deleteUser(userId, this.removeUser, ErrorActions.receiveError);
  },

  receiveCurrentUser (data) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_RECEIVED,
      user: data
    });
  },

  removeUser(data) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.USER_REMOVED,
      data: data
    });
  },

  deleteSession (data) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.SESSION_STOPPED,
      data: data
    });
  }

};

module.exports = SessionActions;
