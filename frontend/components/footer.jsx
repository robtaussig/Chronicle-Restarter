const React = require('react');

const Footer = React.createClass({

  render: function() {
    let message = "Wait, this isn't actually Kickstarter? Here's a link.";

    return (
      <div className="footer-wrapper">
        <a href="http://www.kickstarter.com"><h2 className="click-joke">{message}</h2></a>
        <ul id="footer" className="footer-bottom group">
          <li>LinkedIn</li>
          <li>Facebook</li>
          <li>Github</li>
          <li>Portfolio Site</li>
        </ul>
      </div>
    );
  }

});

module.exports = Footer;
