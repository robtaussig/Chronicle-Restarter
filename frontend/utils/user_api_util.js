const UserApiUtil = {

  saveUser (form, userInfo, successCB, errorCB) {
    $.ajax({
      url: '/api/users/' + userInfo.id,
      type: 'PATCH',
      data: {user: userInfo},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  fetchUser (form, userId, successCB, errorCB) {
    $.ajax({
      url: '/api/users/' + userId,
      type: 'GET',
      data: {params: userId},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  deleteUser (userId, success, error) {
    $.ajax({
      url: '/api/users/' + userId,
      type: 'DELETE',
      data: {params: userId},
      success,
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

};

module.exports = UserApiUtil;
