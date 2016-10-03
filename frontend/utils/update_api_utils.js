const UpdateApiUtil = {

  submitUpdate (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/updates',
      type: 'POST',
      data: {update: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  updateUpdate (form, data, successCB, errorCB) {
    if (data.id) {
      $.ajax({
        url: '/api/updates/' + data.id,
        type: 'PATCH',
        data: {update: data},
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    } else {
      $.ajax({
        url: '/api/updates/' + data.get('id'),
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

  removeUpdate (form, id, successCB, errorCB) {
    if (id) {
      $.ajax({
        url: '/api/updates/' + id,
        type: 'DELETE',
        data: {params: id},
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    }
  },

  fetchAllUpdates (form, campaignId, successCB, errorCB) {
    $.ajax({
      url: '/api/updates',
      type: 'GET',
      data: {campaign_id: campaignId},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  }

};

module.exports = UpdateApiUtil;
