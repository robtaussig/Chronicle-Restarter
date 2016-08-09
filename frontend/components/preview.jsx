const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');

const Preview = React.createClass({

  getInitialState () {
    return ({submitted: false, appearance: "entering"});
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
    console.log(SavedProjectStore.currentProject());
    console.log(RewardStore.currentRewards());
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  render: function() {
    return (
      <div className={this.state.appearance}>
        <div className="preview-wrapper">
          <div className="preview-header">
          </div>
          <div className="preview-project-image">
          </div>
          <div className="preview-project-summary">
          </div>
          <div className="preview-sub-info">
          </div>
          <div className="project-content-bar">
          </div>
          <div className="project-content-field">
          </div>
          <div className="project-rewards-sidebar">
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Preview;
