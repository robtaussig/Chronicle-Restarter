const React = require('react');

const SubmitProject = React.createClass({

  _onSubmit () {
    RewardActions.saveAllRewards();
  },

  render: function() {
    return (
      <div>
        Hello from Submit
      </div>
    );
  }

});

module.exports = SubmitProject;
