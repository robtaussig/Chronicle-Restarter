const React = require('react');

const FrontPage = React.createClass({

  componentDidMount () {

  },

  componentWillUnmount () {

  },

  _randomPage () {

  },

  render: function() {

    return (
      <div>
        <div className="splash">
          <div className="front-page-content">
            <h2>Feeling Lucky?</h2>
            <h3>Or just too lazy to navigate around? Jump into the time machine
              and transport yourself to a random campaign.</h3>
            <div className="front-page-button" onClick={this._randomPage}>
              Go.
            </div>
          </div>
        </div>
        <h2 className="under-construction">
          Project Navigation is currently under construction...
          Please check back later.
        </h2>
      </div>
    );
  }

});

module.exports = FrontPage;
