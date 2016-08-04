const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ProjectConstants = require('../constants/project_constants.js');
const ProjectStore = new Store(AppDispatcher);

let _currentUser = {};

function _logIn(user) {
  _currentUser = user;
  ProjectStore.__emitChange();
}

function _logOut () {
  _currentUser = {};
  ProjectStore.__emitChange();
}

ProjectStore.currentUser = () => {
  return _currentUser;
};

ProjectStore.isUserLoggedIn = (id) => {
  return _currentUser.id === id;
};

ProjectStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case ProjectConstants.USER_RECEIVED:
      _logIn(payload.user);
    break;
    case ProjectConstants.USER_REMOVED:
      _logOut();
    break;
    case ProjectConstants.SESSION_STOPPED:
      _logOut();
      break;
  }
};

module.exports = ProjectStore;
