const React = require('react');
const SignUp = require('./sign_up.jsx');
const LogIn = require('./log_in.jsx');
const Search = require('./search.jsx');
const ErrorActions = require('../actions/error_actions.js');
const SessionStore = require('../stores/session_store.js');
const SessionActions = require('../actions/session_actions.js');
const Link = require('react-router').Link;

const NavBar = React.createClass({

  getInitialState () {
    return({user: SessionStore.currentUser()});
  },

  _onChange () {
    this.setState({user: SessionStore.currentUser()});
  },

  componentDidMount () {
    SessionStore.addListener(this._onChange);
  },

  _logOut (e) {
    e.preventDefault();
    window.myApp = {};
    SessionActions.logOut();
  },

  render () {
    let navContent = (this.state.user.hasOwnProperty('id')) ?
      [<li key="user"><Link className="user-link"
          to='userProfile'>{this.state.user.pic_url ||
          <img id="nav-prof-pic" src={window.profile_pic}></img>}</Link>
        </li>,
      <li onClick={this._logOut} className="log-out-button" key="logOut">
        <img id="log-out-icon" src={window.logout}></img>
      </li>,
      <li key="search"><Search/></li>] :
        [
          <li key="signup">
            <Link className="session-link" to='signUp'>Sign Up</Link></li>,
          <li key="login">
            <Link className="session-link" to='logIn'>Log In</Link></li>,
          <li key="search"><Search/></li>
        ];
    return (
      <div className="nav-bar group">
        <div className="site-nav-left" >
          <ul className="nav-bar-items">
            <li><Link className="nav-link" to='discover'>Discover</Link></li>
            <li><Link className="nav-link" to='startProject'>Start a project</Link></li>
            <li><Link className="nav-link" to='about'>About us</Link></li>
          </ul>
        </div>
        <div className="site-nav-middle">
          <Link to="/"><img src={window.logo}></img></Link>
        </div>
        <div className="site-nav-right">
          {navContent}
        </div>
      </div>
    );
  }

});

module.exports = NavBar;
