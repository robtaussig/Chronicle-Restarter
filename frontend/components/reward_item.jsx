const React = require('react');
const RewardStore = require('../stores/reward_store.js');
const RewardActions = require('../actions/reward_actions.js');

const RewardItem = React.createClass({

  getInitialState () {
    return ({
      project_id: this.props.projectId,
      project_reward_key: this.props.project_reward_key,
      quantity: this.props.quantity || 0,
      title: this.props.title || "",
      description: this.props.description || "",
      amount: this.props.amount || 0,
      saved: this.props.saved || "",
      errors: ""
    });
  },

  componentDidMount () {
    this.token = RewardStore.addListener(this._onChange);
  },

  componentWillUnmount () {
    this.token.remove();
  },

  _onChange () {
    if (RewardStore.find(this.state.project_reward_key).length > 0) {
      this.setState({saved: 'saved'});
    }
  },

  _setTitle (event) {
    event.preventDefault();
    this.setState({title: event.target.value, saved: '', errors: ""});
  },

  _setDescription (event) {
    event.preventDefault();
    this.setState({description: event.target.value, saved: '', errors: ""});
  },

  _setQuantity (event) {
    event.preventDefault();
    this.setState({quantity: event.target.value, saved: '', errors: ""});
  },

  _setAmount (event) {
    event.preventDefault();
    this.setState({amount: event.target.value, saved: '', errors: ""});
  },

  _handleDelete (event) {
    event.preventDefault();
    this.props._delete(this.props.idx);
    RewardActions.deleteReward(this.state);
  },

  _handleSave (event) {
    event.preventDefault();
    if (this.state.quantity > 0 && this.state.amount > 0 &&
          this.state.description !== "" && this.state.title !== "") {
          RewardActions.createReward(this.state);
    } else {
      this._handleError();
    }
  },

  _handleError () {
    if (this.state.title === "") {
      this.setState({errors: "The title cannot be blank."});
    } else if (this.state.description === "") {
      this.setState({errors: "The description cannot be blank."});
    } else if (this.state.amount === 0) {
      this.setState({errors: "You must set the pledge amount."});
    } else if (this.state.quantity === 0) {
      this.setState({errors: "You must set an available quantity."});
    }
  },

  render: function() {
    let _title = this.state.title !== "" ? this.state.title : "Reward title";
    let _unsavedText = this.state.saved === "" ? "not saved" : "saved";

    return (
      <div className="rewards-wrapper">
        <div className={`reward-title-text ${this.state.saved}`}>Reward {_unsavedText}:</div>
        <div className="reward-form-wrapper">
          <div className="reward-error-message"><p>{this.state.errors}</p></div>
          <div className="reward-title-wrapper">
            <div className="reward-title-field">Title</div>
            <div>
              <input type="text" className="reward-title-input"
                onChange={this._setTitle} value={this.state.title || ""} />
            </div>
          </div>
          <div className="reward-amount-wrapper">
            <div className="reward-amount-field">Pledge amount</div>
            <div>
              <input type="number" placeholder="$" className="reward-amount-input"
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
              <input type="number" className="reward-quantity-input"
                onChange={this._setQuantity} value={this.state.quantity || ""} />
            </div>
          </div>
          <ul className="reward-save-wrapper" onClick={this._handleSave}>
            <li><p>Save</p></li>
            <li>
              <div className="reward-save-button"><img id="check-mark" src={window.check}></img></div>
            </li>
          </ul>
          <button className="reward-delete-button" onClick={this._handleDelete}>X</button>
        </div>
      </div>
    );
  }

});

module.exports = RewardItem;
