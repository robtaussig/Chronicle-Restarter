const React = require('react');
const ProjectStore = require('../stores/project_store.js');
const ErrorStore = require('../stores/error_store.js');
const ProjectNavBar = require('./project_nav_bar.jsx');
const Basics = require('./basics.jsx');
const Rewards = require('./rewards.jsx');
const Story = require('./story.jsx');
const AboutYou = require('./about_you.jsx');
const Account = require('./account.jsx');
const Preview = require('./preview.jsx');


const FinalizeProject = React.createClass({

  getInitialState () {
    return ({title: "", category: "", shortBlurb: "", location: "", duration: 0, goal: 0});
  },

  componentDidMount () {
    this.pages = [
      <Basics />,
      <Rewards />,
      <Story />,
      <AboutYou />,
      <Account />,
      <Preview />,
    ];
    this.currentPage = this.pages[0];
    // ProjectStore.addListener(this._onChange);
    // ErrorStore.addListener(this._handleError);
    this._checkPrefilledInputs();
  },

  _checkPrefilledInputs () {  //Also check for saved project
    if (window.myApp.pendingAction === 'finalizeProject') {
      for (let key in window.myApp) {
        if (window.myApp.hasOwnProperty(key)) {
          this._setInput(key);
        }
      }
    }
    this.forceUpdate();
  },

  _setInput (key) {
    if (key !== 'user' && key !== 'loggedIn' && key !== 'pendingAction') {
      let value = window.myApp[`${key}`];
      switch (key) {
        case 'title':
          this.setState({title: value});
          break;
        case 'category':
          this.setState({category: value});
          break;
        case 'shortBlurb':
          this.setState({shortBlurb: value});
          break;
        case 'location':
          this.setState({location: value});
          break;
        case 'duration':
          this.setState({duration: value});
          break;
        case 'goal':
          this.setState({goal: value});
          break;
      }
    }
  },

  _onChange () {

  },

  _parseNum (num) {
    let result;
    switch (num) {
      case 'zero':
        result = 0;
        break;
      case 'one':
        result = 1;
        break;
      case 'two':
        result = 2;
        break;
      case 'three':
        result = 3;
        break;
      case 'four':
        result = 4;
        break;
      case 'five':
        result = 5;
        break;
    }
    return result;
  },

  _changePage (pageNum) {
    let num = this._parseNum(pageNum);
    this.currentPage = this.pages[num];
    this.forceUpdate();
  },

  render () {
    let lets = "Let's";
    return (
      <div>
        <div className="nav-bar-box">
          <ProjectNavBar changePage={this._changePage} />
          <br></br>
          <div className="nav-bar-top-text">{lets} get started.</div>
          <div className="nav-bar-bottom-text">The title of your project will
            impact its place in history. Pick a title, image, goal, campaign
            duration, and category.</div>
        </div>
        <div className="project-create-subpage">
          {this.currentPage}
        </div>
      </div>
    );
  }

});

module.exports = FinalizeProject;


/*
TODO

1) Add save functionality (will require saved_project model and new logic to prepopulate info)
2) Replace 'us' with apostrophe once syntax highlighting is fixed







*/
