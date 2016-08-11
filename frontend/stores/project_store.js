const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ProjectConstants = require('../constants/project_constants.js');
const ProjectStore = new Store(AppDispatcher);

let _projects = [];
let _project = {};

function _resetProject(project) {
  _project = {project};
  ProjectStore.__emitChange();
}

function _resetProjects(projects) {
  _projects = {projects};
  ProjectStore.__emitChange();
}

function _removeProject() {
  _project = {};
  ProjectStore.__emitChange();
}

ProjectStore.currentProject = () => {
  return _project.project;
};

ProjectStore.allProjects = () => {
  return _projects;
};

ProjectStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case ProjectConstants.PROJECT_RECEIVED:
      _resetProject(payload.data);
    break;
    case ProjectConstants.PROJECTS_RECEIVED:
      _resetProjects(payload);
    break;
    case ProjectConstants.PROJECT_REMOVED:
      _removeProject();
    break;
  }
};

module.exports = ProjectStore;
