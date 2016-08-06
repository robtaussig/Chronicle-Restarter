const React = require('react');

const RewardItem = React.createClass({

  _handleDelete (event) {
    event.preventDefault();
    this.props._delete(this.props.idx);
  },

  render: function() {

    return (
      <div>
        RewardItem
        {this.props.idx}
        <button onClick={this._handleDelete}>Delete This Reward</button>
      </div>
    );
  }

});

module.exports = RewardItem;
