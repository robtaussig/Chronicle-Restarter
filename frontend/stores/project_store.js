const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const ProjectConstants = require('../constants/project_constants.js');
const ProjectStore = new Store(AppDispatcher);

let _projects = [];
let _project = {};
let _filteredProjects = [];

function _resetProject(project) {
  _project = project;
  if (_projects.indexOf(project) === -1) _projects.push(project);
  ProjectStore.__emitChange();
}

function _resetProjects(projects) {
  _projects = projects;
  ProjectStore.__emitChange();
}

function _removeProject(project) {
  let newProject = _projects.filter(el=>el.id === project.id)[0];
  let idx = _projects.indexOf(newProject);
  _projects.splice(idx,1);
  ProjectStore.__emitChange();
}

function _updateProject(project) {
  let _toRemove = _projects.filter(oldProject => oldProject.id === project.id);
  _projects = _projects.slice(_projects.indexOf(_toRemove),1);
  _projects.push(project);
  ProjectStore.__emitChange();
}

ProjectStore.currentProject = () => {
  return _project;
};

ProjectStore.filteredProjects = () => {
  console.log(_filteredProjects);
  return _filteredProjects;
};

function _matches (projects, params) {
  let searchParams = params.toLowerCase();
  return projects.filter(project => {
    return (
      project.title.toLowerCase().includes(params) ||
      project.author_full_name.toLowerCase().includes(params) ||
      project.content.toLowerCase().includes(params) ||
      project.blurb.toLowerCase().includes(params) ||
      project.risks.toLowerCase().includes(params)
    );
  });
}

function _filterBy (searchParams) {
  if (searchParams === "") {
    _filteredProjects = _projects;
  } else {
    _filteredProjects = _matches(_projects,searchParams);
  }
  ProjectStore.__emitChange();
}

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
    case ProjectConstants.PARAMS_RECEIVED:
      _filterBy(payload.params);
    break;
  }
};

module.exports = ProjectStore;
