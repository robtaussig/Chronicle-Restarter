const React = require('react');

const RewardItem = React.createClass({

  getInitialState () {
    return ({title: "", description: "", amount: ""});
  },

  componentDidMount () {

  },

  _setTitle (event) {
    event.preventDefault();
    this.setState({title: event.target.value});
  },

  _setDescription (event) {
    event.preventDefault();
    this.setState({description: event.target.value});
  },

  _setAmount (event) {
    event.preventDefault();
    this.setState({amount: event.target.value});
  },

  _handleDelete (event) {
    event.preventDefault();
    this.props._delete(this.props.idx);
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
        <button onClick={this._handleDelete}>Delete This Reward</button>
      </div>
    );
  }

});

module.exports = RewardItem;
