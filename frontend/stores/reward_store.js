const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const RewardConstants = require('../constants/reward_constants.js');
const RewardStore = new Store(AppDispatcher);
const ErrorActions = require('../actions/error_actions.js');

let _rewards = [];
let _funding = {};

RewardStore.find = (rewardId) => {
  return _rewards.filter(reward => {
    return reward.project_reward_key === rewardId;
  });
};

RewardStore.currentRewards = () => {
  return _rewards;
};

function _addReward (data) {
  if (_rewards.some(reward => {
    return reward.project_id === data.project_id &&
      reward.project_reward_key === data.project_reward_key;
  })) {
    _updateReward (data);
  } else {
    $.ajax({
      url: '/api/rewards',
      type: 'POST',
      data: {reward: data},
      success: (resp) => {
        _rewards.push(resp);
        console.log('post success!');
      },
      error: (resp) => {
        ErrorActions.receiveError('rewards',resp);
      }
    });
  }

  RewardStore.__emitChange();
}

function _updateReward (data) {
  let rewardToUpdate = _rewards.filter(reward=> {
    return reward.project_id === data.project_id &&
      reward.project_reward_key === data.project_reward_key;
  });

  let rewardUpdate = Object.assign(rewardToUpdate[0], data);

  $.ajax({
    url: '/api/rewards/' + rewardUpdate.id,
    type: 'PATCH',
    data: {reward: rewardUpdate},
    success: (resp) => {
      console.log('update success!');
    },
    error: (resp) => {
      ErrorActions.receiveError('rewards',resp);
    }
  });

  RewardStore.__emitChange();
}

function _removeReward (data) {
  let rewardToDelete = _rewards.filter(reward=> {
    return reward.project_id === data.project_id &&
      reward.project_reward_key === data.project_reward_key;
  });
  let i = _rewards.indexOf(rewardToDelete[0]);
  _rewards.splice(i, 1);
  RewardStore.__emitChange();
}

function _saveRewards () {
  _rewards.forEach(reward=> {
    $.ajax({
      url: '/api/rewards',
      type: 'POST',
      data: {reward: reward},
      success: (resp) => {
        console.log('success!');
      },
      error: (resp) => {
        ErrorActions.receiveError('rewards',resp);
      }
    });
  });
}

function _resetFunding (funding) {
  _funding = funding;
}

RewardStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case RewardConstants.REWARD_RECEIVED:
      _addReward(payload.data);
    break;
    case RewardConstants.REWARD_REMOVED:
      _removeReward(payload.data);
    break;
    case RewardConstants.REWARD_UPDATED:
      _updateReward(payload.data);
    break;
    case RewardConstants.SAVE_ALL:
      _saveRewards(payload.data);
    break;
    case RewardConstants.FUNDING_RECEIVED:
      _resetFunding(payload.data);
    break;


  }
};

module.exports = RewardStore;
