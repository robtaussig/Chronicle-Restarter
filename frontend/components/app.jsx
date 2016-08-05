const React = require('react');
const NavBar = require('./nav_bar.jsx');
const Errors = require('./errors.jsx');
const ErrorActions = require('../actions/error_actions.js');

const App = React.createClass({

  componentWillReceiveProps () {
    ErrorActions.clearErrors();
  },

  render () {
    return (
      <div>
        <NavBar/>
        <Errors/>
        {this.props.children}
      </div>
    );
  }

});

module.exports = App;
