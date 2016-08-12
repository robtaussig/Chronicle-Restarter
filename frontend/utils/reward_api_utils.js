const RewardApiUtil = {

  createReward (data, successCB, errorCB) {
    $.ajax({
      url: '/api/rewards',
      type: 'POST',
      data: {reward: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(resp);
      }
    });
  },

  updateReward (data, successCB, errorCB) {
    $.ajax({
      url: '/api/rewards/' + data.id,
      type: 'PATCH',
      data: {reward: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(resp);
      }
    });
  },

  removeReward (id, successCB, errorCB) {
    $.ajax({
      url: '/api/rewards/' + id,
      type: 'DELETE',
      data: {params: id},
      successCB,
      errorCB
    });
  },

  fundProject(form, rewardId, success, error) {
    $.ajax({
      url: '/api/fundings',
      type: 'POST',
      data: {funding: {reward_id: rewardId}},
      success: (resp) => {
        success(resp);
      },
      error: (resp) => {
        error(resp);
      }
    });
  },

};

module.exports = RewardApiUtil;
