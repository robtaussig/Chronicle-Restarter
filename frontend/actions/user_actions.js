const AppDispatcher = require('../dispatcher/dispatcher.js');
const UserConstants = require('../constants/user_constants.js');
const ApiUtil = require('../utils/user_api_util.js');
const ErrorConstants = require('../constants/error_constants.js');
const ErrorActions = require('./error_actions.js');

const UserActions = {

  saveUser (form, userInfo) {
    ApiUtil.saveUser(form, userInfo, this.receiveCurrentUser, ErrorActions.receiveError);
  },

  fetchUser (form, userId) {
    ApiUtil.fetchUser(form, userId, this.receiveCurrentUser, ErrorActions.receiveError);
  },

  fetchAllUsers (form) {
    ApiUtil.fetchAllUsers(form, this.receiveAllUsers, ErrorActions.receiveError);
  },

  deleteUser (form, userId) {
    ApiUtil.deleteUser(form, userId, this.removeUser, ErrorActions.receiveError);
  },

  receiveCurrentUser (data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_INFO_RECEIVED,
      user: data
    });
  },

  receiveAllUsers (data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USERS_RECEIVED,
      users: data
    });
  },

  removeUser(data) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_REMOVED,
      data: data
    });
  }

};

module.exports = UserActions;
