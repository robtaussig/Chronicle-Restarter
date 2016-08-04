const React = require('react');

const ProjectNavBar = React.createClass({

  _handleClick (e) {
    this.props.changePage(e.target.id);
  },

  render () {
    return (
      <ul onClick={this._handleClick} className="project-nav-bar">
        <li id='0' className="attached-button">Basics</li>
        <li id='1' className="attached-button">Rewards</li>
        <li id='2' className="attached-button">Story</li>
        <li id='3' className="attached-button">About You</li>
        <li id='4' className="attached-button">Account</li>
        <li id='5' className="preview-button">Preview</li>
        <li id='6' className="submit-project-butotn">Submit for review</li>
      </ul>
    );
  }

});

module.exports = ProjectNavBar;
