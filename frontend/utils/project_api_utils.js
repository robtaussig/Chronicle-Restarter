const ProjectApiUtil = {

  saveProject (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/saved_projects',
      type: 'POST',
      data: {saved_project: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  fetchAllSavedProjects (form, userId, successCB, errorCB) {
    $.ajax({
      url: '/api/saved_projects',
      type: 'GET',
      data: {user_id: userId},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  updateProject (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/saved_projects/' + data.id,
      type: 'PATCH',
      data: {saved_project: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  removeSavedProject (form, id, success, errorCB) {
    $.ajax({
      url: '/api/saved_projects/' + id,
      type: 'DELETE',
      data: {params: id},
      success,
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

};

module.exports = ProjectApiUtil;
