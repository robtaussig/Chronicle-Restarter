const React = require('react');
const SelectPopover = require("react-select-popover");

const CreateProject = React.createClass({

  getInitialState () {
    return ({category: "", title: "", display_cat: "", display_counter: 0});
  },

  componentDidMount () {
    this.options = [
      {label: 'Category1', value: 'Cat1'},
      {label: 'Category2', value: 'Cat2'},
      {label: 'Category3', value: 'Cat3'},
      {label: 'Category4', value: 'Cat4'},
      {label: 'Category5', value: 'Cat5'},
    ];
    this.setState({display_counter: 0});
    this.setState({display_cat: this.options[this.state.display_counter].value});
    //SetInterval to cycle through
  },

  _onChange (obj) {

  },

  _handleClick () {

  },

  render: function() {
    return (
      <div>
        <form className="select-era">
          <h2>In which era will your project exist?</h2>
          <ul className="create-category-select group">
            <li>I want to start a</li>
            <li className ="display-cat">{this.state.display_cat}</li>
            <li>project called</li>
          </ul>
          <input className="project-title-input" type="text" placeholder='title...' onChange={this._onChange} />
        </form>
        <button className="submit-button" onClick={this._handleSubmit}>Start</button>
    </div>
    );
  }

});

module.exports = CreateProject;
