const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const SessionConstants = require('../constants/session_constants.js');
const SessionStore = new Store(AppDispatcher);

let _currentUser = {};

function _logIn(user) {
  _currentUser = user;
  SessionStore.__emitChange();
}

function _logOut () {
  _currentUser = {};
  SessionStore.__emitChange();
}

SessionStore.currentUser = () => {
  return _currentUser;
};

SessionStore.isUserLoggedIn = (id) => {
  return _currentUser.id === id;
};

SessionStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case SessionConstants.USER_RECEIVED:
      _logIn(payload.user);
    break;
    case SessionConstants.USER_REMOVED:
      _logOut();
    break;
    case SessionConstants.SESSION_STOPPED:
      _logOut();
      break;
  }
};

module.exports = SessionStore;
