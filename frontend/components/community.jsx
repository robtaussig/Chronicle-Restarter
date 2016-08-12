const React = require('react');

const Community = React.createClass({

  render () {
    return (
      <div className={`bottom-page-item community-wrapper ${this.props.revealed}`}>
        <h1 className="pending-header">
          A community page is coming soon
        </h1>
      </div>
    );
  }

});

module.exports = Community;
