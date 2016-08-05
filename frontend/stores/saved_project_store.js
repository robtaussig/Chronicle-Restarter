const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const SavedProjectConstants = require('../constants/saved_project_constants.js');
const SavedProjectStore = new Store(AppDispatcher);

let _savedProject = {};

SavedProjectStore.find = (id) => {

};

SavedProjectStore.currentProject = () => {
  return _savedProject;
};

function _resetSavedProject (project) {
  _savedProject = project;
}

function _removedSavedProject () {
    _savedProject = {};
}

SavedProjectStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case SavedProjectConstants.SAVED_PROJECT_RECEIVED:
      _resetSavedProject(payload);
    break;
    case SavedProjectConstants.SAVED_PROJECT_REMOVED:
      _removeSavedProject();
    break;
  }
};

module.exports = SavedProjectStore;
