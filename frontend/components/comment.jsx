const React = require('react');
const CommentActions = require('../actions/comment_actions.js');

const Comments = React.createClass({
  componentDidMount () {

  },

  render () {
    return (
      <div className="indiv-comment">
        <h1 className="comment-title">
          {`${this.props.comment.title || ""} by ${this.props.comment.user_id}`}
        </h1>
        <p className="comment-body">{this.props.comment.body || ""}</p>

      </div>
    );
  }

});

module.exports = Comments;
