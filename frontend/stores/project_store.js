const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ProjectConstants = require('../constants/project_constants.js');
const ProjectStore = new Store(AppDispatcher);

let _projects = [];
let _project = {};

function _resetProject(project) {
  _project = project;
  _projects.push(project);
  ProjectStore.__emitChange();
}

function _resetProjects(projects) {
  if (projects) {
    _projects = projects;
  }
  ProjectStore.__emitChange();
}

function _removeProject(project) {
  _projects = _projects.slice(_projects.indexOf(project),1);
  ProjectStore.__emitChange();
}

function _updateProject(project) {
  let _toRemove = _projects.filter(oldProject => oldProject.id === project.id);
  _projects = _projects.slice(_projects.indexOf(_toRemove),1);
  _projects.push(project);
  ProjectStore.emitChange();
}

ProjectStore.currentProject = () => {
  return _project;
};

ProjectStore.allProjects = (category) => {
  if (category || category === 0) {
    return _projects.filter(project => project.category_id === category);
  } else {
    return _projects;
  }
};

ProjectStore.find = (projectId) => {
  return _projects.filter(project => project.id === projectId);
};

ProjectStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case ProjectConstants.PROJECT_RECEIVED:
      _resetProject(payload.data);
    break;
    case ProjectConstants.PROJECTS_RECEIVED:
      _resetProjects(payload.data);
    break;
    case ProjectConstants.PROJECT_REMOVED:
      _removeProject(payload.data);
    break;
    case ProjectConstants.PROJECT_UPDATED:
      _updateProject(payload.data);
    break;
  }
};

module.exports = ProjectStore;
