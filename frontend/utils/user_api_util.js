const UserApiUtil = {

  logIn (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/session',
      type: 'POST',
      data: {user: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  logOut (currentUser, success, error) {
    $.ajax({
      url: '/api/session',
      type: 'DELETE',
      data: {currentUser},
      success,
      error
    });
  },

  deleteUser (userId, success, error) {
    $.ajax({
      url: '/api/users/' + userId,
      type: 'DELETE',
      data: {params: userId},
      success,
      error
    });
  },

};

module.exports = UserApiUtil;
