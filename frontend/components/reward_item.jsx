const React = require('react');

const RewardItem = React.createClass({

  render: function() {
    return (
      <div>
        RewardItem
        {this.props.projectId}
      </div>
    );
  }

});

module.exports = RewardItem;
