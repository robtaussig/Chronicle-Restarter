const React = require('react');
const Link = require('react-router').Link;

const Footer = React.createClass({

  render: function() {
    let message = "Wait, this isn't actually Kickstarter? Here's a link.";

    return (
      <div className="footer-wrapper">
        <ul id="footer" className="footer-bottom group">
          <li><a href="http://www.robtaussig.com" target="_blank">Portfolio Site</a></li>
          <li><a href="https://github.com/robtaussig" target="_blank">Github</a></li>
          <li><a href="https://www.linkedin.com/in/robert-taussig-9439426" target="_blank">LinkedIn</a></li>
          <li><a href="https://angel.co/robert-taussig" target="_blank">AngelList</a></li>
        </ul>
      </div>
    );
  }

});

module.exports = Footer;
