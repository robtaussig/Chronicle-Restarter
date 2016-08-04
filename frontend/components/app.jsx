const React = require('react');
const NavBar = require('./nav_bar.jsx');
const Errors = require('./errors.jsx');

const App = React.createClass({

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
