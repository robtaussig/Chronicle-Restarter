const CommentApiUtil = {

  submitComment (form, data, successCB, errorCB) {
    $.ajax({
      url: '/api/comments',
      type: 'POST',
      data: {comment: data},
      success: (resp) => {
        successCB(resp);
      },
      error: (resp) => {
        errorCB(form, resp);
      }
    });
  },

  updateComment (form, data, successCB, errorCB) {
    if (data.id) {
      $.ajax({
        url: '/api/comments/' + data.id,
        type: 'PATCH',
        data: {comment: data},
        success: (resp) => {
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    } else {
      $.ajax({
        url: '/api/comments/' + data.get('id'),
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

  removeComment (form, id, successCB, errorCB) {
    if (id) {
      $.ajax({
        url: '/api/comments/' + id,
        type: 'DELETE',
        data: {params: id},
        success: (resp) => {
          debugger
          successCB(resp);
        },
        error: (resp) => {
          errorCB(form, resp);
        }
      });
    }
  },

  fetchAllComments (form, campaignId, successCB, errorCB) {
    $.ajax({
      url: '/api/comments',
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

module.exports = CommentApiUtil;
