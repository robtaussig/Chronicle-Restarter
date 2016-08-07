const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectStore = require('../stores/project_store.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const RewardActions = require('../actions/reward_actions.js');

const Rewards = React.createClass({

  _addReward () {
    this.uniqueKey += 1;
    this.rewardItems.push(<RewardItem projectId={this.projectId}
      key={this.uniqueKey} project_reward_key={this.uniqueKey}
      idx={this.uniqueKey} _delete={this._deleteReward}
      _rewardCount={this._rewardCount}/>);
    this.forceUpdate();
  },

  _rewardCount () {
    return this.rewardItems.length;
  },

  componentDidMount () {
    this._prepopulate();

    this.projectId = SavedProjectStore.currentProject().id;
    this.forceUpdate();
  },

  _prepopulate () {
    if (RewardStore.currentRewards().length > 0) {
      this.rewardItems = RewardStore.currentRewards().map(reward=>{
        return <RewardItem amount={reward.amount}
          description={reward.description}
          project_id={reward.project_id}
          project_reward_key={reward.project_reward_key}
          quantity={reward.quantity}
          title={reward.title}
          key={reward.project_reward_key}
          _delete={this._deleteReward}/>;
      });
    } else {
      this.rewardItems = [];
    }
    this.uniqueKey = this.rewardItems.length;
  },

  _findReward (rewardId) {
    return this.rewardItems.map(function(e)
      { return e.props.idx; }).indexOf(rewardId);
  },

  _deleteReward (rewardId) {
    let pos = this._findReward(rewardId);
    this.rewardItems.splice(pos,1);
    this.forceUpdate();
  },

  render: function() {

    return (
      <div>
        <button className="add-reward-button"
          onClick={this._addReward}>Add Reward</button>
        {this.rewardItems}
      </div>
    );
  }

});

module.exports = Rewards;
