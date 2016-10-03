const React = require('react');
const Comment = require('./comment.jsx');
const CommentActions = require('../actions/comment_actions.js');
const SessionStore = require('../stores/session_store.js');

const Comments = React.createClass({

  getInitialState () {
    return ({
      title: "",
      body: "",
      newComments: [],
      loggedIn: false,
      submitEnabled: false
    });
  },

  componentDidMount () {
    this.currentUser = SessionStore.currentUser() || window.myApp;
    if (this.currentUser.id) {
      this.setState({loggedIn: true});
    }
  },

  _deleteComment(id) {
    if (id) {
      CommentActions.deleteComment('comment', id);
    } else {
      let newComments = this.state.newComments;
      newComments.pop();
      this.setState({newComments: newComments});
    }
  },

  _setTitle (e) {
    this.setState({title: e.currentTarget.value});
    if (!this.state.loggedIn) {
      this.setState({body: "You must be logged in to submit a comment"});
    }
    if (this.state.title !== "" &&
    this.state.body !== "" &&
    this.state.loggedIn) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  },

  _setBody (e) {
    this.setState({body: e.currentTarget.value});
    if (!this.state.loggedIn) {
      this.setState({body: "You must be logged in to submit a comment"});
    }
    if (this.state.title !== "" &&
    this.state.body !== "" &&
    this.state.loggedIn) {
      this._enableSubmit();
    } else {
      this._disableSubmit();
    }
  },

  _enableSubmit () {
    this.setState({submitEnabled: true});
  },

  _disableSubmit () {
    this.setState({submitEnabled: false});
  },

  _createComment () {
    const commentInfo = {
      title: this.state.title,
      body: this.state.body,
      campaign_id: this.props.project.id,
      user_id: this.currentUser.id,
      email: this.currentUser.email
    };
    if (this.state.submitEnabled) {
      CommentActions.submitComment('comment', commentInfo);
      this.setState({newComments: this.state.newComments.concat(commentInfo)});
    }
  },

  render () {
    let _newComments = this.state.newComments || [];
    let _comments =
      this.props.comments.concat(_newComments).map((comment,i) => {
      return <li key={i}><Comment delete={this._deleteComment}
        comment={comment} i={i} /></li>;
    });
    let _enabled = this.state.submitEnabled ? 'enabled' : 'disabled';
    let _loggedIn = this.state.loggedIn ? 'loggedIn' : 'loggedOut';

    return (
      <div className={`bottom-page-item comments-wrapper ${this.props.revealed}`}>
        <ul className="comments">{_comments}</ul>
        <span className="new-comment-header">New Comment</span>
        <input className="comment-input" type="text" onChange={this._setTitle}
          value={this.state.title || ""} placeholder="Title" />
        <input className={`comment-input body ${_loggedIn}`}
          type="text" onChange={this._setBody}
          value={this.state.body || ""} placeholder="Your comment" />
        <div className={`comment-create-button ${_enabled}`}
          onClick={this._createComment}>Create</div>
      </div>
    );
  }

});

module.exports = Comments;
