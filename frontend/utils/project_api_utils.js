const ProjectApiUtil = {

  submitProject (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/projects',
      type: 'POST',
      data: {project: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  updateProject (form, data, successCB, errorCB) {
    if (data.id) {
      $.ajax({
        url: '/api/projects/' + data.id,
        type: 'PATCH',
        data: {saved_project: data},
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    } else {
      $.ajax({
        url: '/api/projects/' + data.get('id'),
        type: 'PATCH',
        processData: false,
        contentType: false,
        data: data,
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    }

  },

  removeProject (form, id, successCB, errorCB) {
    $.ajax({
      url: '/api/projects/' + id,
      type: 'DELETE',
      data: {params: id},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  fetchAllProjects (form, successCB, errorCB) {
    $.ajax({
      url: '/api/projects',
      type: 'GET',
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  saveSavedProject (form, data, successCB, errorCB) {
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

  updateSavedProject (form, data, successCB, errorCB) {
    if (data.id) {
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
    } else {
      $.ajax({
        url: '/api/saved_projects/' + data.get('id'),
        type: 'PATCH',
        processData: false,
        contentType: false,
        data: data,
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    }
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
