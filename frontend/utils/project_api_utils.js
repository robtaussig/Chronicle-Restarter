const ProjectApiUtil = {

  saveProject (form, data, successCB, errorCB) {
    $.ajax({
      url: 'api/saved_projects',
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

  updateProject (form, data, successCB, errorCB) {
    $.ajax({
      url: 'api/saved_projects/' + data.id,
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

  removeSavedProject (form, id, successCB, errorCB) {
    $.ajax({
      url: 'api/saved_projects/' + id,
      type: 'DELETE',
      data: {params: id},
      success,
      error
    });
  },

};

module.exports = ProjectApiUtil;
