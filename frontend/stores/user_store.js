const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const UserConstants = require('../constants/user_constants.js');
const UserStore = new Store(AppDispatcher);

let _currentUser = {};

function _logIn(user) {
  _currentUser = user;
  UserStore.__emitChange();
}

function _logOut () {
  _currentUser = {};
  UserStore.__emitChange();
}

UserStore.currentUser = () => {
  return _currentUser;
};

UserStore.isUserLoggedIn = (id) => {
  return _currentUser.id === id;
};

UserStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case UserConstants.USER_INFO_RECEIVED:
      _logIn(payload.user);
    break;
    case UserConstants.USER_INFO_REMOVED:
      _logOut();
    break;
  }
};

module.exports = UserStore;
