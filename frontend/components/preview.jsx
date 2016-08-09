const React = require('react');
const SavedProjectStore = require('../stores/saved_project_store.js');
const RewardActions = require('../actions/reward_actions.js');
const RewardStore = require('../stores/reward_store.js');
const RewardItem = require('./reward_item.jsx');
const UserStore = require('../stores/user_store.js');
const ProjectCategories = require('../constants/project_category_ids');

const Preview = React.createClass({

  getInitialState () {
    return ({
      appearance: "entering",
      rewards: [],
      project_title: "",
      full_name: "",
      project_img_urls: "",
      project_funders: 0,
      project_funded: 0,
      project_goal: 0,
      project_category_id: 0,
      user_project_total: 0,
      user_pic_url: "",
      project_content: "",
      project_risks: ""
    });
  },

  componentDidMount () {
    RewardActions.saveAllRewards();
    this._populate();
    this.rewardListener = RewardStore.addListener(this._onChange);
    this.projectListener = SavedProjectStore.addListener(this._onChange);
    this.userListener = UserStore.addListener(this._onChange);
    window.setTimeout(() => {this.setState({appearance: 'entered'});},100);
  },

  componentWillUnmount () {
    this.rewardListener.remove();
    this.projectListener.remove();
    this.userListener.remove();
  },

  _populate () {
    let project = SavedProjectStore.currentProject();
    let rewards = RewardStore.currentRewards();
    let user = UserStore.currentUser();

  },

  render: function() {

    return (
      <div className={this.state.appearance}>
        <div className="preview-wrapper">
          <div className="preview-header">
            <h3>{this.state.project_title || ""}</h3>
            <p>by {this.state.user_full_name || ""}</p>
            <br></br>
          </div>
          <div className="preview-project-image">
            <div>{this.state.project_img_urls || ""}</div>
          </div>
          <div className="preview-project-summary">
            <ul className="funders">
              <li>{this.state.project_funders || ""}</li>
              <li>backers</li>
            </ul>
            <ul className="funded">
              <li>{this.state.project_funded || ""}</li>
              <li>pledged of ${this.state.project_goal || 0} goal</li>
            </ul>
            <div className="preview-warning">
              <p>THIS PROJECT IS NOT LIVE</p>
              <br></br>
              <p>This is only a draft that the creator has chosen to share.</p>
              <br></br>
            </div>
            <div><b>Era:</b> {ProjectCategories[this.state.project_category_id].label}</div>
          </div>
          <div className="preview-sub-info">
            <div>
              <ul className="social-links">
                <li>Share: </li>
                <li>[Tweet]</li>
                <li>[Facebook]</li>
                <li>[Embed]</li>
                <li>[Email]</li>
              </ul>
            </div>
            <div className="user-info">
              <p className="user-full-name">{this.state.user_full_name || ""}</p>
              <br></br>
              <p>{this.state.user_project_total || 0} {this.state.user_project_total === 1 ? project : projects} created</p>
              <br></br>
              <ul className="user-contact-info">
                <li>See full bio</li>
                <li>Contact me</li>
                <li>{this.state.user_pic_url || ""}</li>
              </ul>
            </div>
          </div>
          <div className="project-content-bar">
            <ul className="project-content-nav-bar">
              <li>[Campaign]</li>
              <li>[Updates]</li>
              <li>[Comments]</li>
              <li>[Community]</li>
            </ul>
          </div>
          <div className="project-content-field">
            <h3>About this project</h3>
            <div className="project-content">{this.state.project_content || ""}</div>
            <br></br>
            <h4>Risks</h4>
            <div className="project-risks">{this.state.project_risks || ""}</div>
          </div>
          <div className="project-rewards-sidebar">
            {this.state.rewards.length}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Preview;

// <ul className="reward-sidebar">{_rewards}</ul>
// let _rewards = this.rewards.map((reward,idx)=> {
//   return <RewardItem key={idx} reward={reward} />;
// });

/* TODO

1) Handle funders
2) Count current funding amount
3) Handle project and user pictures
4) Create a project_count attribute

*/
