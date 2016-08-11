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
      success,
      error
    });
  },

  fundProject(form, rewardId, projectId, success, error) {
    $.ajax({
      url: '/api/fundings/',
      type: 'CREATE',
      data: {funding: {reward_id: rewardId, project_id: projectId}},
      success,
      error
    });
  },

};

module.exports = RewardApiUtil;
