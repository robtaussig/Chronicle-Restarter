const React = require('react');
const NavBar = require('./nav_bar.jsx');
const Errors = require('./errors.jsx');
const ErrorActions = require('../actions/error_actions.js');
const Footer = require('./footer.jsx');

const App = React.createClass({

  render () {
    return (
      <div className="container">
        <NavBar/>
        <Errors/>
        {this.props.children}
        <Footer/>
        <div className="push"></div>
      </div>
    );
  }

});

module.exports = App;
