const React = require('react');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;
import { hashHistory } from 'react-router';

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

  componentDidMount () {
    this.sessionListener = SessionStore.addListener(this._onChange);
    this.redirectIfLoggedIn();
  },

  redirectIfLoggedIn () {
    if (typeof window.myApp.pendingAction !== "undefined" && this.state.logged_in) {
      hashHistory.push(`api/${window.myApp.pendingAction}`);
    } else if (this.state.logged_in) {
      hashHistory.push('/');
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
        </form>
        <p>
          New to Chronicle Restarter? <Link to={'api/signUp'}><b>Sign Up</b></Link>
        </p>
    </div>
    );
  }

});

module.exports = LogIn;
