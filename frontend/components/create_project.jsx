const React = require('react');

const CreateProject = React.createClass({

  getInitialState () {
    return ({category: "", title: ""});
  },

  componentDidMount () {
    this.categories = ['Category1','Category2', 'Category3'];
    //SetInterval to cycle through
  },

  _handleClick () {

  },

  render: function() {
    return (
      <div>
        <h2>In which Era will your project exist?</h2>
        <ul>
          <li>I want to start a</li>
          <input type=""
          <li>project called</li>
        </ul>
      </div>
    );
  }

});

module.exports = CreateProject;
