const React = require('react');

const Comments = React.createClass({

  render () {
    return (
      <div className={`bottom-page-item comments-wrapper ${this.props.revealed}`}>
        <h1 className="pending-header">
          Comments are expected to be the next feature
        </h1>
      </div>
    );
  }

});

module.exports = Comments;
