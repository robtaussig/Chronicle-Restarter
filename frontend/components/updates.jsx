const React = require('react');

const Updates = React.createClass({

  render () {
    return (
      <div className={`bottom-page-item updates-wrapper ${this.props.revealed}`}>
        <h1 className="pending-header">
          Future updates to this project will be logged here.
        </h1>
      </div>
    );
  }

});

module.exports = Updates;
