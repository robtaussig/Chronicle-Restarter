const AppDispatcher = require('../dispatcher/dispatcher.js');
const UpdateApiUtil = require('../utils/update_api_utils.js');
const UpdateConstants = require('../constants/update_constants.js');
const ErrorActions = require('./error_actions.js');

const UpdateActions = {

  submitUpdate (form, updateInfo) {
    UpdateApiUtil.submitUpdate(form, updateInfo, this.receiveUpdate,
      ErrorActions.receiveError);
  },

  updateUpdate (form, updateInfo) {
    UpdateApiUtil.updateUpdate(form, updateInfo, this.receiveUpdatedUpdate,
      ErrorActions.receiveError);
  },

  deleteUpdate (form, updateId) {
    UpdateApiUtil.removeUpdate(form, updateId,
      this.removeUpdate, ErrorActions.receiveError);
  },

  fetchAllUpdates (form, campaignId) {
    UpdateApiUtil.fetchAllUpdates (form, campaignId,
      this.receiveAllUpdates, ErrorActions.receiveError);
  },

  receiveUpdate (data) {
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATE_RECEIVED,
      data: data
    });
  },

  receiveAllUpdates (data) {
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATES_RECEIVED,
      data: data
    });
  },

  receiveUpdatedUpdate (data) {
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATE_UPDATED,
      data: data
    });
  },

  removeUpdate (data) {
    AppDispatcher.dispatch({
      actionType: UpdateConstants.UPDATE_REMOVED,
      data: data
    });
  }

};

module.exports = UpdateActions;
