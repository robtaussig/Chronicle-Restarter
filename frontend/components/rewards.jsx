const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectStore = require('../stores/project_store.js');
const RewardItem = require('./reward_item.jsx');

const Rewards = React.createClass({

  _addReward () {
    this.uniqueKey += 1;
    this.rewardItems.push(<RewardItem projectId={this.projectId}
      key={this.uniqueKey} idx={this.uniqueKey}
      _delete={this._deleteReward}/>);
    this.forceUpdate();
  },

  componentDidMount () {
    this.uniqueKey = 1;
    this.projectId = SavedProjectStore.currentProject().id;
    this.rewardItems = [<RewardItem projectId={this.projectId}
      key={this.uniqueKey} idx={this.uniqueKey}
      _delete={this._deleteReward}/>];
    this.forceUpdate();
  },

  _handleSave () {

  },

  _saveReward () {

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
        <button onClick={this._addReward}>Add Reward</button>
        {this.rewardItems}
        <button onClick={this._handleSave}>Save Rewards</button>
      </div>
    );
  }

});

module.exports = Rewards;
