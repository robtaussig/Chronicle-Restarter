const React = require('react');
const Link = require('react-router').Link;

const Search = React.createClass({

  render: function() {
    return (
      <div className="search">
        <Link to="/"><img id="search-icon" src={window.search}></img></Link>
      </div>
    );
  }

});

module.exports = Search;
