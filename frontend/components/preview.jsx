const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');

const Preview = React.createClass({

  getInitialState () {
    return ({submitted: false});
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
    console.log(SavedProjectStore.currentProject());
    console.log(RewardStore.currentRewards());
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
