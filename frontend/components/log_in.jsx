const React = require('react');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;
const ErrorActions = require('../actions/error_actions.js');
const ErrorStore = require('../stores/error_store.js');
import { browserHistory } from 'react-router';

const LogIn = React.createClass({

  getInitialState () {
    return ({form: "login", id: "", username: "", email: "", password: "", logged_in: false});
  },

  _onChange () {
    let user = SessionStore.currentUser();
    if (user.hasOwnProperty('id')) {
      this.setState({
        id: user.id,
        name: user.username,
        email: user.email,
        password: user.password,
        logged_in: true
      });
      window.myApp.loggedIn = true;
    }
    this.redirectIfLoggedIn();
  },

  componentWillReceiveProps () {
    ErrorActions.clearErrors();
  },

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.redirectIfLoggedIn();
  },

  redirectIfLoggedIn () {
    if (typeof ErrorStore.currentError()[2] !== "undefined" && this.state.logged_in) {
      browserHistory.push(`${ErrorStore.currentError()[2]}`);
    } else if (this.state.logged_in) {
      browserHistory.push('/');
    }
  },

  componentWillUnmount () {
    this.sessionListener.remove();
  },

  _setEmail (event) {
    this.setState({email: event.currentTarget.value});
  },

  _setPassword (event) {
    this.setState({password: event.currentTarget.value});
  },

  _handleSubmit (event) {
    event.preventDefault();
    SessionActions.logIn(this.state.form,{
        form: this.state.form,
        password: this.state.password,
        email: this.state.email
    });
  },

  _loginGuest (event) {
    event.preventDefault();
    let _guest = `guest${Math.floor(Math.random()*100)}`;
    SessionActions.signUp(this.state.form,{
        username: _guest,
        password: 'password',
        email: _guest
    });
  },

  render () {
    return (
      <div className="login-form">
        <h2>Log In</h2>
        <form>
          <input type="text" placeholder="Email" onChange={this._setEmail}/>
          <br></br>
          <input type="password" placeholder="Password" onChange={this._setPassword}/>
          <br></br>
          <button className="log-in-button" onClick={this._handleSubmit}>Log me in!</button>
          <button className="log-in-button" onClick={this._loginGuest}>Guest Login</button>
        </form>
        <p>
          New to Chronicle Restarter? <Link to={'signUp'}><b>Sign Up</b></Link>
        </p>
    </div>
    );
  }

});

module.exports = LogIn;
