const React = require('react');
const RewardStore = require('../stores/reward_store.js');
const RewardActions = require('../actions/reward_actions.js');

const RewardItem = React.createClass({

  getInitialState () {
    return ({project_id: this.props.projectId, project_reward_key:
      this.props.project_reward_key, quantity: 0, title: "",
      description: "", amount: ""});
  },

  componentDidMount () {
    this.token = RewardStore.addListener(this._onChange);
  },

  componentWillUnmount () {
    this.token.remove();
  },

  _onChange () {

  },

  _setTitle (event) {
    event.preventDefault();
    this.setState({title: event.target.value});
  },

  _setDescription (event) {
    event.preventDefault();
    this.setState({description: event.target.value});
  },

  _setQuantity (event) {
    event.preventDefault();
    this.setState({quantity: event.target.value});
  },

  _setAmount (event) {
    event.preventDefault();
    this.setState({amount: event.target.value});
  },

  _handleDelete (event) {
    event.preventDefault();
    this.props._delete(this.props.idx);
    RewardActions.deleteReward(this.state);
  },

  _handleSave (event) {
    event.preventDefault();
    RewardActions.createReward(this.state);
  },

  render: function() {

    return (
      <div>
        {this.state.title}:
        <div className="reward-title-wrapper">
          <div>Title</div>
          <div className="reward-title-field">
            <input type="text" className="reward-title-input"
              onChange={this._setTitle} value={this.state.title || ""} />
          </div>
        </div>
        <div className="reward-amount-wrapper">
          <div className="reward-amount-field">Pledge amount</div>
          <div>
            $<input type="text" className="reward-amount-input"
              onChange={this._setAmount} value={this.state.amount || ""} />
          </div>
        </div>
        <div className="reward-description-wrapper">
          <div className="reward-description-field">Description</div>
          <div>
            <textarea rows="3" value={this.state.description || ""}
              wrap="hard" className="reward-description-field"
              onChange={this._setDescription} />
          </div>
        </div>
        <div className="reward-quantity-wrapper">
          <div className="reward-quantity-field">Quantity</div>
          <div>
            <input type="text" className="reward-quantity-input"
              onChange={this._setQuantity} value={this.state.quantity || ""} />
          </div>
        </div>
        <button onClick={this._handleSave}>Save This Reward</button>
        <button onClick={this._handleDelete}>Delete This Reward</button>
      </div>
    );
  }

});

module.exports = RewardItem;
