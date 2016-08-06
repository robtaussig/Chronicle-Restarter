const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectStore = require('../stores/project_store.js');
const RewardItem = require('./reward_item.jsx');

const Rewards = React.createClass({

  _addReward () {
    this.numRewards += 1;
    this.rewardItems.push(<RewardItem projectId={this.projectId}
      rewardId={this.numRewards} key={this.numRewards}/>);
    this.forceUpdate();
  },

  componentDidMount () {
    this.projectId = SavedProjectStore.currentProject().id;
    this.numRewards = 1;
    this.rewardItems = [<RewardItem projectId={this.projectId}
      rewardId={this.numRewards} key={this.numRewards}/>];
    this.forceUpdate();
  },

  _handleSave () {

  },

  _saveReward () {

  },

  render: function() {

    return (
      <div>
        <button onClick={this._addReward}>Add Reward</button>
        {this.rewardItems}
        <button onClick={this._handleSave}>Save Rewards</button>
      </div>
    );
  }

});

module.exports = Rewards;
