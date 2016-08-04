const React = require('react');
import { hashHistory } from 'react-router';
const ErrorActions = require('../actions/error_actions.js');

const CreateProject = React.createClass({

  getInitialState () {
    return ({
      category: "", title: "", displayCat: "", displayCounter: 0,
      firstHalf: [], secondHalf: [], status: 'inactive-drop-down'
    });
  },

  componentDidMount () {
    this.options = [  //To replace once categories are created
      {label: 'Before Time', value: 'Cat1'},
      {label: 'Stone Age', value: 'Cat2'},
      {label: 'Middle Ages', value: 'Cat3'},
      {label: 'Present', value: 'Cat4'},
      {label: 'Future', value: 'Cat5'},
    ];
    this.setState({displayCounter: 0});
    this.setState({displayCat: this.options[this.state.displayCounter].label});
    this._setCategories();
    this.intervalId = setInterval(() => {
      this._incrementDisplayCat();
    }, 2000);
  },

  componentWillUnmount () {
    clearInterval(this.intervalId);
  },

  _incrementDisplayCat () {
    let currentCount = this.state.displayCounter;
    currentCount = currentCount === this.options.length - 1 ? 0 : currentCount + 1;
    this.setState({displayCounter: currentCount});
    this.setState({displayCat: this.options[this.state.displayCounter].label});
  },

  _setCategories () {
    let _firstHalf = this.options.slice(0,this.options.length / 2).map(cat=> {
      return <li onClick={(event) => this._selectCat(cat, event)} className="cats-first-half" key={cat.value}>{cat.label}</li>;
    });
    let _secondHalf = this.options.slice(this.options.length / 2).map(cat=> {
      return <li onClick={(event) => this._selectCat(cat, event)} className="cats-second-half" key={cat.value}>{cat.label}</li>;
    });

    this.setState({firstHalf: _firstHalf});
    this.setState({secondHalf: _secondHalf});
  },

  _displayCats (e) {
    this.setState({status: "active-drop-down"});
    this.forceUpdate();
  },

  _hideCats (e) {
    this.setState({status: "inactive-drop-down"});
    this.forceUpdate();
  },

  _selectCat (cat,event) {
    this.setState({displayCat: cat.label});
    this.setState({category: cat.label});
    this._hideCats();
    clearInterval(this.intervalId);
  },

  _onChange (e) {
    this.setState({title: e.currentTarget.value});
  },

  _handleSubmit () {
    let user = window.myApp.user;
    if (window.myApp.loggedIn || typeof user !== "undefined") {
      this._advanceToProjectCreation();
    } else {
      window.myApp.pendingAction = 'finalizeProject';
      window.myApp.projecTitle = this.state.title;
      window.myApp.projectCategory = this.state.category;
      ErrorActions.mustBeSignedIn();
      hashHistory.push('api/signUp');
    }
  },

  _advanceToProjectCreation () {
    console.log('success!');
  },

  render: function() {
    return (
      <div>
        <form className="select-era">
          <h2>In which era will your project exist?</h2>
          <ul className="create-category-select group">
            <li>I want to start a</li>
            <li className ="display-cat" onClick={this._displayCats}>{this.state.displayCat}</li>
            <li>project called</li>
          </ul>
          <ul id="drop-down-ul" onMouseLeave={this._hideCats} className={`${this.state.status}`}>
            {this.state.firstHalf}
            {this.state.secondHalf}
          </ul>
          <input className="project-title-input" type="text" placeholder='title...' onChange={this._onChange} />
        </form>
        <button className="submit-button" onClick={this._handleSubmit}>Start</button>
    </div>
    );
  }

});

module.exports = CreateProject;
