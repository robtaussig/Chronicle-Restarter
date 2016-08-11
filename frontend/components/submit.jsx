const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const ProjectActions = require('../actions/project_actions.js');
const ProjectStore = require('../stores/project_store.js');
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
      appearance: "entering",
      rewards: [],
      project_title: "",
      full_name: "",
      project_img_urls: "",
      project_funders: 0,
      project_funded: 0,
      project_duration: 0,
      project_goal: 0,
      project_blurb: "",
      project_category_id: 0,
      user_project_total: 0,
      user_pic_url: "",
      user_website: "",
      user_id: window.myApp.id || UserStore.currentUser().id,
      project_content: "",
      project_risks: ""
    });
  },

  componentDidMount () {
    this._populate();
    this.listener = ProjectStore.addListener(this._onChange);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.listener.remove();
  },

  _onChange () {
    debugger
  },

  _populate () {
    let project = SavedProjectStore.currentProject();
    let rewards = RewardStore.currentRewards();
    let user = Object.assign(UserStore.currentUser(),window.myApp);

    this.setState({
      rewards: rewards,
      project_title: project.title || "Title was left empty",
      author_full_name: user.full_name || user.username,
      website: user.website || "",
      project_img_urls: project.project_img_urls || <img id="default-pic" src={window.pug}></img>,
      project_funders: project.funders || 0,
      project_funded: project.funded || 0,
      project_goal: project.goal || 0,
      project_duration: project.duration || 0,
      project_blurb: project.blurb || "",
      project_category_id: project.category_id || 0,
      user_project_total: user.project_totals || 0,
      user_pic_url: user.pic_url || <img id="prof-pic" src={window.profile_pic}></img>,
      project_content: project.content || "",
      project_risks: project.risks || ""
    });

    ProjectActions.submitProject(this.state);
  },

  render: function() {
    return (
      <div className={this.state.appearance}>
        Hello from Submit
      </div>
    );
  }

});

module.exports = SubmitProject;
