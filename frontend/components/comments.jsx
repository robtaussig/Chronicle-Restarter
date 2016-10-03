const React = require('react');
const Comment = require('./comment.jsx');
const CommentActions = require('../actions/comment_actions.js');
const SessionStore = require('../stores/session_store.js');

const Comments = React.createClass({

  getInitialState () {
    return ({ title: "", body: "", newComments: [], loggedIn: false});
  },

  componentDidMount () {
    let _currentUser = window.myApp.email || SessionStore.currentUser().email;
    if (this.props.comment.user_id === _currentUser ||
       _currentUser === 'rob@gmail.com' || _currentUser === 'admin@gmail.com') {
      this.setState({loggedIn: true});
    }
  },

  _setTitle (e) {
    this.setState({title: e.currentTarget.value});
    if (!this.state.loggedIn) {
      this.setState({message: "You must be logged in to submit a comment"});
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
      this.setState({message: "You must be logged in to submit a comment"});
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
    
  },

  _disableSubmit () {

  },

  _createComment () {
    const commentInfo = {
      title: this.state.title,
      body: this.state.body,
      campaign_id: this.props.project.id,
      user_id: this.props.project.author_id
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
      return <li key={i}><Comment comment={comment} i={i} /></li>;
    });
    return (
      <div className={`bottom-page-item comments-wrapper ${this.props.revealed}`}>
        <ul className="comments">{_comments}</ul>
        <span className="new-comment-header">New Comment</span>
        <input className="comment-input" type="text" onChange={this._setTitle}
          value={this.state.title || ""} placeholder="Title" />
        <input className="comment-input body" type="text" onChange={this._setBody}
          value={this.state.body || ""} placeholder="Your comment" />
        <div className="comment-create-button"
          onClick={this._createComment}>Create</div>
      </div>
    );
  }

});

module.exports = Comments;
