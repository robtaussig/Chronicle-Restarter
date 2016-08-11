const AppDispatcher = require('../dispatcher/dispatcher.js');
const RewardApiUtil = require('../utils/reward_api_utils.js');
const RewardConstants = require('../constants/reward_constants.js');
const ErrorActions = require('./error_actions.js');

const RewardActions = {

  createReward (rewardInfo) {
    AppDispatcher.dispatch({
      actionType: RewardConstants.REWARD_RECEIVED,
      data: rewardInfo
    });
  },

  saveAllRewards () {
    AppDispatcher.dispatch({
      actionType: RewardConstants.SAVE_ALL,
    });
  },

  fundProject (form, rewardId) {
    debugger
    RewardApiUtil.fundProject(form, rewardId, this.receiveFunding, ErrorActions.receiveError);
  },

  updateReward (rewardInfo) {
    AppDispatcher.dispatch({
      actionType: RewardConstants.REWARD_UPDATED,
      data: rewardInfo
    });
  },

  deleteReward (rewardInfo) {
    AppDispatcher.dispatch({
      actionType: RewardConstants.REWARD_REMOVED,
      data: rewardInfo
    });
  },

  receiveFunding (fundingInfo) {
    AppDispatcher.dispatch({
      actionType: RewardConstants.FUNDING_RECEIVED,
      data: fundingInfo
    });
  },
};

module.exports = RewardActions;
