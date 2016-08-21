const React = require('react');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SessionStore = require('../stores/user_store.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');

const Account = React.createClass({

  getInitialState () {
    return ({
      id: "",
      email: "",
      verified: "unverified",
      verification_status: "",
      appearance: "entering"
    });
  },

  componentDidMount () {
    let userId = window.myApp.id || SessionStore.currentUser().id;
    this._prepopulate(userId);
    this.listener = UserStore.addListener(this._onChange);
    UserActions.fetchUser('about', userId);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.listener.remove();
    if (this.state.verification_status === "pending") {
      UserActions.saveUser('account', {id: this.state.id,
        email: this.state.email, verified: "verified"});
    }
  },

  _deleteProject () {
    SavedProjectActions.deleteSavedProject('finalizeProject',
      SavedProjectStore.currentProject());
    if (SavedProjectStore.currentProject().id) {
      this.setState({deleteMessage: "Project deleted"});
    } else {
      this.setState({deleteMessage: "No project to delete"});
    }

    let that = this;
    window.setTimeout(()=> {
      this.setState({deleteMessage: ""});
    },2000);
  },

  _prepopulate (userId) {
    let email = window.myApp.email || SessionStore.currentUser().email;
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
    let text = "For demonstration purposes, you will not actually receive " +
    "an email, but instead your account will be verified upon creation of " +
    "your project.";

    let verifiedStatus = this.state.verified === "verified" ? "verified" :
      (this.state.verification_status === "pending" ? "pending" : "unverified");

    return (
      <div className={`account-info-wrapper ${this.state.appearance}`}>
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
                <div className={`status ${verifiedStatus}`}>
                  {verifiedStatus}
                </div>
                <div className=
                  {`email-button ${this.state.verification_status}`}>
                  <button onClick={this._handleVerification}>
                    Send Confirmation
                  </button>
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
