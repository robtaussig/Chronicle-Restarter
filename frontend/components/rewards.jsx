const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectStore = require('../stores/project_store.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const RewardActions = require('../actions/reward_actions.js');

const Rewards = React.createClass({

  getInitialState () {
    return({appearance: 'entering', addable: 'addable'});
  },

  _addReward () {
    this.uniqueKey += 1;
    this.rewardItems.push(<RewardItem projectId={this.projectId}
      key={this.uniqueKey} project_reward_key={this.uniqueKey}
      idx={this.uniqueKey} _delete={this._deleteReward}
      count={this.rewardItems.length} added={this._enableAdd}/>);
    this.forceUpdate();
    this.setState({addable: ''});
  },

  _enableAdd () {
    this.setState({addable: 'addable'});
  },

  componentDidMount () {
    this.timer = window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
    this.projectId = SavedProjectStore.currentProject().id;
    this.rewards = SavedProjectStore.currentProject().rewards;
    this._prepopulate();
    this.forceUpdate();
  },

  componentWillUnmount () {
    clearTimeout(this.timer);
  },

  _prepopulate () {
    if (this.rewards.length > 0) {
      this.rewardItems = this.rewards.map((reward,i)=>{
        if (reward.project_id === this.projectId) {
          return <RewardItem amount={reward.amount}
            description={reward.description}
            project_id={reward.project_id}
            saved='saved'
            count={i}
            project_reward_key={reward.project_reward_key}
            quantity={reward.quantity}
            title={reward.title}
            key={`${reward.project_reward_key}${reward.project_id}`}
            _delete={this._deleteReward}/>;
        }
      });
    } else {
      this.rewardItems = [];
      this._addReward();
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
    let _addable = this.state.addable || "";
    return (
      <div>
        <div className={this.state.appearance}>
          <div>
            <button className={`add-reward-button ${_addable}`}
              onClick={this._addReward}>Add Reward</button>
            {this.rewardItems}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Rewards;
