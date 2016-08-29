const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const SavedProjectConstants = require('../constants/saved_project_constants.js');
const SavedProjectStore = new Store(AppDispatcher);

let _blankProject = {
                      title: "",
                      blurb: "",
                      location: "",
                      duration: 0,
                      goal: 0,
                      image: "",
                      risks: "",
                      content: "",
                      saved: '',
                      errorMessage: ""
                    };

let _savedProject = _blankProject;

let _savedProjects = [];

SavedProjectStore.find = (id) => {

};

SavedProjectStore.allCurrentProjects = () => {
  return _savedProjects;
};

SavedProjectStore.currentProject = () => {
  return _savedProject;
};

function _resetSavedProject (project) {
  _savedProject = project;
  if (_savedProjects.indexOf(project) === -1) _savedProjects.push(project);
  SavedProjectStore.__emitChange();
}

function _updateSavedProject (project) {
  for (let item in project) {
    if (project.hasOwnProperty(item)) {
      _savedProject[item] = project[item];
    }
  }
  SavedProjectStore.__emitChange();
}

function _removeSavedProject () {
  _savedProject = _blankProject;
  SavedProjectStore.__emitChange();
}

function _retrieveAllProjects (projects) {
  _savedProjects = projects;
  SavedProjectStore.__emitChange();
}

SavedProjectStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case SavedProjectConstants.SAVED_PROJECT_UPDATED:
      _updateSavedProject(payload.data);
    break;
    case SavedProjectConstants.SAVED_PROJECT_REMOVED:
      _removeSavedProject();
    break;
    case SavedProjectConstants.SAVED_PROJECT_RECEIVED:
      _resetSavedProject(payload.data);
    break;
    case SavedProjectConstants.SAVED_PROJECTS_RECEIVED:
      _retrieveAllProjects(payload.data);
    break;
  }
};

module.exports = SavedProjectStore;
