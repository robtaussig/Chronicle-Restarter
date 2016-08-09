const React = require('react');
import { browserHistory } from 'react-router';
const ErrorActions = require('../actions/error_actions.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const ProjectCategories = require('../constants/project_category_ids.js');
const SessionStore = require('../stores/session_store.js');

const CreateProject = React.createClass({

  getInitialState () {
    return ({
      category: "", title: "", displayCat: "", displayCounter: 0,
      firstHalf: [], secondHalf: [], status: 'inactive-drop-down'
    });
  },

  componentDidMount () {
    this.setState({displayCounter: 0});
    this.setState({displayCat: ProjectCategories[this.state.displayCounter].label});
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
    currentCount = currentCount === ProjectCategories.length - 1 ? 0 : currentCount + 1;
    this.setState({displayCounter: currentCount});
    this.setState({displayCat: ProjectCategories[this.state.displayCounter].label});
  },

  _setCategories () {
    let _firstHalf = ProjectCategories.slice(0,ProjectCategories.length / 2).map(cat=> {
      return <li onClick={(event) => this._selectCat(cat, event)} className="cats-first-half" key={cat.value}>{cat.label}</li>;
    });
    let _secondHalf = ProjectCategories.slice(ProjectCategories.length / 2).map(cat=> {
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
    let catId = this.state.category !== "" ? this._getCatId() - 1 : 0;
    let userId = SessionStore.currentUser().id;
    if (userId > 0 || window.myApp.loggedIn) {
      this._advanceToProjectCreation(userId, catId);
    } else {
      let projectInfo = {title: this.state.title, category_id: catId};
      SavedProjectActions.submitSavedProject ('create', projectInfo);
      ErrorActions.mustBeSignedIn('finalizeProject');
      browserHistory.push('signUp');
    }
  },

  _getCatId () {
    let id = ProjectCategories.filter(category => {
      return category.label === this.state.category;
    })[0].value;

    return id;

  },

  _advanceToProjectCreation (userId, catId) {
    let projectInfo = {author_id: userId, title: this.state.title, category_id: catId};
    SavedProjectActions.submitSavedProject ('create', projectInfo);
    browserHistory.push('finalizeProject');
  },

  render () {
    let ill = "I'll";
    return (
      <div>
        <form className="select-era">
          <h2>In which era will your project exist?</h2>
          <ul className="create-category-select group">
            <li className="first-half-text">{ill} start a new</li>
            <li className ="display-cat" onClick={this._displayCats}>{this.state.displayCat}<img onClick={this._setCategory} id="cat-down"
              src={window.down}></img></li>
            <li className="second-half-text">project called:</li>
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
