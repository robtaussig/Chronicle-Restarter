const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SessionStore = require('../stores/user_store.js');

const Account = React.createClass({

  getInitialState () {
    return ({id: "", email: "", verified: "unverified", verification_status: ""});
  },

  componentDidMount () {
    let userId = SessionStore.currentUser().id || window.myApp.id;
    this._prepopulate(userId);
    this.listener = UserStore.addListener(this._onChange);
    UserActions.fetchUser('about', userId);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _prepopulate (userId) {
    let email = SessionStore.currentUser().email || window.myApp.email;
    this.setState({email: email, id: userId});
  },

  _setEmail (event) {
    this.setState({email: event.target.value});
  },

  _onChange () {
    this.setState({verified: UserStore.currentUser().verified,
      verification_status: UserStore.currentUser().verification_status});
  },

  _handleVerification () {
    UserActions.saveUser('account', {id: this.state.id, email: this.state.email,
      verification_status: "pending"});
  },

  render: function() {
    let text = "You do not have to enter your email for purposes of this " +
    "demonstration, but if you do, you will receive a confirmation email, " +
    "as well as be notified if your project is ever fully funded.";

    let verifiedStatus = this.state.verified === "verified" ? "verified" :
      (this.state.verification_status === "pending" ? "pending" : "unverified");

    return (
      <div className="account-info-wrapper">
        <div className="account-info-form">
          <ul>
            <li className="email-field">
              <div className="grey-field">
                <div className="attribute-field">Email</div>
                <div className="email-text">{text}</div>
                <div className="field-wrapper">
                  <input id="account" type="text" className="user-email"
                    onChange={this._setEmail} value={this.state.email || ""}/>
                </div>
                <div className={`status ${verifiedStatus}`}>{verifiedStatus}</div>
                <div className={`email-button ${this.state.verification_status}`}><button
                  onClick={this._handleVerification}>Send Confirmation</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = Account;
