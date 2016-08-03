const React = require('react');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const ErrorActions = require('../actions/error_actions.js');
const Link = require('react-router').Link;
import { hashHistory } from 'react-router';

const SignUp = React.createClass({

  getInitialState () {
    return ({form: "signup", id: "", username: "", email: "", confirmEmail: "", password: "", confirmPassword: "", logged_in: false});
  },

  componentDidMount () {
    this.redirectIfLoggedIn();
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount() {
    this.sessionListener.remove();
  },

  redirectIfLoggedIn () {
    if (this.state.logged_in) {
      console.log('logged in');
      hashHistory.push('/');
    }
  },

  _onChange () {
    let user = SessionStore.currentUser();
    if (user.hasOwnProperty('id')) {
      this.setState({
        form: this.state.form,
        id: user.id,
        username: user.username,
        email: user.email,
        password: user.password,
        logged_in: true
      });
    }
    this.redirectIfLoggedIn();
  },

  _setName (event) {
    this.setState({username: event.currentTarget.value});
  },

  _setEmail (event) {
    this.setState({email: event.currentTarget.value});
  },

  _confirmEmail (event) {
    this.setState({confirmEmail: event.currentTarget.value});
  },

  _setPassword (event) {
    this.setState({password: event.currentTarget.value});
  },

  _confirmPassword (event) {
    this.setState({confirmPassword: event.currentTarget.value});
  },

  _compareEmails () {
    return this.state.email === this.state.confirmEmail;
  },

  _comparePasswords () {
    return this.state.password === this.state.confirmPassword;
  },

  _checkSyncedForms () {
    return this._compareEmails() && this._comparePasswords();
  },

  _handleMisMatch() {
    if (!this._compareEmails() && !this._comparePasswords()) {
      ErrorActions.mismatchedBoth();
    } else if (this._compareEmails()) {
      ErrorActions.mismatchedPasswords();
    } else {
      ErrorActions.mismatchedEmails();
    }
  },

  _handleSubmit (event) {
    event.preventDefault();
    if (this._checkSyncedForms()) {
      SessionActions.signUp(this.state.form,{
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
      });
    } else {
      this._handleMisMatch();
    }
  },

  render: function() {
    return (
      <div className="sign-up-form group">
        <h2>Sign up</h2>
        <form>
          <input type="text" placeholder="Name" onChange={this._setName}/>
          <br></br>
          <input type="text" placeholder="Email" onChange={this._setEmail}/>
          <br></br>
          <input type="text" placeholder="Re-enter email" onChange={this._confirmEmail}/>
          <br></br>
          <input type="password" placeholder="Password" onChange={this._setPassword}/>
          <br></br>
          <input type="password" placeholder="Re-enter password" onChange={this._confirmPassword}/>
          <br></br>
          <button className="sign-up-button" onClick={this._handleSubmit}>Sign me up!</button>
          <br></br>
        </form>
        <p>
          Have an account? <Link to={'api/logIn'}><b>Log in</b></Link>
        </p>
    </div>
    );
  }

});

module.exports = SignUp;
