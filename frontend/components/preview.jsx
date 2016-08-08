const React = require('react');
const RewardActions = require('../actions/reward_actions.js');

const Preview = React.createClass({

  getInitialState () {
    return ({submitted: false});
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
  },

  render: function() {
    return (
      <div>
        Preview
      </div>
    );
  }

});

module.exports = Preview;
