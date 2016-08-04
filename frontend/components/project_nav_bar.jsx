const React = require('react');

const ProjectNavBar = React.createClass({

  render () {
    return (
      <ul className="project-nav-bar">
        <li className="attached-button">Basics</li>
        <li className="attached-button">Rewards</li>
        <li className="attached-button">Story</li>
        <li className="attached-button">About You</li>
        <li className="attached-button">Account</li>
        <li className="preview-button">Preview</li>
        <li className="submit-project-butotn">Submit for review</li>
      </ul>
    );
  }

});

module.exports = ProjectNavBar;
