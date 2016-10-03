const AppDispatcher = require('../dispatcher/dispatcher.js');
const CommentApiUtil = require('../utils/comment_api_utils.js');
const CommentConstants = require('../constants/comment_constants.js');
const ErrorActions = require('./error_actions.js');

const CommentActions = {

  submitComment (form, commentInfo) {
    CommentApiUtil.submitComment(form, commentInfo, this.receiveComment,
      ErrorActions.receiveError);
  },

  updateComment (form, commentInfo) {
    CommentApiUtil.updateComment(form, commentInfo, this.receiveUpdatedComment,
      ErrorActions.receiveError);
  },

  deleteComment (form, commentId) {
    CommentApiUtil.removeComment(form, commentId,
      this.removeComment, ErrorActions.receiveError);
  },

  fetchAllComments (form, campaignId) {
    CommentApiUtil.fetchAllComments (form, campaignId,
      this.receiveAllComments, ErrorActions.receiveError);
  },

  receiveComment (data) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_RECEIVED,
      data: data
    });
  },

  receiveAllComments (data) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENTS_RECEIVED,
      data: data
    });
  },

  receiveUpdatedComment (data) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_UPDATED,
      data: data
    });
  },

  removeComment (data) {
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_REMOVED,
      data: data
    });
  }

};

module.exports = CommentActions;
