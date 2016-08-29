const React = require('react');

const UserProfile = React.createClass({

  render () {
    return (
      <div className="about-page">
        <h1>What is Chronicle-Restarter?</h1>
        <br/>
        <p>Chronicle-Restarter is a satirical KickStarter clone built in
          React.js for the frontend with a Ruby on Rails backend. The rhetorical user is
          a fictional character from one of several time periods, seeking
          crowdfunding similar to that which is offered through KickStarter. I
          encourage you to navigate around, create and fund projects, and
          provide any feedback you might have.</p>
          <br/>
          <p className="email">You can contact me at <b>robert.taussig@gmail.com</b>, or through my
            portfolio site linked to in the footer.</p>
      </div>
    );
  }

});

module.exports = UserProfile;
