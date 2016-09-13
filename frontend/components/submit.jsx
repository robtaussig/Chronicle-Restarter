const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
const ProjectShow = require('./project_show.jsx');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const UserStore = require('../stores/user_store.js');
const UserActions = require('../actions/user_actions.js');
const SavedProjectActions = require('../actions/saved_project_actions.js');
const ProjectCategories = require('../constants/project_category_ids');

const SubmitProject = React.createClass({

  getInitialState () {
    return ({
      display: "pending"
    });
  },

  componentDidMount () {
    this.positions = ["left", "middle", "right"];
    this._populate();
    this.listener = ProjectStore.addListener(this._onChange);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    window.clearTimeout(this.timeOut);
    this.listener.remove();
  },

  _onChange () {
    let _project = ProjectStore.currentProject();
    this.setState(_project);
    this._displayProject(_project);
  },

  _displayProject () {
    this.setState({display: "project"});
  },

  _populate () {
    let project = SavedProjectStore.currentProject();
    let rewards = RewardStore.currentRewards();
    let user = Object.assign(UserStore.currentUser(),window.myApp);
    this.setState({
      title: project.title || "Title was left empty",
      author_id: user.id,
      author_full_name: user.full_name || user.username,
      website: user.website || "",
      image: project.project_img_urls || "",
      goal: project.goal || 0,
      location: project.location || "",
      duration: project.duration || 0,
      blurb: project.blurb || "",
      category_id: project.category_id || 0,
      content: project.content || "",
      risks: project.risks || "",
      saved_project_id: project.id
    });
    window.setTimeout(() => {
      ProjectActions.submitProject('submit', this.state);
    },500);

  },

  render: function() {
    let _display;

    if (this.state.display === "pending") {
      <div>Hi</div>
    } else {
      _display = <ProjectShow project={this.state} />;
    }

    return (
      <div className={`${this.state.appearance}`}>
        {_display}
      </div>
    );
  }

});

module.exports = SubmitProject;
