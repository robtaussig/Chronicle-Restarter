const AppDispatcher = require('../dispatcher/dispatcher.js');
const ProjectApiUtil = require('../utils/project_api_utils.js');
const SavedProjectConstants = require('../constants/saved_project_constants.js');
const ErrorActions = require('./error_actions.js');

const SavedProjectActions = {

  submitSavedProject (form, projectInfo) {
    ApiUtil.saveProject(form, projectInfo, this.receiveSavedProject,
      ErrorActions.receiveError);
  },

  deleteSavedProject (form, projectInfo) {
    ApiUtil.removeSavedProject(form, projectInfo.id, this.removeSavedProject,
      ErrorActions.receiveError);
  },

  receiveSavedProject (data) {
    AppDispatcher.dispatch({
      actionType: SavedProjectConstants.SAVED_PROJECT_RECEIVED,
      data: data
    });
  },

  removeSavedProject (data) {
    AppDispatcher.dispatch({
      actionType: SavedProjectConstants.SAVED_PROJECT_REMOVED,
      data: data
    });
  }

};

module.exports = SavedProjectActions;
