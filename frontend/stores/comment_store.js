const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher.js');
const CommentConstants = require('../constants/comment_constants.js');
const CommentStore = new Store(AppDispatcher);

let _comments = [];
let _comment = {};

function _resetComment(comment) {
  _comment = comment;
  CommentStore.__emitChange();
}

function _resetComments(comments) {
  _comments = comments;
  CommentStore.__emitChange();
}

function _removeComment(comment) {
  let newComment = _comments.filter(el=>el.id === comment.id)[0];
  let idx = _comments.indexOf(newComment);
  _comments.splice(idx,1);
  CommentStore.__emitChange();
}

function _updateComment(comment) {
  let _toRemove = _comments.filter(oldComment => oldComment.id === comment.id);
  _comments = _comments.slice(_comments.indexOf(_toRemove),1);
  _comments.push(comment);
  CommentStore.__emitChange();
}

CommentStore.currentComment = () => {
  return _comment;
};

CommentStore.allComments = () => {
  return _comments;
};

CommentStore.find = (commentId) => {
  return _comments.filter(comment => comment.id === commentId)[0];
};

CommentStore.__onDispatch = (payload) => {
  switch (payload.actionType) {
    case CommentConstants.COMMENT_RECEIVED:
      _resetComment(payload.data);
    break;
    case CommentConstants.COMMENTS_RECEIVED:
      _resetComments(payload.data);
    break;
    case CommentConstants.COMMENT_REMOVED:
      _removeComment(payload.data);
    break;
    case CommentConstants.COMMENT_UPDATED:
      _updateComment(payload.data);
    break;
  }
};

module.exports = CommentStore;
