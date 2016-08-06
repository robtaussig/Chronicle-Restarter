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

};

module.exports = RewardActions;
