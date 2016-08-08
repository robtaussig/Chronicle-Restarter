const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const UserConstants = require('../constants/user_constants.js');
const UserStore = new Store(AppDispatcher);

let _userInfo = {};

function _removeUser () {
  _userInfo = {};
  UserStore.__emitChange();
}

function _updateUserInfo (user) {
  _userInfo = user;
  UserStore.__emitChange();
}

UserStore.currentUser = () => {
  return _userInfo;
};

UserStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case UserConstants.USER_INFO_RECEIVED:
      _updateUserInfo(payload.user);
    break;
    case UserConstants.USER_REMOVED:
      _removeUser();
    break;
  }
};

module.exports = UserStore;
