const React = require('react');
const Link = require('react-router').Link;

const StartProject = React.createClass({

  render: function() {
    return (
      <div className="start-project">
        <ul className="start-headers">
          <li><h1>Change history with</h1></li>
          <li><h1>a few more clicks.</h1></li>
        </ul>
        <Link to='api/createProject'>Start a project</Link>
      </div>
    );
  }

});

module.exports = StartProject;
