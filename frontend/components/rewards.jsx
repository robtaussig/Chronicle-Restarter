const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');

const Rewards = React.createClass({

  getInitialState () {
    return ({rewardItems: 1, saved: false});
  },

  _addReward () {
    this.setState({rewardItems: rewardItems + 1});
  },

  _handleSave () {

  },

  render: function() {

    let _rewards = [];
    let _projectId = ProjectStore.currentProject().id ?
      ProjectStore.currentProject().id : 0;

    for (let i = 0; i < this.state.rewardItems.length; i++) {
      _rewards.push(<RewardItem projectId={_projectId}
        _toSave={this.state.saved} key={i}/>);
    }

    return (
      <div>
        {_rewards}
        <button onClick={this._handleSave}>Save Rewards</button>
      </div>
    );
  }

});

module.exports = Rewards;
