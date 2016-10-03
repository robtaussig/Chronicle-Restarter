const React = require('react');
const CommentActions = require('../actions/comment_actions.js');
const SessionStore = require('../stores/session_store.js');

const Comment = React.createClass({
  componentDidMount () {
    this.currentUser = window.myApp || SessionStore.currentUser();
    if (this.currentUser.id === this.props.comment.user_id ||
      this.currentUser.email === 'rob@gmail.com' ||
      this.currentUser.email === 'admin@gmail.com') {
      this._delete = true;
    } else {
      this._delete = false;
    }
  },

  _deleteComment () {
    this.props.delete(this.props.comment.id);
  },

  render () {
    let _delete = this._delete ? <div onClick={this._deleteComment} className="delete-comment">X</div> : "";
    return (
      <div className="indiv-comment">
        <h1 className="comment-title">
          {`${this.props.comment.title || ""}`}
        </h1>
        <p className="comment-body"><b>{this.props.comment.email}: </b>{this.props.comment.body || ""}</p>
        {_delete}
      </div>
    );
  }

});

module.exports = Comment;
